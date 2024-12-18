import axiosInstance from 'src/utils/axios';
// eslint-disable-next-line import/no-cycle
import { IAnswer, IEssay } from 'src/sections/@dashboard/students/DetailLession/DialogExcercise';

const createQuestion = (question: any) => axiosInstance.post('api/question/create', question);
const createTask = (question: any) => axiosInstance.post('api/task/create', question);
const createLesson = (question: any) => axiosInstance.post('api/lesson/create', question);
const createClass = (question: any) => axiosInstance.post('api/class/create', question);
const createTest = (question: any) => axiosInstance.post('api/test/create', question);

const getQuestion = () => axiosInstance.get('api/question/questions');
const getTasks = () => axiosInstance.get('api/task/tasks');
const getLessons = () => axiosInstance.get('api/lesson/lessons');
const getClasses = () => axiosInstance.get('api/class/classes/auth');
const getTests = () => axiosInstance.get('api/test/tests');
const getAllClass = () => axiosInstance.get('api/class/classes');
const getMyClass = () => axiosInstance.get('api/class/classes/auth');
const getSubmiited = (idClass: string, type: string, idType: string) =>
  axiosInstance.get(`api/class/submitted/${idClass}/${type}/${idType}`);
const markEssay = (record: any) => axiosInstance.post('api/class/marking', record);
const getNotis = () => axiosInstance.get('api/user/notis');
const sendNoti = (data: any) => axiosInstance.post('api/user/noti/create', data);
const getDaily = () => axiosInstance.get('api/dailytask/getDaily');

const registerClass = (idClass: number) => axiosInstance.get(`api/class/signup/${idClass}`);

const getConversationsChat = (idChat: number) => axiosInstance.get(`api/user/message/${idChat}`);
const getLiveClass = (id: string) => axiosInstance.get(`api/user/video-call/${id}`);
const getStudentWithClass = (idClass: number) => axiosInstance.get(`api/class/students/${idClass}`);
const sendMessage = (idReceiver: number, body: { message: string }) =>
  axiosInstance.post(`api/user/message/send/${idReceiver}`, body);

const sendMessageAI = (body: { content: string; rate: string }) =>
  axiosInstance.post('api/ai/chat', body);
const getMessageAi = () => axiosInstance.get(`api/ai/messages`);
const unRegisterClass = (idClass: number) => axiosInstance.get(`api/class/signout/${idClass}`);
const getClassDetail = (idClass: string) => axiosInstance.get(`api/class/detail/${idClass}`);
const getLessionDetail = (idLess: string) => axiosInstance.get(`api/lesson/detail/${idLess}`);
const getTestDetail = (idTest: string) => axiosInstance.get(`api/test/detail/${idTest}`);

const submitLesson = (body: { id: number; data: any[] }) =>
  axiosInstance.post('api/class/submit/lesson', body);
const submitTest = (body: { id: number; data: IAnswer[] | IEssay[] }) =>
  axiosInstance.post('api/class/submit/test', body);
const submitDaily = (body: { data: IAnswer[] }) =>
  axiosInstance.post('api/dailytask/check-answer', body);
export {
  getNotis,
  createQuestion,
  createTask,
  createLesson,
  createClass,
  createTest,
  getQuestion,
  getTasks,
  getLessons,
  getClasses,
  getTests,
  getMyClass,
  getAllClass,
  registerClass,
  getConversationsChat,
  getStudentWithClass,
  sendMessage,
  sendMessageAI,
  unRegisterClass,
  getClassDetail,
  getLessionDetail,
  submitLesson,
  submitTest,
  submitDaily,
  getTestDetail,
  getDaily,
  getLiveClass,
  getSubmiited,
  markEssay,
  sendNoti,
  getMessageAi
};
