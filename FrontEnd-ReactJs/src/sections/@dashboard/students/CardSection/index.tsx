/* eslint-disable no-unsafe-optional-chaining */
import { useEffect, useInsertionEffect, useRef, useState } from 'react';
import {
  Alert,
  Box,
  Card,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Input,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { alpha, styled } from '@mui/system';
import Image from 'src/components/image';
import { getDaily, submitDaily } from 'src/api/useQuestion';
import _mock from 'src/_mock';
import { useSnackbar } from 'notistack';
import Iconify from 'src/components/iconify';
import PronunciationPractice from 'src/sections/@dashboard/students/PronounSection';
import { LoadingButton } from '@mui/lab';

type IPropsQuestion = {
  id: 1;
  word: 'apple';
  definition: '/ˈæp.əl/ : A common, round fruit produced by the tree Malus domestica, cultivated in temperate climates.';
  pronounLink: 'https://api.dictionaryapi.dev/media/pronunciations/en/apple-uk.mp3';
  question: 'The new employee brought an apple to her desk.';
  __v: 0;
  imageLink: 'https://developer.apple.com/wwdc24/images/og/phase-3-xjf/wwdc24-p3-og-twitter.png';
};

type IPropsRecord = {
  userId: 3;
  result: [];
  progress: 0;
  todayStatus: true;
};

const CARD_WIDTH = 200; // Fixed card width
const CARD_HEIGHT = 350; // Fixed card height

const FlipContainer = styled(Box)(({ theme }) => ({
  perspective: '1000px',
  width: `${CARD_WIDTH}px`,
  height: `${CARD_HEIGHT}px`,
}));

const FlipInner = styled(Box)(({ flipped }: { flipped: boolean }) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  transformStyle: 'preserve-3d',
  transition: 'transform 0.6s',
  transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
}));
const FlipSide = styled(Card)(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backfaceVisibility: 'hidden', // Hide the back side when not visible
  overflow: 'hidden',
}));

const FlipFront = styled(FlipSide)(({ theme }) => ({}));

const FlipBack = styled(FlipSide)(({ theme }) => ({
  transform: 'rotateY(180deg)', // Rotate back side
}));

const AllCard = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [dailyQuestion, setDailyQuestion] = useState<IPropsQuestion[]>([]);
  const [dailyRecord, setDailyRecord] = useState<IPropsRecord>();

  type IAnswer = {
    id: number;
    answer: string;
  };
  const listAnw = useRef<IAnswer[]>([]);

  const getData = () => {
    getDaily().then((value) => {
      setDailyQuestion(value.data.questions);
      setDailyRecord(value.data.dailyRecord);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const adjustData = dailyQuestion.map((val) => {
    const extPronoun = val.definition.split(':');

    return {
      ...val,
      word: val.word.charAt(0).toUpperCase() + val.word.slice(1),
      pronoun: extPronoun[0].trim(),
      definition: extPronoun[1].trim(),
    };
  });

  const [flipped, setFlipped] = useState<number | null>(null);

  const handleFlip = (index: number) => {
    setFlipped((prev) => (prev === index ? null : index)); // Toggle flip state
  };

  const handlePlayPronunciation = (pronounceLink: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent the card flip when clicking the icon
    const audio = new Audio(pronounceLink);
    audio.play();
  };

  // question

  const [submitting, setSubmitting] = useState(false);

  const setAws = (value: string, idAws: number) => {
    const listTmp = Object.assign(listAnw.current) as IAnswer[];
    const dataAws = listTmp.find((e) => e.id === idAws);

    if (dataAws) {
      dataAws.answer = value;
    } else {
      listTmp.push({ id: idAws, answer: value });
    }
    listAnw.current = listTmp;
  };

  const renderQuestion = (dataItem: any, index: number) => {
    const parts = dataItem.question.split('-----');

    return (
      <FormControl key={index} sx={{ marginBottom: 2 }}>
        <Typography variant="body1" component="div">
          {`${index + 1}.  `}
          {parts[0]}

          {dailyRecord?.todayStatus ? (
            <TextField
              id={`outlined-basic-${index}`}
              variant="outlined"
              size="small"
              disabled
              value={dataItem.word}
              sx={{ width: 150, verticalAlign: 'middle' }}
            />
          ) : (
            <TextField
              id={`outlined-basic-${index}`}
              variant="outlined"
              size="small"
              onChange={(e) => setAws(e.target.value, dataItem.id)}
              sx={{ width: 150, verticalAlign: 'middle' }}
            />
          )}

          {parts[1]}
        </Typography>
      </FormControl>
    );
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      console.log(listAnw);
      await submitDaily({
        data: listAnw.current,
      });

      getData();
      enqueueSnackbar("Congrats, you finished today's tasks");
      enqueueSnackbar("You get +1 coin for completing today's tasks");
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error',
      });
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(5, 1fr)',
          },
          gap: 1,
          justifyContent: 'center',
        }}
      >
        {adjustData.map((data, index) => (
          <FlipContainer key={index} onClick={() => handleFlip(index)}>
            <FlipInner flipped={flipped === index}>
              {/* Front of the card */}
              <FlipFront>
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 2,
                  }}
                >
                  {/* Image */}
                  <Box
                    sx={{
                      width: '100%',
                      height: '180px',
                      overflow: 'hidden',
                      borderRadius: 2,
                      marginBottom: 2,
                    }}
                  >
                    <img
                      src={data.imageLink}
                      alt={data.word}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>

                  {/* Word */}
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontSize: 20,
                      textAlign: 'center',
                      userSelect: 'none',
                    }}
                  >
                    {data.word}
                  </Typography>

                  {/* Pronunciation */}
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: 'text.secondary',
                      textAlign: 'center',
                      marginTop: 1,
                    }}
                  >
                    {data.pronoun}
                  </Typography>

                  <IconButton onClick={(event) => handlePlayPronunciation(data.pronounLink, event)}>
                    <Iconify icon="formkit:caretright" />
                  </IconButton>
                  <PronunciationPractice word={data.word} />
                </Box>
              </FlipFront>

              {/* Back of the card */}
              <FlipBack>
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 2,
                  }}
                >
                  {/* Definition */}
                  <Typography
                    variant="body2"
                    sx={{
                      textAlign: 'center',
                      color: 'text.secondary',
                      wordWrap: 'break-word',
                      overflow: 'visible',
                      fontSize: 16,
                    }}
                  >
                    {data.definition}
                  </Typography>
                </Box>
              </FlipBack>
            </FlipInner>
          </FlipContainer>
        ))}
      </Box>
      {dailyRecord?.todayStatus && (
        <Alert
          variant="filled"
          severity="info"
          sx={{
            marginTop: 3,
            color: (theme) => (theme.palette.mode === 'light' ? 'black' : 'white'),
          }}
        >
          Come back tomorrow to continue your streak: {dailyRecord.progress / 5}
        </Alert>
      )}
      <Box
        sx={{
          border: '1px solid #ccc', // Light grey border
          borderRadius: '8px', // Rounded corners
          padding: 2, // Padding inside the box
          marginTop: 3, // Top margin
        }}
      >
        <Typography variant="h3" marginTop={5} marginBottom={5}>
          Fill the above words into these sentences
        </Typography>
        <Stack>{adjustData.map((e, index) => renderQuestion(e, index))}</Stack>
        <LoadingButton
          loading={submitting}
          disabled={dailyRecord?.todayStatus}
          variant="contained"
          autoFocus
          onClick={handleSubmit}
        >
          Submit
        </LoadingButton>
      </Box>
    </>
  );
};
export default AllCard;
