import { Box, Card, Container, Link, Popover, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { PATH_DASHBOARD } from 'src/routes/paths';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import { useSettingsContext } from 'src/components/settings';

import { Link as RouterLink } from 'react-router-dom';
import { IChatParticipant } from 'src/@types/chat';
import { useAuthContext } from 'src/api/useAuthContext';
import { getClassDetail, getMyClass, sendNoti } from 'src/api/useQuestion';
import { fileThumb } from 'src/components/file-thumbnail';

import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
import { IconButtonAnimate } from 'src/components/animate';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { ChatHeaderCompose } from '../chat';

export default function StudentManagerPage() {
  const { themeStretch, presetsOption } = useSettingsContext();
  // const theme = useTheme();

  const [myClass, setMyClass] = useState<[]>([]);
  const { user } = useAuthContext();

  useEffect(() => {
    getMyClass().then((value) => {
      setMyClass(value.data);
    });
  }, [user?.role]);

  const [listTest, setListTest] = useState([]);
  const [listLession, setListLession] = useState([]);
  const [idClass, setIdClass] = useState('');
  const [record, setRecord] = useState({} as any);

  useEffect(() => {
    getClassDetail(idClass).then((value) => {
      if (value?.data?.lessons) {
        setListLession(value.data.lessons);
      }
      if (value?.data?.tests) {
        setListTest(value.data.tests);
      }
      if (value?.data?.record) {
        console.log(value.data.record);
        setRecord(value.data.record);
      }
    });
  }, [idClass]);

  const handleAddRecipients = (selectedRecipients: IChatParticipant | null) => {
    if (!selectedRecipients) {
      setListTest([]);
      setListLession([]);
      setIdClass('');
    } else {
      getClassDetail(selectedRecipients.id as unknown as string).then((value) => {
        if (value?.data?.lessons) {
          setListLession(value.data.lessons);
          setIdClass(selectedRecipients.id as unknown as string);
        }
        if (value?.data?.tests) {
          setListTest(value.data.tests);
        }
        if (value?.data?.record) {
          console.log(value.data.record);
          setRecord(value.data.record);
        }
      });
    }
  };

  const listLessionClass = () => (
    <Box>
      <Box
        sx={{
          display: 'flex', // Arrange items in a row
          alignItems: 'center', // Vertically center align items
          gap: 2, // Space between the text and progress circle
          padding: 2,
          marginTop: -3,
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, marginTop: 2 }}>
          Lessons
        </Typography>
      </Box>

      <Stack flexDirection="row" gap={3}>
        {listLession.map((e: any) => (
          <Link
            component={RouterLink}
            to={`${PATH_DASHBOARD.studentManager.record}/${idClass}/lesson/${e?.id}`}
            underline="none"
          >
            <Card
              sx={{
                p: 2.5,
                minWidth: 250,
                boxShadow: (theme) => theme.customShadows.z20,
                bgcolor: 'background.default',
                border: (theme) => `solid 1px ${theme.palette.divider}`,
              }}
            >
              <Stack flexDirection="row" alignItems="center">
                <Box
                  component="img"
                  src={fileThumb('folder')}
                  sx={{
                    width: 32,
                    height: 32,
                    flexShrink: 0,
                  }}
                />
                <Label color="primary" sx={{ mx: 1 }}>
                  {e?.topic}
                </Label>
              </Stack>
              <Typography variant="body2">{e?.tasks?.length || 0} tasks</Typography>
            </Card>
          </Link>
        ))}
      </Stack>
    </Box>
  );

  const listTestClass = () => (
    <Box sx={{ mt: 2 }}>
      <Box
        sx={{
          display: 'flex', // Arrange items in a row
          alignItems: 'center', // Vertically center align items
          gap: 2, // Space between the text and progress circle
          padding: 2,
          marginTop: -3,
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, marginTop: 2 }}>
          Tests
        </Typography>
      </Box>
      <Stack flexDirection="row" gap={3}>
        {listTest.map((e: any) => (
          <Link
            component={RouterLink}
            to={`${PATH_DASHBOARD.studentManager.record}`}
            underline="none"
          >
            <Card
              sx={{
                p: 2.5,
                minWidth: 250,
                boxShadow: (theme) => theme.customShadows.z20,
                bgcolor: 'background.default',
                border: (theme) => `solid 1px ${theme.palette.divider}`,
              }}
            >
              <Stack flexDirection="row" alignItems="center">
                <Box
                  component="img"
                  src={fileThumb('folder')}
                  sx={{
                    width: 32,
                    height: 32,
                    flexShrink: 0,
                  }}
                />
                <Label color="primary" sx={{ mx: 1 }}>
                  {
                    // @ts-ignore
                    e?.name
                  }
                </Label>
              </Stack>
              <Typography variant="body2">
                {
                  // @ts-ignore
                  e?.tasks?.length || 0
                }{' '}
                tasks
              </Typography>
            </Card>
          </Link>
        ))}
      </Stack>
    </Box>
  );

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleClose = () => {
    setAnchorEl(null);
    setOpenPopover(null);
  };
  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const [submitting, setSubmitting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async () => {
    setSubmitting(true);
    sendNoti({
      id: idClass,
      content: notiContent.current,
    })
      .then((res) => {
        enqueueSnackbar(`"${notiContent.current}" has been sent to all students!`);
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar('Something went wrong, try again later!', {
          variant: 'error',
        });
      })
      .finally(() => {
        setSubmitting(false);
        notiContent.current = '';
      });
  };

  const notiContent = useRef('');

  return (
    <>
      <Helmet>
        <title> Student Record </title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading=" Student Record "
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            { name: 'Student Record' },
          ]}
        />

        <Stack
          spacing={1}
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ xs: 'flex-end', md: 'center' }}
          sx={{ mb: 1, ml: -2 }}
        >
          <ChatHeaderCompose
            recipients={myClass}
            contacts={myClass}
            onAddRecipients={handleAddRecipients}
          />

          <IconButtonAnimate
            color={openPopover ? 'primary' : 'default'}
            onClick={handleOpenPopover}
            disabled={idClass === ''}
            sx={{ width: 45, height: 45, color: 'text.secondary', ml: -4 }}
          >
            <Iconify icon="formkit:datetime" sx={{ width: 40, height: 40 }} />
          </IconButtonAnimate>
        </Stack>
      </Container>
      <Box
        sx={{
          display: 'flex', // Arrange items in a row or column
          flexDirection: 'column', // Stack items vertically
          gap: 2, // Space between the items
        }}
      >
        <Box
          sx={{
            border: '1px solid #ddd', // Light border
            borderRadius: 2, // Rounded corners
            padding: 2, // Inner padding
            boxShadow: 1, // Optional shadow for depth
          }}
        >
          {listLessionClass()}
        </Box>

        <Box
          sx={{
            border: '1px solid #ddd', // Light border
            borderRadius: 2, // Rounded corners
            padding: 2, // Inner padding
            boxShadow: 1, // Optional shadow for depth
          }}
        >
          {listTestClass()}
        </Box>
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box
          sx={{
            borderRadius: 1,
            padding: 1,
          }}
        >
          <TextField
            placeholder="Send a notification"
            size="small"
            maxRows={1}
            minRows={1}
            onChange={(e) => {
              notiContent.current = e.target.value;
            }}
          />
          <LoadingButton
            loading={submitting}
            variant="contained"
            size="small"
            autoFocus
            onClick={handleSubmit}
            sx={{
              height: 40,
            }}
          >
            Send
          </LoadingButton>
        </Box>
      </Popover>
    </>
  );
}
