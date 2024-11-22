// const API_KEY = '0107df202fa3fbc1d0b6f0e8978751869861bf92';

// import { createClient } from '@deepgram/sdk';
// import fs from 'fs';

// const deepgram = createClient(API_KEY);

// const transcribeFile = async () => {
//     // Replace with your file path and audio mimetype
//     const pathToFile = 'Record (online-voice-recorder.com).mp3';

//     // Initializes the Deepgram SDK

//     const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
//         fs.readFileSync(pathToFile),
//         { smart_format: true, model: 'nova-2', language: 'en-US' },
//     );

//     if (error) throw error;
//     if (!error)
//         console.dir(result.results.channels[0].alternatives[0].words[0].word, {
//             depth: null,
//         });
// };

// const getAudio = async () => {
//     const text = 'Hello, how can I help you today?';
//     const response = await deepgram.speak.request(
//         { text },
//         {
//             model: 'aura-asteria-en',
//             encoding: 'linear16',
//             container: 'wav',
//         },
//     );
//     // STEP 3: Get the audio stream and headers from the response
//     const stream = await response.getStream();
//     const headers = await response.getHeaders();
//     if (stream) {
//         // STEP 4: Convert the stream to an audio buffer
//         const buffer = await getAudioBuffer(stream);
//         // STEP 5: Write the audio buffer to a file
//         fs.writeFile('output.wav', buffer, (err) => {
//             if (err) {
//                 console.error('Error writing audio to file:', err);
//             } else {
//                 console.log('Audio file written to output.wav');
//             }
//         });
//     } else {
//         console.error('Error generating audio:', stream);
//     }

//     if (headers) {
//         console.log('Headers:', headers);
//     }
// };

// // helper function to convert stream to audio buffer
// const getAudioBuffer = async (response) => {
//     const reader = response.getReader();
//     const chunks = [];

//     while (true) {
//         const { done, value } = await reader.read();
//         if (done) break;

//         chunks.push(value);
//     }

//     const dataArray = chunks.reduce(
//         (acc, chunk) => Uint8Array.from([...acc, ...chunk]),
//         new Uint8Array(0),
//     );

//     return Buffer.from(dataArray.buffer);
// };

// // getAudio();

// transcribeFile();

import axios from 'axios';
// Function to get word definition


// Example usage
getWordDefinition('apple');
