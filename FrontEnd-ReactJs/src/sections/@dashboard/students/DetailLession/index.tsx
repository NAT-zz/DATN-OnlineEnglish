/* eslint-disable react/no-danger */
import { Box, Card, Stack, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { getLessionDetail } from 'src/api/useQuestion';
import Scrollbar from 'src/components/scrollbar';
import Label from 'src/components/label';
import { fToNow } from 'src/utils/formatTime';
import { LessionDetail, Task } from './types';
import DialogExcercise from './DialogExcercise';

type IPropsLession = {
  idLession: string;
};
const DetailLession: FC<IPropsLession> = ({ idLession }) => {
  const [lessionDetail, setLessionDetail] = useState<LessionDetail>();
  // const []

  useEffect(() => {
    getLessionDetail(idLession).then((value) => {
      setLessionDetail(value.data as LessionDetail);
    });
  }, [idLession]);
  console.log(lessionDetail?.result);

  let available = true;
  const fromNow = fToNow(lessionDetail?.taskEndDate as unknown as Date);
  if (fromNow.includes('ago')) {
    available = false;
  }

  return (
    <Box>
      <Typography variant="h3">{lessionDetail?.topic}</Typography>
      <Card sx={{ my: 1, p: 2 }}>
        <Typography variant="h6">Lecture Content: </Typography>
        <Scrollbar
          sx={{
            height: 500,
            '& .simplebar-content': {
              height: 1,
              display: 'flex',
              flexDirection: 'column',
            },
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: lessionDetail?.content || '<p>' }} />
        </Scrollbar>
      </Card>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ width: '100%' }}
      >
        <Typography variant="h6">Exercises</Typography>
        <Typography variant="h6">
          End {fToNow(lessionDetail?.taskEndDate as unknown as Date)}
        </Typography>
      </Stack>
      {lessionDetail && lessionDetail?.tasks.length > 0 ? (
        <DialogExcercise
          lessonId={lessionDetail?.id as number}
          result={lessionDetail?.result as any}
          tasks={lessionDetail?.tasks as Task[]}
          available={available}
        />
      ) : (
        <Label>No Exercises</Label>
      )}
    </Box>
  );
};

export default DetailLession;
