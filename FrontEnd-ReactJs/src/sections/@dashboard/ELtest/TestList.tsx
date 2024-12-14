import React, { FC, useEffect, useState } from 'react';
import { DataGridProps } from '@mui/x-data-grid';
import { getTests } from 'src/api/useQuestion';
import { TableSkeleton } from 'src/components/table';
import DataGridTask from './dataColumnTest';

const TestList: FC<{ gridProps?: Omit<DataGridProps, 'columns' | 'rows'> }> = ({ gridProps }) => {
  const [testList, setTestList] = useState([]);

  useEffect(() => {
    getTests().then((value) => {
      setTestList(value.data);
    });
  }, []);

  if (testList.length < 1) return <TableSkeleton />;

  return <DataGridTask data={testList} {...gridProps} />;
};

export default TestList;
