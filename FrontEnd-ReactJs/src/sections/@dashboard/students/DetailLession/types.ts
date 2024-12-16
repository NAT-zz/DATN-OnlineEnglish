import { SplitPathString } from "react-hook-form/dist/types/path/common";

interface LessionDetail {
  _id: string;
  id: number;
  topic: string;
  content: string;
  tasks: Task[];
  type: string;
  publicDate: string;
  taskEndDate: string;
  result: any[];
}

interface Task {
  _id: string;
  id: number;
  task: string;
  topic: string;
  questions: Question[];
  taskType: string;
}

interface Question {
  _id: string;
  id: number;
  sentence: string;
  answers: string[];
  key: string;
  questionType: string;
  media?: {
    type: string;
    link: string;
  }
}

export type { LessionDetail, Task, Question };
