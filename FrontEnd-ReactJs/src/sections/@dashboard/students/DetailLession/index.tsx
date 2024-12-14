/* eslint-disable react/no-danger */
import { Box, Card, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { getLessionDetail } from 'src/api/useQuestion';
import Scrollbar from 'src/components/scrollbar';
import Label from 'src/components/label';
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
      <Typography variant="h6">Exercises</Typography>
      {lessionDetail && lessionDetail?.tasks.length > 0 ? (
        <DialogExcercise
          lessonId={lessionDetail?.id as number}
          result={lessionDetail?.result as any}
          tasks={lessionDetail?.tasks as Task[]}
        />
      ) : (
        <Label>No Exercises</Label>
      )}
    </Box>
  );
};

export default DetailLession;
