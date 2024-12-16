import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers';
import {
  Grid,
  Card,
  Stack,
  Button,
  Typography,
  MenuItem,
  Box,
  Chip,
  TextField,
} from '@mui/material';
import RHFDatePicker from 'src/components/hook-form/RHFDatePicker';
import FormProvider from 'src/components/hook-form/FormProvider';
import { RHFSelect, RHFTextField } from 'src/components/hook-form';
import { createLesson, createTask, createTest, getMyClass } from 'src/api/useQuestion';
import { GridEventListener } from '@mui/x-data-grid';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { useSnackbar } from '../../../components/snackbar';
import { TaskList } from '../ELtask';

//

// ----------------------------------------------------------------------

export type FormValuesProps = ITestList;

export type ITestList = {
  name: string;
  tasks: number[];
  publicDate: Date;
  endDate: Date;
  time: number;
};
const dataLesson: ITestList = {
  name: '',
  tasks: [],
  publicDate: new Date(),
  endDate: new Date(),
  time: 30,
};

export default function QuestionForm() {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewTestSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    publicDate: Yup.date().typeError('Public date is required'),
    endDate: Yup.date().typeError('End date is required'),
  });

  const defaultValues = dataLesson;

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewTestSchema),
    defaultValues,
  });

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const valueTask = watch('tasks');

  const [myClass, setMyClass] = useState<[]>([]);

  useEffect(() => {
    getMyClass().then((value) => {
      setMyClass(value.data);
    });
  }, []);

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await createTest(data);
      enqueueSnackbar('Create success!');
      navigate(PATH_DASHBOARD.test.list);
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.message || JSON.stringify(error), {
        variant: 'error',
      });
    }
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

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} marginTop={-3}>
          <Card sx={{ p: 3, my: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="name" label="Enter name" />
              <RHFDatePicker name="publicDate" label="Enter public date" />
              <RHFDatePicker name="endDate" label="Enter end date" />
              <RHFTextField type="number" name="time" label="Enter time" />
            </Stack>
          </Card>
          {renderListTask()}
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
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
              Create Test
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
