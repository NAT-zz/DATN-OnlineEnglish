// @mui
import {
  Avatar,
  Box,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Slide,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
// routes
import _mock from 'src/_mock';
// hooks
// utils
// components
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef, useRef, useState } from 'react';
import { getTasks, markEssay } from 'src/api/useQuestion';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { fDate } from '../../../utils/formatTime';
import Iconify from '../../../components/iconify';
import Image from '../../../components/image';

// ----------------------------------------------------------------------

const StyledOverlay = styled('div')(({ theme }) => ({
  top: 0,
  zIndex: 1,
  width: '100%',
  height: '100%',
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.64),
}));

// ----------------------------------------------------------------------
type IBlogPost = {
  student: {
    _id: '673628c87e1dedaf86828d0c';
    id: 3;
    userName: 'Tuan Nguyen';
    avatar: null;
  };
  result: {
    id: 2;
    multiple_choice: {
      score: '40% - 2/5 ';
      correctQuestions: [2, 3];
    };
    essays: [
      {
        idTask: 4;
        score: 'waiting';
        content: 'testtsetste';
      }
    ];
  };
  createdAt: 1733669266182;
};

type Props = {
  post: IBlogPost;
  index: number;
  type: string;
};

const Transition = forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>
  ) => <Slide direction="up" ref={ref} {...props} />
);

export default function BlogPostCard({ post, index, type }: Props) {
  const { student, createdAt } = post;
  const correct = post?.result?.multiple_choice?.correctQuestions?.length;
  const score = post?.result?.multiple_choice?.score?.slice(0, 2);
  const essayCount = post?.result?.essays?.length || 0;

  const [open, setOpen] = useState(false);
  const [task, setTask] = useState<any>();

  const [submitting, setSubmitting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const contentGrade = useRef<number>(0);
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    if (!essayCount) return;

    setOpen(true);

    getTasks().then((value) => {
      setTask(value.data.find((val: any) => val.id === post?.result?.essays[0]?.idTask));
    });
  };

  const renderEssay = () => (
    <TextField
      placeholder="Enter the essay"
      multiline
      maxRows={5}
      minRows={5}
      value={post?.result?.essays[0]?.content}
      disabled
      sx={{
        my: 2,
      }}
    />
  );

  const handleSubmit = async () => {
    markEssay({
      studentId: student.id,
      type,
      taskId: post?.result?.essays[0]?.idTask,
      score: contentGrade.current,
    })
      .then((res) => {
        enqueueSnackbar('Success!');
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar('You marked this essay', {
          variant: 'error',
        });
      });
  };

  return (
    <>
      <Card sx={{ textAlign: 'center', width: 230 }} onClick={handleClickOpen}>
        <Box sx={{ position: 'relative' }}>
          <Avatar
            src={student.avatar || _mock.image.avatar(index)}
            sx={{
              width: 140,
              height: 140,
              zIndex: 11,
              left: 0,
              right: 0,
              bottom: -32,
              mx: 'auto',
              position: 'absolute',
            }}
          />

          <StyledOverlay />

          <Image src={_mock.image.cover(index)} ratio="16/9" />
        </Box>
        <Typography variant="subtitle1" sx={{ mt: 6, mb: 0.5 }}>
          {student.userName}
        </Typography>

        {post?.result && (
          <>
            <Divider sx={{ borderStyle: 'dashed' }} />
            <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" sx={{ py: 1 }}>
              <div>
                <Typography variant="caption" component="div" sx={{ color: 'text.disabled' }}>
                  Correct
                </Typography>
                <Typography variant="subtitle1">{correct}</Typography>
              </div>

              <div>
                <Typography variant="caption" component="div" sx={{ color: 'text.disabled' }}>
                  Score
                </Typography>

                <Typography variant="subtitle1">{score}</Typography>
              </div>

              <div>
                <Typography variant="caption" component="div" sx={{ color: 'text.disabled' }}>
                  Essay
                </Typography>
                <Typography variant="subtitle1">{essayCount}</Typography>
              </div>
            </Box>
            <Divider sx={{ borderStyle: 'dashed' }} />

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Submitted at: {fDate(createdAt)}
            </Typography>
          </>
        )}
      </Card>
      <Dialog
        open={open}
        scroll="paper"
        id="order-detail"
        fullWidth
        keepMounted={false}
        maxWidth="lg"
        PaperProps={{
          sx: {
            maxWidth: 1920,
          },
        }}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        {' '}
        <DialogTitle
          sx={{
            backgroundColor: (theme) => theme.palette.primary.main,
            color: 'white',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            display: 'flex',
            marginBottom: 2,
          }}
        >
          <span>{task?.topic}</span>
          <Iconify icon="eva:close-fill" width={24} onClick={handleClose} />
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="h6">{task?.task}</Typography>
          <Stack>{renderEssay()}</Stack>
        </DialogContent>
        <DialogActions>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {post?.result?.essays[0].score === 'waiting' ? (
              <>
                <TextField
                  placeholder="0-100"
                  maxRows={1}
                  minRows={1}
                  sx={{ marginRight: 0.5, width: 75, height: 52 }}
                  // eslint-disable-next-line no-return-assign
                  type="number" // Restricts input to numbers
                  inputProps={{
                    min: 0,
                    max: 100,
                    step: 1, // Ensures only integers are input
                  }}
                  onChange={(e) => {
                    let value = parseInt(e.target.value, 10);

                    // eslint-disable-next-line no-restricted-globals
                    if (isNaN(value)) {
                      value = 0; // Handle non-numeric inputs
                    }

                    // Clamp the value between 0 and 100
                    if (value < 0) value = 0;
                    if (value > 100) value = 100;

                    contentGrade.current = value; // Save the validated value
                    e.target.value = value as unknown as string; // Update the displayed value
                  }}
                />
                <LoadingButton
                  loading={submitting}
                  variant="contained"
                  autoFocus
                  onClick={handleSubmit}
                  sx={{
                    height: 56,
                  }}
                >
                  Mark
                </LoadingButton>
              </>
            ) : (
              <>
                <TextField
                  placeholder="0-100"
                  maxRows={1}
                  minRows={1}
                  sx={{ marginRight: 0.5, width: 75, height: 52 }}
                  value={post?.result?.essays[0].score}
                  disabled
                />
                <LoadingButton
                  loading={submitting}
                  variant="contained"
                  autoFocus
                  onClick={handleSubmit}
                  sx={{
                    height: 56,
                  }}
                  disabled
                >
                  Mark
                </LoadingButton>
              </>
            )}
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
}
