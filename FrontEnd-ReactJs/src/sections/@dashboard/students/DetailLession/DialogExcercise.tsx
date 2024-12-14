/* eslint-disable import/no-cycle */
/* eslint-disable no-return-assign */
import {
  Alert,
  AlertTitle,
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { createRef, useRef, useState } from 'react';
import { Stack } from '@mui/system';
import { LoadingButton } from '@mui/lab';
import { submitLesson } from 'src/api/useQuestion';
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'notistack';
import { Question, Task } from './types';

export type IAnswer = {
  id: number;
  answer: string;
};
export type IEssay = {
  idEssayTask: number;
  content: string;
};
type IRefTask = {
  onOpen: (data: Task[]) => void;
  onClose: () => void;
};

export const magicExcerRef = createRef<IRefTask>();

const DialogExcercise = ({
  lessonId,
  result,
  tasks,
}: {
  lessonId: number;
  result: any;
  tasks: Task[];
}) => {
  const isEmptyResult = () => {
    if (result === undefined) return true;
    return Object.keys(result as Object).length === 0;
  };

  const questionNum = () => {
    let num = 0;

    tasks.forEach((task) => {
      if (task.taskType === 'ESSAY') num += 1;
      else num += task.questions.length;
    });
    return num;
  };

  const [submitting, setSubmitting] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const contentEssay = useRef<any>({
    idEssayTask: -1,
    content: '',
  });
  const listAnw = useRef<any[]>([]);

  const setAws = (value: string, idAws: number, type: string) => {
    const listTmp = Object.assign(listAnw.current);

    if (type === 'ESSAY') {
      const dataAws: any = listTmp.find((e: any) => e.idEssayTask === idAws);

      if (dataAws) {
        dataAws.content = value;
      } else {
        listTmp.push({ idEssayTask: idAws, content: value });
      }
    } else {
      const dataAws = listTmp.find((e: any) => e.id === idAws);

      if (dataAws) {
        dataAws.answer = value;
      } else {
        listTmp.push({ id: idAws, answer: value });
      }
    }
    listAnw.current = listTmp;
  };

  const renderQuestion = (questItem: Question) => {
    const lsAws = questItem.answers;

    return isEmptyResult() ? (
      <FormControl key={questItem._id}>
        <FormLabel id="demo-row-radio-buttons-group-label">{questItem.sentence}</FormLabel>
        <RadioGroup
          row
          onChange={(_e, val) => setAws(val, questItem.id, '')}
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          {lsAws.map((e) => (
            <FormControlLabel value={e} control={<Radio />} label={e} />
          ))}
        </RadioGroup>
      </FormControl>
    ) : (
      <FormControl key={questItem._id}>
        {result.multiple_choice.correctQuestions.find((id: number) => id === questItem.id) ? (
          <>
            <FormLabel id="demo-row-radio-buttons-group-label" sx={{ color: 'green' }}>
              {questItem.sentence}
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              {lsAws.map((e) =>
                e === questItem.key ? (
                  <FormControlLabel value={e} control={<Radio />} label={e} checked />
                ) : (
                  <FormControlLabel value={e} control={<Radio />} label={e} disabled />
                )
              )}
            </RadioGroup>
          </>
        ) : (
          <>
            <FormLabel id="demo-row-radio-buttons-group-label" sx={{ color: 'red' }}>
              {questItem.sentence}
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              {lsAws.map((e) => (
                <FormControlLabel value={e} control={<Radio />} label={e} disabled />
              ))}
            </RadioGroup>
          </>
        )}
      </FormControl>
    );
  };

  const renderEssay = (task: any) =>
    isEmptyResult() ? (
      <TextField
        placeholder="Enter the essay"
        multiline
        maxRows={5}
        minRows={5}
        onChange={(e) =>
          (contentEssay.current = {
            idEssayTask: task.id,
            content: e.target.value,
          })
        }
      />
    ) : (
      <TextField
        placeholder="Enter the essay"
        multiline
        maxRows={5}
        minRows={5}
        disabled
        value={result?.essays[0]?.content}
      />
    );

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      if (tasks) {
        if (contentEssay.current.idEssayTask !== -1) {
          if (contentEssay.current.content === '') {
            enqueueSnackbar('Unfinished questions remained', {
              variant: 'warning',
            });
            return;
          }
          setAws(contentEssay.current.content, contentEssay.current.idEssayTask, 'ESSAY');
        }
        console.log(listAnw.current);
        if (listAnw.current.length < questionNum()) {
          enqueueSnackbar('Unfinished questions remained', {
            variant: 'warning',
          });
          return;
        }

        await submitLesson({
          id: lessonId,
          data: listAnw.current,
        });
      }
      enqueueSnackbar('Reload the page to check your result!');
    } catch (error) {
      enqueueSnackbar(error.message || JSON.stringify(error), {
        variant: 'error',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 1920, // Matches the Dialog's maxWidth
        backgroundColor: 'background.paper', // Ensure proper theme usage
        borderRadius: 1, // Optional rounded corners
        boxShadow: 3, // For elevation effect
        overflow: 'hidden', // Mimics Dialog behavior
        padding: 1, // Increase padding for content
      }}
    >
      {!isEmptyResult() && (
        <Alert severity="success">
          <AlertTitle>Congrats, you finished this exercise!</AlertTitle>
          <span>
            Your score:{' '}
            <span style={{ color: 'greenyellow' }}>{result?.multiple_choice?.score}</span> on
            multiple choices
          </span>
          {result?.essays && (
            <span>
              &nbsp; and <span style={{ color: 'greenyellow' }}>{result?.essays[0]?.score}</span> on
              essay
            </span>
          )}
        </Alert>
      )}

      <Box sx={{ padding: 1 }}>
        {tasks.map((task, index) => (
          <Box key={index} sx={{ marginBottom: 2 }}>
            <Typography variant="h6" sx={{ marginTop: 2, marginBottom: 2 }}>
              {index + 1}. {task?.task}
            </Typography>
            <Stack>{task?.questions.map((e) => renderQuestion(e))}</Stack>
            {task?.taskType === 'ESSAY' && <Stack>{renderEssay(task)}</Stack>}
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: 1, // Add some spacing
        }}
      >
        {isEmptyResult() ? (
          <LoadingButton loading={submitting} variant="contained" autoFocus onClick={handleSubmit}>
            Submit
          </LoadingButton>
        ) : (
          <LoadingButton
            loading={submitting}
            variant="contained"
            autoFocus
            onClick={handleSubmit}
            disabled
          >
            Submit
          </LoadingButton>
        )}
      </Box>
    </Box>
  );
};
export default DialogExcercise;
