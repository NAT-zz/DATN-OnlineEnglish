// import { makeSuccessResponse } from '../../utils/Response.js';
// import { StatusCodes, ReasonPhrases } from 'http-status-codes';
// import grammars from '../../models/grammars.mongo.js';
// import { saveGrammar, findRandomTasks } from '../../models/grammars.model.js';
// import tests from '../../models/tests.mongo.js';
// import {
//     GRAMMAR_TYPE,
//     QUESTION_TYPE,
//     REALIABILITY,
//     TASK_TYPE,
//     COURSE,
// } from '../../utils/Constants.js';
// import { saveTest } from '../../models/tests.model.js';

// const createTest = async (req, res) => {
//     // {
//     //     "data": {
//     //         "old": [1, 2, 3, 4, 5],
//     //         "new": [
//     //             {
//     //                 "sentence": "How are you ? 6",
//     //                 "key": "I'm fine",
//     //                 "answers": [ "I'm fine", "Thank you!", "No worry!", "What's about you?" ],
//     //                 "level": "A2"
//     //              },
//     //             {
//     //                 "sentence": "How are you ? 6",
//     //                 "key": "I'm fine",
//     //                 "answers": [ "I'm fine", "Thank you!", "No worry!", "What's about you?" ],
//     //                 "level": "B1"
//     //             }
//     //         ]
//     //     }
//     // }
//     try {
//         if (!req.body.data)
//             return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
//                 message: 'No data found',
//             });
//         const data = req.body.data;
//         const grammarIds = [];
//         if (!data.name)
//             return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
//                 message: 'Test needs a name',
//             });
//         if (!data.old && !data.new)
//             return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
//                 message: 'Test needs at least 1 question',
//             });
//         if (data.old?.length > 0) {
//             data.old.forEach((val) => {
//                 if (grammars.exists({ id: val })) grammarIds.push(val);
//             });
//         }
//         if (data.new?.length > 0) {
//             for (const val of data.new) {
//                 if (!(val.level in COURSE))
//                     return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
//                         message: `Level ${val.level} not found`,
//                     });

//                 Object.assign(val, {
//                     grammarType: GRAMMAR_TYPE.ANY,
//                     questionType: QUESTION_TYPE.SELECT,
//                     media: null,
//                     taskType: TASK_TYPE.FOR_TEST,
//                 });
//                 const newGrammarId = await saveGrammar(val);
//                 if (newGrammarId) grammarIds.push(newGrammarId);
//             }
//         }
//         const newId = await saveTest({ grammarIds, name: data.name });
//         if (newId)
//             return makeSuccessResponse(res, StatusCodes.OK, {
//                 message: 'New test created successfully',
//                 data: {
//                     id: newId,
//                 },
//             });
//         else
//             return makeSuccessResponse(res, StatusCodes.NOT_IMPLEMENTED, {
//                 message: 'New test has not been created',
//             });
//     } catch (error) {
//         console.log(error);
//         return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
//             message: error.message,
//         });
//     }
// };

// const checkAnswers = async (req, res) => {
//     // {
//     //     "data": [
//     //     "testId": "1"
//     //     "listAnswer": [
//     //             {
//     //                 "id": 4,
//     //                 "answer": "I'm fine"
//     //                 "reliability": 1
//     //             },
//     //             {
//     //                 "id": 2,
//     //                 "answer": "I'm fine"
//     //                 "reliability": 3
//     //             },
//     //         ]
//     //     ]
//     // }
//     try {
//         if (!req.body.data)
//             return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
//                 message: 'No data found',
//             });
//         const data = req.body.data;
//         if (!data.testId)
//             return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
//                 message: 'Test id must be provided',
//             });
//         const findTest = await tests.findOne({ id: data.testId });
//         if (findTest instanceof tests && findTest) {
//             const listBeaty = [];
//             let correct = 0,
//                 totalScore = 0;
//             for (const idSentence of findTest.grammarIds) {
//                 const getSentence = data.listAnswer.find(
//                     (val) => val.id === idSentence,
//                 );
//                 if (getSentence) {
//                     const findSentence = await grammars.findOne(
//                         {
//                             id: idSentence,
//                             questionType: QUESTION_TYPE.SELECT,
//                         },
//                         '-_id -__v -r -grammarType -questionType',
//                     );
//                     if (findSentence instanceof grammars && findSentence) {
//                         if (getSentence.answer === findSentence.key) {
//                             let score = 0;
//                             if (
//                                 getSentence.reliability == REALIABILITY.NOT_SURE
//                             )
//                                 score = 0.33;
//                             else if (
//                                 getSentence.reliability ==
//                                 REALIABILITY.PRETTY_SURE
//                             )
//                                 score = 0.66;
//                             else score = 1;

