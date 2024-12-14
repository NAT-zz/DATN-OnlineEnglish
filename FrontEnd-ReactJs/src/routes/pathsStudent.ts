function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_STUDENT = '/student';

export const PATH_STUDENT = {
  root: ROOTS_STUDENT,
  class: {
    root: path(ROOTS_STUDENT, '/class'),
    listAll: path(ROOTS_STUDENT, '/class/list-all'),
    listMyClass: path(ROOTS_STUDENT, '/class/my-class'),
    liveClass: path(ROOTS_STUDENT, '/class/live-class'),
  },
  daily: {
    root: path(ROOTS_STUDENT, '/daily'),
  },
  test: {
    root: path(ROOTS_STUDENT, '/test'),
    list: path(ROOTS_STUDENT, '/test/list'),
    detail: path(ROOTS_STUDENT, '/test/detail'),
  },
  lession: {
    root: path(ROOTS_STUDENT, '/lession'),
    list: path(ROOTS_STUDENT, '/lession/list'),
    detail: path(ROOTS_STUDENT, '/lession/detail'),
  },
  chat: {
    root: path(ROOTS_STUDENT, '/chat'),
    ai: path(ROOTS_STUDENT, '/ai'),
    teacher: path(ROOTS_STUDENT, '/chat'),
  },
};
