import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import React, { useState, useCallback } from 'react';
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
  List,
  ListItemButton,
  ListItemIcon,
  Checkbox,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Radio,
  RadioGroup,
  FormControlLabel,
  Box,
  MenuItem,
} from '@mui/material';
import Iconify from 'src/components/iconify/Iconify';
import { IconButtonAnimate } from 'src/components/animate';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// @types
import { IBlogNewPost } from '../../../@types/blog';
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
import BlogNewPostPreview from './BlogNewPostPreview';

// ----------------------------------------------------------------------

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

export type FormValuesProps = IBlogNewPost;

type IQuestionList = {
  idQuestion: number;
  question: string;
  idAnswer?: number;
  answer: {
    idAs: number;
    title: string;
  }[];
};
const dataQuestion: IQuestionList = {
  idQuestion: 0,
  question: '',
  answer: [
    {
      idAs: 0,
      title: '',
    },
    {
      idAs: 1,
      title: '',
    },
    {
      idAs: 2,
      title: '',
    },
    {
      idAs: 3,
      title: '',
    },
  ],
};

export default function BlogNewPostForm() {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const [openPreview, setOpenPreview] = useState(false);

  const [questionList, setQuestionList] = useState<IQuestionList[]>([dataQuestion]);

  const NewBlogSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    tags: Yup.array().min(2, 'Must have at least 2 tags'),
    metaKeywords: Yup.array().min(1, 'Meta keywords is required'),
    cover: Yup.mixed().required('Cover is required'),
    content: Yup.string().required('Content is required'),
  });

  const defaultValues = {
    title: '',
    description: '',
    content: '',
    cover: null,
    tags: ['The Kid'],
    publish: true,
    comments: true,
    metaTitle: '',
    metaDescription: '',
    metaKeywords: [],
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewBlogSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const values = watch();

  const handleOpenPreview = () => {
    setOpenPreview(true);
  };

  const handleClosePreview = () => {
    setOpenPreview(false);
  };

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      handleClosePreview();
      enqueueSnackbar('Post success!');
      navigate(PATH_DASHBOARD.question.list);
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
  };

  // const handleDrop = useCallback(
  //   (acceptedFiles: File[]) => {
  //     const file = acceptedFiles[0];

  //     const newFile = Object.assign(file, {
  //       preview: URL.createObjectURL(file),
  //     });

  //     if (file) {
  //       setValue('cover', newFile, { shouldValidate: true });
  //     }
  //   },
  //   [setValue]
  // );

  // const handleRemoveFile = () => {
  //   setValue('cover', null);
  // };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    // eslint-disable-next-line @typescript-eslint/no-shadow
    dataQuestion: IQuestionList,
    index: number
  ) => {
    const answer = (event.target as HTMLInputElement).value;
    dataQuestion.idAnswer = Number(answer);
    questionList[index] = dataQuestion;

    setQuestionList(questionList);
  };

  const onAddQuestion = () => {
    setQuestionList((prev) => {
      const newQuestion = dataQuestion;

      newQuestion.idQuestion += 1;

      return [...prev, ...[newQuestion]];
    });
  };

  const renderListAnswer = () =>
    questionList.map((dt, index) => (
      <Card sx={{ p: 3, my: 2 }}>
        <Stack spacing={3}>
          <Stack spacing={1}>
            <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
              Answer
            </Typography>

            <RadioGroup
              value={dt.idAnswer}
              defaultValue={questionList[index].answer[0].idAs}
              onChange={(evt) => handleChange(evt, questionList[index], index)}
            >
              {dt.answer.map((ans, ind) => (
                <Box key={ind} sx={{ flexDirection: 'row' }}>
                  <FormControlLabel
                    key={ans.idAs}
                    value={ans.idAs}
                    control={<Radio color="primary" />}
                    label={
                      <RHFTextField name={`answer_${ind}`} label="enter answer" sx={{ my: 2 }} />
                    }
                    sx={{ textTransform: 'capitalize' }}
                  />
                </Box>
              ))}
            </RadioGroup>
          </Stack>
        </Stack>
      </Card>
    ));

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
              <div>
                <RHFSwitch
                  name="publish"
                  label="Publish"
                  labelPlacement="start"
                  sx={{ mb: 1, mx: 0, width: 1, justifyContent: 'space-between' }}
                />

                {/* <RHFSwitch
                  name="comments"
                  label="Enable comments"
                  labelPlacement="start"
                  sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
                /> */}
              </div>

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

              {/* <RHFAutocomplete
                name="tags"
                label="Tags"
                multiple
                freeSolo
                options={TAGS_OPTION.map((option) => option)}
                ChipProps={{ size: 'small' }}
              /> */}

              {/* <RHFTextField name="metaTitle" label="Meta title" />

              <RHFTextField
                name="metaDescription"
                label="Meta description"
                fullWidth
                multiline
                rows={3}
              />

              <RHFAutocomplete
                name="metaKeywords"
                label="Meta keywords"
                multiple
                freeSolo
                options={TAGS_OPTION.map((option) => option)}
                ChipProps={{ size: 'small' }}
              /> */}
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
              Add more
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

      <BlogNewPostPreview
        values={values}
        open={openPreview}
        isValid={isValid}
        isSubmitting={isSubmitting}
        onClose={handleClosePreview}
        onSubmit={handleSubmit(onSubmit)}
      />
    </FormProvider>
  );
}
