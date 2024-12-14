/* eslint-disable react/no-danger */
import { Box, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { getTestDetail } from 'src/api/useQuestion';
import Label from 'src/components/label';
import DialogTest from './DialogTest';
import { Task, TestDetail } from './types';

type IPropsLession = {
  idTest: string;
};
const DetailTest: FC<IPropsLession> = ({ idTest }) => {
  const [testDetail, setTestDetail] = useState<TestDetail>();

  useEffect(() => {
    getTestDetail(idTest).then((value) => {
      setTestDetail(value.data as TestDetail);
    });
  }, [idTest]);

  return (
    <Box>
      <Typography variant="h3">{testDetail?.name}</Typography>
      {testDetail && testDetail?.tasks.length > 0 ? (
        <DialogTest
          testId={testDetail?.id as number}
          result={testDetail?.result as any}
          tasks={testDetail?.tasks as Task[]}
          time={testDetail?.time as number}
        />
      ) : (
        <Label>No Exercises</Label>
      )}
    </Box>
  );
};

export default DetailTest;
