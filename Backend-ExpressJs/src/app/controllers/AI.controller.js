import { makeSuccessResponse } from '../../utils/Response.js';
import { StatusCodes } from 'http-status-codes';
import { getReceiverSocketId, io } from '../../services/socket.js';
import Ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import ollama from 'ollama';

const model = 'Ebot_v1:latest';
let messages = [];

const generateChat = async (req, res) => {
    try {
        const { content } = req.body;
        messages.push({ role: 'user', content: content });

        const response = await ollama.chat({
            model,
            messages,
            stream: true,
        });

        // const receiverSocketId = getReceiverSocketId(receiverId);
        // if (receiverSocketId) {
        //     for await (const part of response) {
        //         process.stdout.write(part.message?.content);
        //         io.to(receiverSocketId).emit(
        //             'newMessage',
        //             part.message?.content,
        //         );
        //     }
        // }

        for await (const part of response) {
            process.stdout.write(part.message?.content);
            io.emit('newMessage', part.message?.content);
        }
        return makeSuccessResponse(res, StatusCodes.OK, {});
    } catch (error) {
        console.log('Error in generate: ', error.message);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: 'Server error, please try again later!',
        });
    }
};
const handleAnalyzeVoice = async (req, res) => {
    try {
        const audioPath = req.file.path;
        const convertedAudioPath = `${audioPath}.flac`;
        const targetWord = 'student'; // Target word to check

        // Convert audio to FLAC format for Google Speech-to-Text
        Ffmpeg(audioPath)
            .audioCodec('flac')
            .on('end', async () => {
                const audioData = fs.readFileSync(convertedAudioPath);
                const audioBytes = audioData.toString('base64');

                // const [response] = await speechClient.recognize({
                //     audio: { content: audioBytes },
                //     config: {
                //         encoding: 'FLAC',
                //         languageCode: 'en-US',
                //     },
                // });

                const transcription = response.results
                    .map((result) => result.alternatives[0].transcript)
                    .join('\n');

                // Analyze pronunciation
                const isCorrect =
                    transcription.toLowerCase() === targetWord.toLowerCase();

                // Clean up files
                fs.unlinkSync(audioPath);
                fs.unlinkSync(convertedAudioPath);

                if (!isCorrect) {
                    return makeSuccessResponse(res, StatusCodes.OK, {
                        message: `Incorrect pronunciation. You said: ${transcription}`,
                    });
                } else {
                    return makeSuccessResponse(res, StatusCodes.OK, {
                        message: 'Correct pronunciation',
                    });
                }
            })
            .save(convertedAudioPath);
    } catch (error) {
        console.log('Error in analyze voice: ', error.message);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: 'Server error, please try again later!',
        });
    }
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

export { generateChat, handleAnalyzeVoice };
