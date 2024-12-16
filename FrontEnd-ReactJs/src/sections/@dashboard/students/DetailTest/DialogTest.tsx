/* eslint-disable import/no-cycle */
/* eslint-disable no-return-assign */
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Stack } from '@mui/system';
import { LoadingButton } from '@mui/lab';
import { submitTest } from 'src/api/useQuestion';
import useCountdown from 'src/hooks/useCountdown';
import { useSnackbar } from 'notistack';
import { isDoingTest } from 'src/utils/localStorageAvailable';
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
  onOpen: (data: Task, time: number) => void;
  onClose: () => void;
};

const DialogTest = ({
  testId,
  result,
  tasks,
  time,
  available,
}: {
  testId: number;
  result: any;
  tasks: Task[];
  time: number;
  available: boolean;
}) => {
  const isEmptyResult = () => {
    if (result === undefined) return true;
    return result.length === 0 || Object.keys(result as Object).length === 0;
  };
  console.log(isEmptyResult());

  const questionNum = () => {
    let num = 0;

    tasks.forEach((task) => {
      if (task.taskType === 'ESSAY') num += 1;
      else num += task.questions.length;
    });
    return num;
  };

  const [timer, setTimer] = useState(time);

  const [timeCountDown, setTimeCountDown] = useState(new Date());
  const [isReady, setIsReady] = useState(false);

  const { hours, minutes, seconds } = useCountdown(timeCountDown, isReady);

  const [submitting, setSubmitting] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const contentEssay = useRef<any>({
    idEssayTask: -1,
    content: '',
  });
  const listAnw = useRef<IAnswer[]>([]);

  const startTest = () => {
    const d = new Date();
    const v = new Date();
    v.setMinutes(d.getMinutes() + timer);
    setTimeCountDown((prev) => {
      setIsReady(true);
      isDoingTest(true);
      return v;
    });
  };

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
      isDoingTest(false);
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

        await submitTest({
          id: testId,
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
      isDoingTest(false);
    }
  };
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isReady) {
        event.preventDefault();
        event.returnValue = ''; // Show the browser's default confirmation dialog.
      }
    };

    const handleUnload = () => {
      if (isReady) {
        handleSubmit();
        console.log('User choose leave');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('unload', handleUnload);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  return (
    <Box
      sx={{
        maxWidth: 1920,
        width: '100%',
        margin: 'auto', // Center horizontally
        borderRadius: 2, // Optional rounded corners
        boxShadow: 3, // Dialog-like shadow
        overflow: 'hidden', // Prevent content overflow
        backgroundColor: 'background.paper', // Theme background
      }}
    >
      {/* <span>{task?.topic}</span> */}
      {isEmptyResult() ? (
        <Box
          sx={{
            backgroundColor: (theme) => theme.palette.primary.main,
            color: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            display: 'flex',
            padding: 2,
          }}
        >
          {isReady ? (
            <span>
              {hours} : {minutes} : {seconds}
            </span>
          ) : (
            <span>00 : {time} : 00</span>
          )}
        </Box>
      ) : (
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

      {/* Content */}
      <Box
        sx={{
          padding: 2,
        }}
      >
        {isEmptyResult() ? (
          <>
            {isReady ? (
              <>
                {tasks.map((task, index) => (
                  <Box key={index} sx={{ marginBottom: 2 }}>
                    <Typography variant="h6" sx={{ marginTop: 2, marginBottom: 2 }}>
                      {index + 1}. {task?.task}
                    </Typography>
                    <Stack>{task?.questions.map((e) => renderQuestion(e))}</Stack>
                    {task?.taskType === 'ESSAY' && <Stack>{renderEssay(task)}</Stack>}
                  </Box>
                ))}
              </>
            ) : (
              <Stack sx={{ m: 2 }}>
                <Button
                  sx={{ alignSelf: 'center' }}
                  size="large"
                  variant="contained"
                  color="warning"
                  onClick={startTest}
                  disabled={!available}
                >
                  Are you ready?
                </Button>
              </Stack>
            )}
          </>
        ) : (
          <>
            {tasks.map((task, index) => (
              <Box key={index} sx={{ marginBottom: 2 }}>
                <Typography variant="h6" sx={{ marginTop: 2, marginBottom: 2 }}>
                  {index + 1}. {task?.task}
                </Typography>
                <Stack>{task?.questions.map((e) => renderQuestion(e))}</Stack>
                {task?.taskType === 'ESSAY' && <Stack>{renderEssay(task)}</Stack>}
              </Box>
            ))}
          </>
        )}
      </Box>

      {/* Actions */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: 2,
        }}
      >
        {isEmptyResult() ? (
          <>
            {isReady && (
              <LoadingButton
                loading={submitting}
                disabled={hours === '00' && minutes === '00' && seconds === '00'}
                variant="contained"
                onClick={handleSubmit}
              >
                Submit
              </LoadingButton>
            )}
          </>
        ) : (
          <LoadingButton loading={submitting} disabled variant="contained" onClick={handleSubmit}>
            Submit
          </LoadingButton>
        )}
      </Box>
    </Box>
  );
};
export default DialogTest;
