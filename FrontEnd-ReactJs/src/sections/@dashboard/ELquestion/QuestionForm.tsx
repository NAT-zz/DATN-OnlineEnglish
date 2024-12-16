import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';
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
  IconButton,
  Link,
} from '@mui/material';
import { createQuestion } from 'src/api/useQuestion';
import Iconify from 'src/components/iconify/Iconify';
import { IconButtonAnimate } from 'src/components/animate';
// routes
import axiosInstance from 'src/utils/axios';
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
  media?: {
    type: string;
    link: string;
  };
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

      data.media = {
        type: mediaType,
        link: mediaLink,
      };
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
      newData.media = {
        type: mediaType,
        link: mediaLink,
      };
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
      }, 500);
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

  const [mediaLink, setMediaLink] = useState('');
  const [mediaType, setMediaType] = useState('');

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

  const uploadImageHandler = useCallback(async (type: string) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/jpeg,image/jpg');
    input.click();
    input.onchange = async () => {
      const file: any = input && input.files ? input.files[0] : null;
      const link = await uploadImage(file);
      setMediaLink(link);
      setMediaType(type);
      console.log('link', link);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    const filenameWithExt = result.data.split('/').pop();
    const fileName = filenameWithExt.split('.')[0];

    return `https://player.cloudinary.com/embed/?public_id=file%2F${fileName}&cloud_name=natscloud&profile=cld-default`;
  };

  const uploadVideoHandler = useCallback(async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'video/mp4,video/webm');
    input.click();
    input.onchange = async () => {
      const file: any = input && input.files ? input.files[0] : null;
      const link = await uploadVideo(file);
      setMediaLink(link);
      setMediaType('video');
      console.log('link', link);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderMediaType = () => (
    <Stack direction="row" spacing={0}>
      <IconButton onClick={(e) => uploadImageHandler('image')}>
        <Iconify icon="formkit:fileimage" />
      </IconButton>
      <IconButton onClick={(e) => uploadImageHandler('audio')}>
        <Iconify icon="formkit:fileaudio" />
      </IconButton>
      <IconButton onClick={uploadVideoHandler}>
        <Iconify icon="formkit:filevideo" />
      </IconButton>

      {mediaLink && (
        <Typography marginTop="10px">
          <Link href={`${mediaLink}`} target="_blank" rel="noopener noreferrer">
            Preview
          </Link>
        </Typography>
      )}
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} marginTop={-3}>
          <Card sx={{ p: 3, my: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="sentence" label="Enter sentence" />
              {renderMediaType()}
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
