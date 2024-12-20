import { makeSuccessResponse } from '../../utils/Response.js';
import { StatusCodes } from 'http-status-codes';
import { getReceiverSocketId, io } from '../../services/socket.js';
import { CONFIG } from '../../utils/Constants.js';
import { createClient } from '@deepgram/sdk';

import conversations from '../../models/conversations.mongo.js';
import messagesMongo from '../../models/messages.mongo.js';
import { findMaxId as findMaxIdConversation } from '../../models/conversations.model.js';
import { findMaxId as findMaxIdMessage } from '../../models/messages.model.js';

import fs from 'fs';
import path from 'path';
import ollama from 'ollama';

const deepgram = createClient(CONFIG.DEEPGRAM_API_KEY);
const model = 'Ebot_v1:latest';
const __dirname = path.resolve();
let messages = [];

const generateQuestion = async (prompt) => {
    try {
        const response = await ollama.generate({
            model,
            prompt,
        });

        return response.response;
    } catch (error) {
        console.log('Error in generateQuestion: ', error.message);
    }
};

const generateChat = async (req, res) => {
    try {
        const { content } = req.body;
        const rate = req.body?.rate;

        if (rate !== '') {
            const newConversation = await conversations.create({
                id: Number((await findMaxIdConversation()) + 1),
                participants: [req.userData.id, '0'],
            });

            for (const message of messages) {
                const newMessage =
                    message.role === 'user'
                        ? new messagesMongo({
                              id: Number((await findMaxIdMessage()) + 1),
                              senderId: req.userData.id,
                              receiverId: 0,
                              message: message.content,
                          })
                        : new messagesMongo({
                              id: Number((await findMaxIdMessage()) + 1),
                              senderId: 0,
                              receiverId: req.userData.id,
                              message: message.content,
                          });

                await newMessage.save();
                if (newMessage) {
                    newConversation.messages.push(newMessage.id);
                }
            }
            newConversation.rate = +rate;
            await newConversation.save();
            messages = [];

            return makeSuccessResponse(res, StatusCodes.OK, {});
        } else {
            messages.push({ role: 'user', content: content });

            const response = await ollama.chat({
                model,
                messages,
                stream: true,
            });

            const receiverSocketId = getReceiverSocketId(req.userData.id);
            let data = '';
            if (receiverSocketId) {
                io.to(receiverSocketId).emit('startOneMessage', 'ping');
                for await (const part of response) {
                    data += part.message?.content;
                    process.stdout.write(part.message?.content);
                    io.to(receiverSocketId).emit(
                        'newMessage',
                        part.message?.content,
                    );
                }
                io.to(receiverSocketId).emit('endOneMessage', 'ping');
            }

            messages.push({ role: 'bot', content: data });
            return makeSuccessResponse(res, StatusCodes.OK, {
                data,
            });
        }
    } catch (error) {
        console.log('Error in generate: ', error.message);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: 'Server error, please try again later!',
        });
    }
};

const getAiMessages = async (req, res) => {
    try {
        const userId = req.userData.id;
        const conversation = await conversations.find({
            participants: { $all: [userId, 0] },
        });

        let data = [];
        if (conversation && conversation.length > 0) {
            for (const conver of conversation) {
                let messageData = [];
                for (const messageId of conver.messages) {
                    const getMessage = await messagesMongo.findOne(
                        { id: messageId },
                        '-_id -__v',
                    );
                    if (getMessage && getMessage instanceof messagesMongo) {
                        messageData.push(getMessage);
                    }
                }
                data.push({
                    createdAt: conver.createdAt,
                    rate: conver?.rate ? conver.rate : 0,
                    messages: messageData,
                });
            }

            return makeSuccessResponse(res, StatusCodes.OK, {
                data,
            });
        }
        return makeSuccessResponse(res, StatusCodes.OK, {});
    } catch (error) {
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: 'Server error, please try again later!',
        });
    }
};

const handleAnalyzeVoice = async (req, res) => {
    try {
        const filePath = path.join(
            __dirname,
            `src/uploads/${req.file.filename}`,
        );

        const targetWord = req.query.word;
        if (!targetWord) {
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Missing target word',
            });
        }

        const { result, error } =
            await deepgram.listen.prerecorded.transcribeFile(
                fs.readFileSync(filePath),
                { smart_format: true, model: 'nova-2', language: 'en-US' },
            );
        if (error) throw error;

        const extractedWord =
            result.results.channels[0].alternatives[0].words[0]?.word;
        const isCorrect =
            extractedWord.toLowerCase() === targetWord.toLowerCase();

        // Clean up files
        fs.unlinkSync(filePath);

        if (!isCorrect) {
            return makeSuccessResponse(res, StatusCodes.EXPECTATION_FAILED, {
                message: `Incorrect pronunciation. You said: ${extractedWord}`,
            });
        } else {
            return makeSuccessResponse(res, StatusCodes.OK, {
                message: 'Correct pronunciation',
            });
        }
    } catch (error) {
        console.log('Error in analyze voice: ', error.message);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: 'Server error, Please try again later!',
        });
    }
};

