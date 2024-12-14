import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Grid, Card, Stack, Button, Typography, MenuItem, Box, Chip } from '@mui/material';
import { createTask } from 'src/api/useQuestion';
import { GridEventListener } from '@mui/x-data-grid';
import Iconify from 'src/components/iconify';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, { RHFTextField, RHFSelect } from '../../../components/hook-form';
import { QuestionList } from '../ELquestion';
//

// ----------------------------------------------------------------------

export type FormValuesProps = ITaskList;

export type ITaskList = {
  task: string;
  questions: number[];
  topic: string;
  taskType: string;
};
const dataTask: ITaskList = {
  task: '',
  questions: [],
  topic: '',
  taskType: '',
};

export default function QuestionForm() {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewTaskSchema = Yup.object().shape({
    task: Yup.string().required('task is required'),
    topic: Yup.string().required('topic is required'),
    taskType: Yup.string().required('taskType is required'),
  });

  const defaultValues = dataTask;

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewTaskSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const valueQuestions = watch('questions');

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await createTask(data);
      enqueueSnackbar('Create success!');
      navigate(PATH_DASHBOARD.task.list);
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.message || JSON.stringify(error), {
        variant: 'error',
      });
    }
  };

  const handleRowClick: GridEventListener<'rowClick'> = (params) => {
    let currentQuestion = valueQuestions;
    // @ts-ignore
    if (!currentQuestion.includes(params.id)) {
      // @ts-ignore
      currentQuestion.push(params.id);
    } else {
      // @ts-ignore
      currentQuestion = currentQuestion.filter((e) => e !== params.id);
    }
    setValue('questions', currentQuestion);
  };

  const renderListTask = () => (
    <Card sx={{ p: 3, my: 2 }}>
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
            List Question
          </Typography>
          <Stack direction="row" spacing={3}>
            {valueQuestions.map((e) => (
              <Chip key={e} clickable variant="filled" label={e} color="success" />
            ))}
          </Stack>
          <Box sx={{ height: 590 }}>
            <QuestionList
              gridProps={{
                // checkboxSelection: true,
                onRowClick: handleRowClick,
              }}
            />
          </Box>
        </Stack>
      </Stack>
    </Card>
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, my: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="task" label="Enter task" />
              <RHFTextField name="topic" label="Enter topic" />
            </Stack>
          </Card>
          {renderListTask()}
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFSelect
                fullWidth
                name="taskType"
                label="Task type"
                InputLabelProps={{ shrink: true }}
              >
                {['MULTIPLE_CHOICE', 'ESSAY'].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </RHFSelect>
            </Stack>
          </Card>

          <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
            <LoadingButton
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              loading={isSubmitting}
            >
              Create task
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
