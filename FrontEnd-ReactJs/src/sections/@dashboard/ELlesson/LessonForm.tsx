/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/media-has-caption */
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Grid, Card, Stack, Button, Typography, MenuItem, Box, Chip } from '@mui/material';
import { createLesson, createTask, getMyClass } from 'src/api/useQuestion';
import { GridEventListener } from '@mui/x-data-grid';
import RHFDatePicker from 'src/components/hook-form/RHFDatePicker';
import Editor from 'src/components/editor';
import axiosInstance from 'src/utils/axios';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, { RHFTextField, RHFSelect } from '../../../components/hook-form';
import { TaskList } from '../ELtask';
//

// ----------------------------------------------------------------------

export type FormValuesProps = ILessonList;

export type ILessonList = {
  topic: string;
  content: string;
  tasks: number[];
  type: 'LESSON' | 'TASKS';
  publicDate: Date;
  taskEndDate: Date;
};
const dataLesson: ILessonList = {
  topic: '',
  content: '',
  tasks: [],
  type: 'LESSON',
  publicDate: new Date(),
  taskEndDate: new Date(),
};

export default function QuestionForm() {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewLessonSchema = Yup.object().shape({
    topic: Yup.string().required('Topic is required'),
    content: Yup.string().required('Content is required'),
    publicDate: Yup.date().typeError('Public date is required'),
    taskEndDate: Yup.date().typeError('Task End date is required'),
    type: Yup.string().required('Type is required'),
  });

  const defaultValues = dataLesson;

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewLessonSchema),
    defaultValues,
  });

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const valueTask = watch('tasks');

  const valueEditor = watch('content');

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await createLesson(data);
      enqueueSnackbar('Create success!');
      navigate(PATH_DASHBOARD.lesson.list);
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.message || JSON.stringify(error), {
        variant: 'error',
      });
    }
  };
  const [myClass, setMyClass] = useState<[]>([]);

  useEffect(() => {
    getMyClass().then((value) => {
      setMyClass(value.data);
    });
  }, []);

  const onEditContent = (dataEditor: string) => {
    setValue('content', dataEditor);
  };

  const handleRowClick: GridEventListener<'rowClick'> = (params) => {
    let currentTask = valueTask;
    // @ts-ignore
    if (!currentTask.includes(params.id)) {
      // @ts-ignore
      currentTask.push(params.id);
    } else {
      // @ts-ignore
      currentTask = currentTask.filter((e) => e !== params.id);
    }
    setValue('tasks', currentTask);
  };

  const renderListTask = () => (
    <Card sx={{ p: 3, my: 2 }}>
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
            List Task
          </Typography>
          <Stack direction="row" spacing={3}>
            {valueTask.map((e) => (
              <Chip key={e} clickable variant="filled" label={e} color="success" />
            ))}
          </Stack>
          <Box sx={{ height: 590 }}>
            <TaskList
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

  const uploadImage = async (file: File) => {
    const data = new FormData();
    data.append('file', file);
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: '/api/upload',
      data,
    };

    const result = await axiosInstance.request(config);
    return result.data;
  };

  const uploadFile = async (file: File) => {
    const data = new FormData();
    data.append('file', file);
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: '/api/upload-ext',
      data,
    };

    const result = await axiosInstance.request(config);
    return result.data;
  };

  const uploadVideo = async (file: File) => {
    const data = new FormData();
    data.append('file', file);
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: '/api/upload',
      data,
    };

    const result = await axiosInstance.request(config);
    // https://res.cloudinary.com/natscloud/video/upload/v1734172224/file/file_xxjvcu.avi
    // https://player.cloudinary.com/embed/?public_id=file%2Ffile_xxjvcu&cloud_name=natscloud&profile=cld-default

    const filenameWithExt = result.data.split('/').pop();
    const fileName = filenameWithExt.split('.')[0];

    return `https://player.cloudinary.com/embed/?public_id=file%2F${fileName}&cloud_name=natscloud&profile=cld-default`;
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} marginTop={-3}>
          <Card sx={{ p: 3, my: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="topic" label="Enter topic" />
              <Editor
                onChange={onEditContent}
                simple
                value={valueEditor}
                imageHandler={uploadImage}
                videoHandler={uploadVideo}
                audioHandler={uploadImage}
                fileHandler={uploadFile}
              />
              <RHFDatePicker name="publicDate" label="Enter public date" />
              <RHFDatePicker name="taskEndDate" label="Enter task end date" />
            </Stack>
          </Card>
          {renderListTask()}
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFSelect fullWidth name="type" label="Type" InputLabelProps={{ shrink: true }}>
                {['LESSON', 'TASKS'].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </RHFSelect>
            </Stack>
          </Card>

          <Card sx={{ p: 3, mt: 2 }} >
            <Stack spacing={3}>
              <RHFSelect fullWidth name="classId" label="Add to Class" InputLabelProps={{ shrink: true }}>
                {myClass.map((option: any) => (
                  <MenuItem key={option} value={option.id}>
                    {option.name}
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
              Create Lesson
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
