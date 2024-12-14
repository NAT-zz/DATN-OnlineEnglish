interface TestDetail {
  _id: string;
  id: number;
  name: string;
  tasks: Task[];
  publicDate: string;
  endDate: string;
  time: number;
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
}

export type { TestDetail, Task, Question };
