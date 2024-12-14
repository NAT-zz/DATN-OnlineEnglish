/* eslint-disable no-unsafe-optional-chaining */
import React, { useEffect, useState } from 'react';
import { Avatar, Box, Card, Divider, Link, Stack, Typography } from '@mui/material';
import SvgColor from 'src/components/svg-color';
import { Link as RouterLink } from 'react-router-dom';
import { alpha, styled } from '@mui/system';
import Image from 'src/components/image';
import { getMyClass, unRegisterClass } from 'src/api/useQuestion';
import _mock from 'src/_mock';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { PATH_STUDENT } from 'src/routes/pathsStudent';
import Iconify from 'src/components/iconify';

const StyledOverlay = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 8,
  width: '100%',
  height: '100%',
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.64),
}));

type IPropsLession = {
  id: number;
  name: 'A1 course';
  description: 'Aim to teach english at A1 level';
  lessons: [2];
  tests: [2];
  startDate: '2024-11-07T10:18:33.003Z';
  endDate: '2024-12-07T10:18:33.003Z';
  __v: 2;
  teacher: {
    coin: 100;
    _id: '672c93f4293f4dc8d75c143b';
    userName: 'Nguyen Tuan';
    avatar: null;
    description: "Teacher Nguyen Tuan's description";
  };
};
const MyClass = () => {
  const [myClass, setMyClass] = useState<IPropsLession[]>([]);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    getCurrentClass();
  }, []);

  const getCurrentClass = () => {
    getMyClass().then((value) => {
      setMyClass(value.data);
    });
  };

  const onUnRegister = (idClass: number) => () => {
    unRegisterClass(idClass)
      .then(() => {
        enqueueSnackbar('Unregister success');
        enqueueSnackbar('You get +10 coin back');
        getCurrentClass();
      })
      .catch((e) => {
        console.error(e);
        enqueueSnackbar(e.message || JSON.stringify(e), {
          variant: 'error',
        });
      });
  };

  return (
    <>
      {myClass.map((classReg, index) => (
        <Card sx={{ textAlign: 'center' }}>
          <Box sx={{ position: 'relative' }}>
            <SvgColor
              src="/assets/shape_avatar.svg"
              sx={{
                width: 144,
                height: 62,
                zIndex: 10,
                left: 0,
                right: 0,
                bottom: -26,
                mx: 'auto',
                position: 'absolute',
                color: 'background.paper',
              }}
            />

            <Avatar
              src={classReg.teacher.avatar || _mock.image.avatar(index)}
              sx={{
                width: 64,
                height: 64,
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
            {classReg.name}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {classReg.description}
          </Typography>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              width: '50%', // Reduce the width to bring the items closer to the center
              margin: '0 auto', // Center the Stack itself within its container
            }}
          >
            <Typography variant="subtitle1" sx={{ mt: 1, mb: 0.5 }}>
              {classReg.teacher.userName}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
            >
              <Iconify icon="line-md:account-add" width={22} color="text.secondary" />
              <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                {classReg.teacher.coin}
              </Typography>
            </Box>
          </Stack>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {classReg.teacher.description}
          </Typography>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" sx={{ py: 3 }}>
            <div>
              <Typography variant="caption" component="div" sx={{ color: 'text.disabled' }}>
                Total Lession
              </Typography>
              <Typography variant="subtitle1">{classReg?.lessons?.length || 0}</Typography>
            </div>

            <div>
              <Typography variant="caption" component="div" sx={{ color: 'text.disabled' }}>
                Total Test
              </Typography>

              <Typography variant="subtitle1">{classReg?.tests?.length || 0}</Typography>
            </div>

            <div>
              <Typography variant="caption" component="div" sx={{ color: 'text.disabled' }}>
                Total Practice
              </Typography>
              <Typography variant="subtitle1">
                {classReg?.tests?.length + classReg?.lessons?.length}
              </Typography>
            </div>
          </Box>
          <Stack flexDirection="row" sx={{ mb: 1, mx: 2 }}>
            <Link
              component={RouterLink}
              to={`${PATH_STUDENT.class.listMyClass}/${classReg.id}/${classReg.name}`}
              underline="none"
              sx={{ mr: 2 }}
            >
              <LoadingButton fullWidth type="submit" variant="contained" size="medium">
                Learn
              </LoadingButton>
            </Link>
            <LoadingButton
              fullWidth
              type="submit"
              variant="contained"
              size="medium"
              color="error"
              onClick={onUnRegister(classReg.id)}
            >
              UnRegister
            </LoadingButton>
          </Stack>
        </Card>
      ))}
    </>
  );
};
export default MyClass;
