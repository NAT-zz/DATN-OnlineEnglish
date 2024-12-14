import React, { FC, useEffect, useState } from 'react';
import { DataGridProps } from '@mui/x-data-grid';
import { getTasks } from 'src/api/useQuestion';
import { TableSkeleton } from 'src/components/table';
import DataGridTask from './dataColumnTask';

const TaskList: FC<{ gridProps?: Omit<DataGridProps, 'columns' | 'rows'> }> = ({ gridProps }) => {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    getTasks().then((value) => {
      setTaskList(value.data);
    });
  }, []);

  if (taskList.length < 1) return <TableSkeleton />;

  return <DataGridTask data={taskList} {...gridProps} />;
};

export default TaskList;