const getAudio = async (req, res) => {
    if (!req.query.word) {
        return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
            message: 'Missing target word',
        });
    }
    const text = req.query.word;

    const filePath = path.join(__dirname, `/audios/${text.toLowerCase()}.wav`);
    if (fs.existsSync(filePath)) {
        return makeSuccessResponse(res, StatusCodes.OK, {
            data: {
                path: `${
                    CONFIG.DOMAIN_SERVER
                }/audios/${text.toLowerCase()}.wav`,
            },
        });
    } else {
        try {
            const response = await deepgram.speak.request(
                { text },
                {
                    model: 'aura-asteria-en',
                    encoding: 'linear16',
                    container: 'wav',
                },
            );
            const stream = await response.getStream();
            if (stream) {
                // Convert the stream to an audio buffer
                const buffer = await getAudioBuffer(stream);
                // Write the audio buffer to a file
                fs.writeFile(filePath, buffer, (err) => {
                    if (err) {
                        throw err;
                    } else {
                        return makeSuccessResponse(res, StatusCodes.OK, {
                            data: {
                                path: `${
                                    CONFIG.DOMAIN_SERVER
                                }/audios/${text.toLowerCase()}.wav`,
                            },
                        });
                    }
                });
            } else {
                throw new Error('Error generating audio:', stream);
            }
        } catch (error) {
            console.log('Error in getAudio: ', error);
            return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
                message: 'Server error, please try again later!',
            });
        }
    }
};

// helper function to convert stream to audio buffer
const getAudioBuffer = async (response) => {
    const reader = response.getReader();
    const chunks = [];

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        chunks.push(value);
    }

    const dataArray = chunks.reduce(
        (acc, chunk) => Uint8Array.from([...acc, ...chunk]),
        new Uint8Array(0),
    );

    return Buffer.from(dataArray.buffer);
};
// import tesseract from 'tesseract.js';
// import wordExists from 'word-exists';

// const res = await tesseract.recognize('test2.png', 'eng', {});
// let words = res.data.text.split(' ');

// // reduce all EOLs to 1
// words = words.map((word) => {
//     let indEol = word.indexOf('\n');
//     if (indEol !== -1) {
//         let endOfEol = indEol;
//         while (true) {
//             endOfEol++;
//             if (word[endOfEol] !== '\n') break;
//         }
//         return word.replace(word.slice(indEol, endOfEol), '\n');
//     } else return word;
// });

// const answerKey = ['A.', 'B.', 'C.', 'D.'];
// let final = [],
//     QA = {},
//     answerArr = [],
//     questionIndex = 1,
//     tmpStc = '';

// for (let i = 0; i < words.length; i++) {
//     let eolIndex = words[i].indexOf('\n');
//     if (eolIndex !== -1) {
//         tmpStc += words[i].slice(0, eolIndex) + ' ';

//         // if the next line is Answer line
//         if (
//             answerKey.includes(words[i].substring(eolIndex + 1, eolIndex + 3))
//         ) {
//             // check if black space like '---------' or '.........' is correcttly extracted
//             tmpStc = tmpStc
//                 .trim()
//                 .split(' ')
//                 .map((word) => {
//                     if (
//                         wordExists(word) ||
//                         /\d/.test(word) ||
//                         word.includes(',') ||
//                         word.includes("'") ||
//                         word.includes('.') ||
//                         word.includes(')') ||
//                         word.includes('(') ||
//                         word.includes('!')
//                     )
//                         return word;
//                     console.log('#####', word);
//                     return '.......';
//                 })
//                 .join(' ');

//             QA['Question ' + questionIndex++ + ':'] = tmpStc.trim();

//             // extract answer
//             let answer = 'A. ';

//             // if answer not separated with key by ' ' like  'road!\nA.by'
//             if (words[i].substring(eolIndex + 3)) {
//                 answer += words[i].substring(eolIndex + 3);
//             }

//             let j = i + 1;
//             while (true) {
//                 eolIndex = words[j].indexOf('\n');
//                 if (eolIndex !== -1) {
//                     answer += words[j].substring(0, eolIndex);
//                     answerArr.push(answer.trim());

//                     QA['Answers:'] = answerArr;
//                     final.push(QA);

//                     QA = {};
//                     answerArr = [];
//                     break;
//                 }
//                 if (answerKey.includes(words[j].substring(0, 2))) {
//                     {
//                         answerArr.push(answer.trim());
//                         answer = '';
//                     }
//                 }
//                 answer += words[j] + ' ';
//                 j++;
//             }
//             tmpStc = '';
//             i = j++;
//             continue;
//         } // if the next line is not answer line
//         else tmpStc += words[i].substring(eolIndex + 1) + ' ';
//     } else tmpStc += words[i] + ' ';
// }

// // console.log(res.data.text);
// // console.log(words);
// console.log(final);

export {
    generateChat,
    generateQuestion,
    handleAnalyzeVoice,
    getAudio,
    getAiMessages,
};
