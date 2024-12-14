/* eslint-disable no-unsafe-optional-chaining */
import { useEffect, useState } from 'react';
import { Avatar, Box, Card, Divider, Typography } from '@mui/material';
import SvgColor from 'src/components/svg-color';
import { alpha, styled } from '@mui/system';
import Image from 'src/components/image';
import { getAllClass, getMyClass, registerClass } from 'src/api/useQuestion';
import _mock from 'src/_mock';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { GridExpandMoreIcon } from '@mui/x-data-grid';

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
    _id: '672c93f4293f4dc8d75c143b';
    userName: 'Nguyen Tuan';
    avatar: null;
    description: "Teacher Nguyen Tuan's description";
  };
};
type IPropsClass = {
  [level: string]: IPropsLession[];
};
const AllClass = () => {
  const [classRegister, setClass] = useState<IPropsClass>({});
  const { enqueueSnackbar } = useSnackbar();

  const filterClass = async () => {
    const [listAll, listMyClass] = await Promise.all([getAllClass(), getMyClass()]);
    console.log(listAll, listMyClass);

    const filterClassUnRegister = Object.fromEntries(
      Object.entries(listAll.data).map(([level, classes]) => [
        level,
        (classes as IPropsLession[]).filter((value: IPropsLession) => {
          const existClass = listMyClass.data.find(
            (myClass: IPropsLession) => myClass.id === value.id
          );
          return existClass ? null : value;
        }),
      ])
    );
    console.log('after filter:', filterClassUnRegister);

    setClass(filterClassUnRegister);
  };

  useEffect(() => {
    filterClass();
  }, []);

  const onRegister = (idClass: number) => () => {
    registerClass(idClass)
      .then(() => {
        enqueueSnackbar('register success');
        filterClass();
      })
      .catch((e) => {
        console.error(e);
        enqueueSnackbar(e.message || JSON.stringify(e), {
          variant: 'error',
        });
      });
  };

  const handleDes = (level: String) => {
    const res = {
      level: '',
      des: '',
    };
    if (level === 'A1') {
      res.level = 'A1 - Beginner';
      res.des = `- Can understand and use familiar everyday expressions and basic phrases.\n- Can introduce themselves and ask/answer simple questions about personal details.`;
    }
    if (level === 'A2') {
      res.level = 'A2 - Elementary';
      res.des = `- Can understand sentences and frequently used expressions related to areas of most immediate relevance (e.g., personal information, shopping, geography).\n- Can communicate in simple and routine tasks requiring a simple and direct exchange of information on familiar topics.`;
    }
    if (level === 'B1') {
      res.level = 'B1 - Intermediate';
      res.des = `- Can understand texts on familiar subjects encountered in work, school, or leisure.\n- Can deal with most situations likely to arise whilst traveling in an area where the language is spoken.\n- Can produce simple connected text on topics that are familiar or of personal interest.`;
    }
    if (level === 'B2') {
      res.level = 'B2 - Upper Intermediate';
      res.des = `- Can understand the main ideas of complex text on both concrete and abstract topics, including technical discussions in their field of specialization.\n- Can interact with a degree of fluency and spontaneity with native speakers, without strain for either party.`;
    }
    if (level === 'C1') {
      res.level = 'C1 - Advanced';
      res.des = `- Can produce clear, well-structured, detailed text on complex subjects related to their field of interest.\n- Can express themselves fluently and spontaneously without much obvious searching for expressions.\n- Can use language flexibly and effectively for social, academic, and professional purposes.`;
    }
    if (level === 'C2') {
      res.level = 'C2 - Proficient';
      res.des = `- Can read with ease virtually all forms of the written language, including abstract, structurally complex texts.\n- Can express themselves spontaneously, very fluently, and precisely, differentiating finer shades of meaning even in more complex situations.`;
    }
    return res;
  };

  return (
    <>
      {Object.keys(classRegister).map((level) => (
        <Accordion>
          <AccordionSummary
            expandIcon={<GridExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>
              {handleDes(`${level}`).level}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              {handleDes(`${level}`)
                .des?.split('\n')
                .map((line, ind) => (
                  <span key={ind}>
                    {line}
                    <br />
                  </span>
                ))}
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              maxWidth: 'lg',
            }}
          >
            <Box
              gap={3}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              }}
              sx={{
                width: '100%', // Ensure the Box spans the full width
              }}
            >
              {classRegister[level].map((classReg, index) => (
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

                  <Typography variant="subtitle1" sx={{ mt: 1, mb: 0.5 }}>
                    {classReg.teacher.userName}
                  </Typography>
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
                  <Box sx={{ position: 'relative', mb: 1, mx: 2 }}>
                    <LoadingButton
                      fullWidth
                      type="submit"
                      variant="contained"
                      size="medium"
                      onClick={onRegister(classReg.id)}
                    >
                      Register now
                    </LoadingButton>
                  </Box>
                </Card>
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};
export default AllClass;
