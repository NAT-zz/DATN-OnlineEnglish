import React, { FC, useEffect, useState } from 'react';
import { DataGridProps } from '@mui/x-data-grid';
import { getClasses } from 'src/api/useQuestion';
import { TableSkeleton } from 'src/components/table';
import DataGridTask from './dataColumnClass';

const ClassList: FC<{ gridProps?: Omit<DataGridProps, 'columns' | 'rows'> }> = ({ gridProps }) => {
  const [classList, setClassList] = useState([]);

  useEffect(() => {
    getClasses().then((value) => {
      setClassList(value.data);
    });
  }, []);

  if (classList.length < 1) return <TableSkeleton />;

  return <DataGridTask data={classList} {...gridProps} />;
};

export default ClassList;
