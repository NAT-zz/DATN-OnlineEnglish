import React, { FC, useEffect, useState } from 'react';
import { DataGridProps } from '@mui/x-data-grid';
import { getLessons } from 'src/api/useQuestion';
import { TableSkeleton } from 'src/components/table';
import DataGridTask from './dataColumnLesson';
import LessionView from './LessionView';

const LessonList: FC<{ gridProps?: Omit<DataGridProps, 'columns' | 'rows'> }> = ({ gridProps }) => {
  const [lessonList, setLessonList] = useState([]);

  useEffect(() => {
    getLessons().then((value) => {
      setLessonList(value.data);
    });
  }, []);

  if (lessonList.length < 1) return <TableSkeleton />;

  return (
    <>
      <DataGridTask data={lessonList} {...gridProps} />
      <LessionView />
    </>
  );
};

export default LessonList;
