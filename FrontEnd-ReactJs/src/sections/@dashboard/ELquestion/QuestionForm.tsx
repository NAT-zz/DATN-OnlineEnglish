import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import {
  Grid,
  Card,
  Stack,
  Button,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Box,
  MenuItem,
} from '@mui/material';
import { createQuestion } from 'src/api/useQuestion';
import Iconify from 'src/components/iconify/Iconify';
import { IconButtonAnimate } from 'src/components/animate';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, {
  RHFSwitch,
  RHFEditor,
  RHFUpload,
  RHFTextField,
  RHFAutocomplete,
  RHFSelect,
} from '../../../components/hook-form';
//

const TAGS_OPTION = [
  'Toy Story 3',
  'Logan',
  'Full Metal Jacket',
  'Dangal',
  'The Sting',
  '2001: A Space Odyssey',
  "Singin' in the Rain",
  'Toy Story',
  'Bicycle Thieves',
  'The Kid',
  'Inglourious Basterds',
  'Snatch',
  '3 Idiots',
];

// ----------------------------------------------------------------------

export type FormValuesProps = IQuestionList;

export type IQuestionList = {
  sentence: string;
  questionType: 'SELECT' | 'FILL' | 'LISTEN';
  key: string;
  answers: string[];
  media?: string;
  answer_0?: string;
  answer_1?: string;
  answer_2?: string;
  answer_3?: string;
};
const dataQuestion: IQuestionList = {
  sentence: '',
  questionType: 'SELECT',
  answers: [],
  key: '',
};

export default function QuestionForm() {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewQuestionSchema = Yup.object().shape({
    sentence: Yup.string().required('Sentence is required'),
    questionType: Yup.string().required('Question type is required'),
    key: Yup.string().required('Key is required'),
    // answer: Yup.array().min(1, 'Answer is required'),
  });

  const defaultValues = dataQuestion;

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewQuestionSchema),
    defaultValues,
  });

  const {
    reset,
    resetField,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const value = watch();

  const onSubmit = async (data: FormValuesProps) => {
    try {
      data.answers = [
        data.answer_0 || '',
        data.answer_1 || '',
        data.answer_2 || '',
        data.answer_3 || '',
      ];
      delete data.answer_0;
      delete data.answer_1;
      delete data.answer_2;
      delete data.answer_3;
      await createQuestion(data);
      enqueueSnackbar('Create success!');
      navigate(PATH_DASHBOARD.question.list);
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.message || JSON.stringify(error), {
        variant: 'error',
      });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const keyAnswer = (event.target as HTMLInputElement).value;

    const fieldKey = `answer_${keyAnswer}`;
    // @ts-ignore
    const keyValue = value?.[fieldKey] || '';

    setValue('key', keyValue);
  };

  const onAddQuestion = async () => {
    try {
      const newData = value;
      console.log(newData);
      newData.answers = [
        newData.answer_0 || '',
        newData.answer_1 || '',
        newData.answer_2 || '',
        newData.answer_3 || '',
      ];
      delete newData.answer_0;
      delete newData.answer_1;
      delete newData.answer_2;
      delete newData.answer_3;

      await createQuestion(newData);
      reset();
      enqueueSnackbar('Create success!');
      setTimeout(() => {
        navigate(0);
      },500);
    } catch (error) {
      enqueueSnackbar(error.message || JSON.stringify(error), {
        variant: 'error',
      });
    }
  };

  const renderListAnswer = () => (
    <Card sx={{ p: 3, my: 2 }}>
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
            Answer
          </Typography>

          <RadioGroup onChange={handleChange} name="key">
            {[0, 1, 2, 3].map((ans, ind) => (
              <Box key={ind} sx={{ flexDirection: 'row' }}>
                <FormControlLabel
                  key={ans}
                  value={ans}
                  control={<Radio color="primary" />}
                  label={
                    <RHFTextField
                      name={`answer_${ind}`}
                      label="enter answer"
                      sx={{ my: 2 }}
                      defaultValue=""
                    />
                  }
                  sx={{ textTransform: 'capitalize' }}
                />
              </Box>
            ))}
          </RadioGroup>
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
              <RHFTextField name="sentence" label="Enter sentence" />
            </Stack>
          </Card>
          {renderListAnswer()}
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFSelect
                fullWidth
                name="questionType"
                label="Question type"
                InputLabelProps={{ shrink: true }}
              >
                {['SELECT', 'FILL', 'LISTEN'].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </RHFSelect>
            </Stack>
          </Card>

          <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
            <Button
              fullWidth
              color="inherit"
              variant="outlined"
              size="large"
              onClick={onAddQuestion}
            >
              Add more question
            </Button>

            <LoadingButton
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              loading={isSubmitting}
            >
              Post
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
