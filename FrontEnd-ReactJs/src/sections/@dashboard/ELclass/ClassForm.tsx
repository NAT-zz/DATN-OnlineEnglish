import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Grid, Card, Stack, Button, Typography, MenuItem, Box, Chip } from '@mui/material';
import { createLesson, createClass } from 'src/api/useQuestion';
import { GridEventListener } from '@mui/x-data-grid';
import Iconify from 'src/components/iconify';
import RHFDatePicker from 'src/components/hook-form/RHFDatePicker';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, { RHFTextField, RHFSelect } from '../../../components/hook-form';
import { LessonList } from '../ELlesson';
import { TestList } from '../ELtest';
//

// ----------------------------------------------------------------------

export type FormValuesProps = IClassList;

export type IClassList = {
  name: string;
  description: string;
  lessons: number[];
  tests: number[];
  startDate: Date;
  endDate: Date;
};
const dataClass: IClassList = {
  name: '',
  description: '',
  lessons: [],
  tests: [],
  startDate: new Date(),
  endDate: new Date(),
};

export default function QuestionForm() {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewClassSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    startDate: Yup.date().typeError('start date is required'),
    endDate: Yup.date().typeError('End date is required'),
  });

  const defaultValues = dataClass;

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewClassSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const valueLesson = watch('lessons');
  const valueTest = watch('tests');

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await createClass(data);
      enqueueSnackbar('Create success!');
      navigate(PATH_DASHBOARD.class.list);
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.message || JSON.stringify(error), {
        variant: 'error',
      });
    }
  };

  const handleRowClickLesson: GridEventListener<'rowClick'> = (params) => {
    let currentLesson = valueLesson;
    // @ts-ignore
    if (!currentLesson.includes(params.id)) {
      // @ts-ignore
      currentLesson.push(params.id);
    } else {
      // @ts-ignore
      currentLesson = currentLesson.filter((e) => e !== params.id);
    }
    setValue('lessons', currentLesson);
  };

  const handleRowClickTest: GridEventListener<'rowClick'> = (params) => {
    let currentTest = valueTest;
    // @ts-ignore
    if (!currentTest.includes(params.id)) {
      // @ts-ignore
      currentTest.push(params.id);
    } else {
      // @ts-ignore
      currentTest = currentTest.filter((e) => e !== params.id);
    }
    setValue('tests', currentTest);
  };

  const renderListLesson = () => (
    <Card sx={{ p: 3, my: 2 }}>
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
            List Lesson
          </Typography>
          <Stack direction="row" spacing={3}>
            {valueLesson.map((e) => (
              <Chip key={e} clickable variant="filled" label={e} color="success" />
            ))}
          </Stack>
          <Box sx={{ height: 590 }}>
            <LessonList
              gridProps={{
                // checkboxSelection: true,
                onRowClick: handleRowClickLesson,
              }}
            />
          </Box>
        </Stack>
      </Stack>
    </Card>
  );
  const renderTestLesson = () => (
    <Card sx={{ p: 3, my: 2 }}>
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
            List Test
          </Typography>
          <Stack direction="row" spacing={3}>
            {valueTest.map((e) => (
              <Chip key={e} clickable variant="filled" label={e} color="success" />
            ))}
          </Stack>
          <Box sx={{ height: 590 }}>
            <TestList
              gridProps={{
                // checkboxSelection: true,
                onRowClick: handleRowClickTest,
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
        <Grid item xs={12} md={8} marginTop={-3}>
          <Card sx={{ p: 3, my: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="name" label="Enter name" />
              <RHFTextField name="description" label="Enter description" />
              <RHFDatePicker name="startDate" label="Enter start date" />
              <RHFDatePicker name="endDate" label="Enter end date" />
            </Stack>
          </Card>
          {renderListLesson()}
          {renderTestLesson()}
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFSelect
                fullWidth
                name="level"
                label="Select Level"
                InputLabelProps={{ shrink: true }}
              >
                {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((option: any) => (
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
              Create Class
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