//                             correct++;
//                             totalScore += score;
//                             listBeaty.push({
//                                 id: idSentence,
//                                 score,
//                             });
//                         } else {
//                             listBeaty.push({
//                                 id: idSentence,
//                                 score: 0,
//                             });
//                         }
//                     }
//                 } else {
//                     listBeaty.push({
//                         id: idSentence,
//                         score: 0,
//                     });
//                 }
//             }
//             return makeSuccessResponse(res, StatusCodes.OK, {
//                 message: `Total score is ${totalScore}/${findTest.grammarIds.length} with ${correct} correct answer`,
//                 data: listBeaty,
//             });
//         } else
//             return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
//                 message: `Test not found with id: ${data.testId}`,
//             });
//     } catch (error) {
//         console.log(error);
//         return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
//             message: error.message,
//         });
//     }
// };

// const getTest = async (req, res) => {
//     try {
//         if (!req.params.id)
//             return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
//                 message: 'No id found',
//             });
//         const reqId = req.params.id;
//         const getTest = await tests.findOne({ id: reqId }, '-_id -__v');
//         if (getTest instanceof tests && getTest) {
//             const listSentence = [];
//             for (const val of getTest.grammarIds) {
//                 const findSentence = await grammars.findOne(
//                     {
//                         id: val,
//                         questionType: QUESTION_TYPE.SELECT,
//                     },
//                     '-_id -__v -r -grammarType -questionType -key',
//                 );
//                 if (findSentence instanceof grammars && findSentence)
//                     listSentence.push(findSentence);
//             }
//             return makeSuccessResponse(res, StatusCodes.OK, {
//                 data: {
//                     id: getTest.id,
//                     name: getTest.name,
//                     listSentence,
//                 },
//             });
//         }
//         return makeSuccessResponse(res, StatusCodes.NOT_IMPLEMENTED, {
//             message: `Can not find test with id: ${reqId}`,
//         });
//     } catch (error) {
//         console.log(error);
//         return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
//             message: error.message,
//         });
//     }
// };

// const deleteTest = async (req, res) => {
//     try {
//         if (!req.params.id)
//             return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
//                 message: 'No id found',
//             });
//         const reqId = req.params.id;
//         const getTest = await tests.findOne({ id: reqId });
//         if (getTest instanceof tests && getTest) {
//             if (getTest.grammarIds.length > 0) {
//                 for (const valId of getTest.grammarIds)
//                     await grammars.deleteOne({ id: valId });
//             }
//             await getTest.delete();
//             return makeSuccessResponse(res, StatusCodes.OK, {
//                 message: `Test with id ${reqId} has been deleted successfully`,
//             });
//         }
//         return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
//             message: `Test not found with id ${reqId}`,
//         });
//     } catch (error) {
//         console.log(error);
//         return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
//             message: error.message,
//         });
//     }
// };

// const makeTestFromRandom = async (req, res) => {
//     try {
//         const listBeauty = [];
//         for (const val in COURSE) {
//             const findTaskWithLevel = await findRandomTasks(
//                 {
//                     taskType: TASK_TYPE.FOR_TEST,
//                     level: COURSE[val],
//                 },
//                 3,
//             );
//             let level = COURSE[val];
//             if (findTaskWithLevel)
//                 listBeauty.push({
//                     level: findTaskWithLevel,
//                 });
//         }
//         return makeSuccessResponse(res, StatusCodes.OK, {
//             data: listBeauty,
//         });
//     } catch (error) {
//         console.log(error);
//         return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
//             message: error.message,
//         });
//     }
// };

// export { createTest, checkAnswers, getTest, deleteTest, makeTestFromRandom };
