import React, { FC, useEffect, useState } from 'react';
import { DataGridProps } from '@mui/x-data-grid';
import { getQuestion } from 'src/api/useQuestion';
import { TableSkeleton } from 'src/components/table';
import DataGridQuestion from './dataColumnQuestion';

const QuestionList: FC<{ gridProps?: Omit<DataGridProps, 'columns' | 'rows'> }> = ({
  gridProps,
}) => {
  const [questionList, setQuestionList] = useState([]);

  useEffect(() => {
    getQuestion().then((value) => {
      setQuestionList(value.data);
    });
  }, []);

  if (questionList.length < 1) return <TableSkeleton />;

  return <DataGridQuestion data={questionList} {...gridProps} />;
};

export default QuestionList;
