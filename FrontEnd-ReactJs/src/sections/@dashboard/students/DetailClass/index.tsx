import { Alert, AlertTitle, Box, Card, Link, Popover, Stack, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { getClassDetail } from 'src/api/useQuestion';
import { fileThumb } from 'src/components/file-thumbnail';
import Label from 'src/components/label';
import { Link as RouterLink } from 'react-router-dom';
import { PATH_STUDENT } from 'src/routes/pathsStudent';
import LinearProgressWithLabel from 'src/components/LinearWithValueLabel';
import CircularProgressWithLabel from 'src/components/CirclearWithValueLabel';

type IPropsClass = {
  idClass: string;
  nameClass: string;
};
const DetailClass: FC<IPropsClass> = ({ idClass, nameClass }) => {
  const [listTest, setListTest] = useState([]);
  const [listLession, setListLession] = useState([]);
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
        <CircularProgressWithLabel value={record?.progressLesson} size={50} fontSize={14} />
        <Typography variant="h5" sx={{ mb: 3, marginTop: 2 }}>
          Lessons
        </Typography>
      </Box>

      <Stack flexDirection="row" gap={3}>
        {listLession.map((e: any) => (
          <Link
            component={RouterLink}
            to={`${PATH_STUDENT.class.listMyClass}/${idClass}/${nameClass}/${e?.id}/`}
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
        <CircularProgressWithLabel value={record?.progressTest} size={50} fontSize={14} />
        <Typography variant="h5" sx={{ mb: 3, marginTop: 2 }}>
          Tests
        </Typography>
      </Box>
      <Stack flexDirection="row" gap={3}>
        {listTest.map((e: any) => (
          <Link
            component={RouterLink}
            to={`${PATH_STUDENT.class.listMyClass}/${idClass}/${nameClass}/test/${e?.id}/`}
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
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const handlePopover = (value: any) => {
    if (value >= 50)
      return (
        <Alert severity="success">
          <AlertTitle>Well Done</AlertTitle>
          Your current score is {value}/100, keep it up!
        </Alert>
      );
    return (
      <Alert severity="warning">
        <AlertTitle>Warning</AlertTitle>
        Your current score is {value}/100, try harder or you will fail this class!
      </Alert>
    );
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex', // Arrange items in a row or column
          flexDirection: 'column', // Stack items vertically
          gap: 2, // Space between the items
        }}
      >
        <LinearProgressWithLabel
          value={record?.overall}
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        />

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
        id="mouse-over-popover"
        sx={{ pointerEvents: 'none' }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        {handlePopover(record?.overall)}
      </Popover>
    </>
  );
};

export default DetailClass;
