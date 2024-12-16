/* eslint-disable react/no-danger */
import { Alert, Box, Stack, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { getTestDetail } from 'src/api/useQuestion';
import Label from 'src/components/label';
import { margin } from '@mui/system';
import { fDate, fDateTime, fToNow } from 'src/utils/formatTime';
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

  let available = true;
  const fromNow = fToNow(testDetail?.endDate as unknown as Date);
  if (fromNow.includes('ago')) {
    available = false;
  }

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ width: '100%' }}
      >
        <Typography variant="h3">{testDetail?.name}</Typography>
        <Typography variant="h3">End {fToNow(testDetail?.endDate as unknown as Date)}</Typography>
      </Stack>

      <Alert variant="filled" severity="info" sx={{ my: 2 }}>
        You cannot leave the test once you start!, Any question you have answerd will be calculated
        as your final result.
      </Alert>
      {testDetail && testDetail?.tasks.length > 0 ? (
        <DialogTest
          testId={testDetail?.id as number}
          result={testDetail?.result as any}
          tasks={testDetail?.tasks as Task[]}
          time={testDetail?.time as number}
          available={available}
        />
      ) : (
        <Label>No Exercises</Label>
      )}
    </Box>
  );
};

export default DetailTest;
