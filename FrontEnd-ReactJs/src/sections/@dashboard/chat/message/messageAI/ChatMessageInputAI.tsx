/* eslint-disable react/jsx-no-bind */
import { Dispatch, forwardRef, SetStateAction, useEffect, useRef, useState } from 'react';
// @mui
import {
  Stack,
  InputBase,
  InputBaseProps,
  IconButton,
  InputAdornment,
  Slider,
  Box,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Divider,
} from '@mui/material';
// utils
// @types
// components

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import { TransitionProps } from '@mui/material/transitions';
import { getMessageAi, sendMessageAI } from 'src/api/useQuestion';
import { useSnackbar } from 'notistack';
import { fDateTime, fToNow } from 'src/utils/formatTime';
import Iconify from '../../../../../components/iconify';
import { IChatAI } from '../../../../../@types/chat';
import ChatMessageListAI from './ChatMessageListAI';

// ----------------------------------------------------------------------

const CURRENT_USER_ID = '8864c717-587d-472a-929a-8e5f298024da-0';

interface Props extends InputBaseProps {
  conversationId: number | null;
  onSend: (data: IChatAI) => void;
  setCurrentConversations: Dispatch<SetStateAction<never[]>>;
}

const Transition = forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) => <Slide direction="up" ref={ref} {...props} />
);
export default function ChatMessageInput({
  disabled,
  conversationId,
  onSend,
  sx,
  setCurrentConversations,
  ...other
}: Props) {
  const [message, setMessage] = useState('');
  const [messageStart, setMessageStart] = useState(false);
  const [isStop, setIsStop] = useState(false);

  const [userRate, setUserRate] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);

  const [isOpenDetail, setIsOpenDetail] = useState(false);

  const descriptionElementRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (isOpenDetail) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [isOpenDetail]);

  const { enqueueSnackbar } = useSnackbar();

  function valuetext(value: number) {
    return `${value}`;
  }

  const onSendMess = () => {
    setMessageStart(true);
    if (onSend && message) {
      onSend({
        message,
        senderName: 'me',
      });
      setMessage('');
    }
  };

  const onEnd = () => {
    setMessageStart(false);
    setIsStop(true);
  };

  const handleSend = (event: React.KeyboardEvent<HTMLInputElement>) => {
    setMessageStart(true);
    if (event.key === 'Enter') {
      if (onSend && message) {
        onSend({
          message,
          senderName: 'me',
        });
      }
      setMessage('');
    }
  };

  const handleRate = async () => {
    try {
      await sendMessageAI({ content: '', rate: userRate as unknown as string });

      setMessageStart(false);
      setIsStop(false);
      setCurrentConversations([]);

      enqueueSnackbar('We appreciate your support!');
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setUserRate(newValue);
    }
  };

  const handleHistoryDialog = () => {
    if (isOpen) setIsOpen(false);
    else setIsOpen(true);
  };

  const [historyConversation, setHistoryConversation] = useState([]);
  const [historyRate, setHistoryRate] = useState(0);

  const handleDetailDialog = (data: any) => {
    if (isOpenDetail) setIsOpenDetail(false);
    else {
      setHistoryRate(data.rate as number);
      const modifiedMessages = data.messages.map((msg: any) => ({
        message: msg.message,
        senderName: msg.senderId === 0 ? 'E-Bot' : 'Me',
      }));

      setHistoryConversation(modifiedMessages);
      setIsOpenDetail(true);
    }
  };

  const [dataHistory, setDataHistory] = useState([]);

  useEffect(() => {
    getMessageAi().then((value) => {
      setDataHistory(value.data);
    });
  }, []);

  return (
    <>
      <InputBase
        value={message}
        onKeyUp={handleSend}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Type a message"
        startAdornment={
          <InputAdornment position="start">
            <IconButton size="small">
              <Iconify icon="eva:smiling-face-fill" />
            </IconButton>
          </InputAdornment>
        }
        endAdornment={
          <Stack direction="row" spacing={1} sx={{ flexShrink: 0, mr: 1.5 }}>
            <IconButton onClick={onSendMess}>
              <Iconify icon="formkit:caretright" />
            </IconButton>
            <IconButton onClick={onEnd} disabled={!messageStart}>
              <Iconify icon="formkit:pause" />
            </IconButton>
            <IconButton onClick={handleHistoryDialog}>
              <Iconify icon="formkit:time" />
            </IconButton>
          </Stack>
        }
        sx={{
          pl: 1,
          height: 56,
          flexShrink: 0,
          borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
          ...sx,
        }}
        {...other}
      />
      <Dialog
        open={isStop}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleRate}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>How is your conversation with E-Bot ?</DialogTitle>
        <DialogContent>
          <Box sx={{ marginTop: 5 }}>
            <Slider
              value={userRate}
              getAriaValueText={valuetext}
              aria-labelledby="Temperature"
              valueLabelDisplay="on"
              onChange={handleChange}
              step={1}
              marks
              min={0}
              max={5}
            />
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
          }}
        >
          <Button onClick={handleRate}>Confirm</Button>
        </DialogActions>
      </Dialog>

      {/* list conversation */}
      <Dialog
        fullScreen
        open={isOpen}
        onClose={handleHistoryDialog}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleHistoryDialog}
              aria-label="close"
            >
              <IconButton>
                <Iconify icon="formkit:close" />
              </IconButton>
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              You have {dataHistory.length} conversations with E-Bot
            </Typography>
          </Toolbar>
        </AppBar>
        {dataHistory.map((conver: any) => (
          <List>
            <ListItemButton>
              <ListItemText
                primary={`${fDateTime(conver?.createdAt)}  -  ${fToNow(conver?.createdAt)}`}
                secondary={`You rated this conversation ${conver?.rate} out of 5`}
                onClick={() => handleDetailDialog(conver)}
              />
            </ListItemButton>
            <Divider />
          </List>
        ))}
      </Dialog>

      {/* detail conversation */}

      <Dialog
        open={isOpenDetail}
        onClose={handleDetailDialog}
        scroll="body"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <Slider
          step={1}
          marks
          min={0}
          max={5}
          defaultValue={historyRate}
          valueLabelDisplay="on"
          disabled
          sx={{
            marginTop: 5,
            marginLeft: 10,
            width: '75%',
            display: 'flex',
            justifyContent: 'center', // Centers horizontally
          }}
        />
        <DialogContent
          sx={{
            width: '95vh',
          }}
        >
          <ChatMessageListAI conversation={historyConversation} />
        </DialogContent>
      </Dialog>
    </>
  );
}
