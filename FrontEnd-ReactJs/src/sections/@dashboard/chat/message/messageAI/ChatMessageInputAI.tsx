/* eslint-disable react/jsx-no-bind */
import { Dispatch, forwardRef, SetStateAction, useState } from 'react';
// @mui
import {
  Stack,
  InputBase,
  InputBaseProps,
  IconButton,
  InputAdornment,
  Slider,
  Box,
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
import { sendMessageAI } from 'src/api/useQuestion';
import { useSnackbar } from 'notistack';
import Iconify from '../../../../../components/iconify';
import { IChatAI } from '../../../../../@types/chat';

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

  const handleRate = async (rate: string) => {
    try {
      await sendMessageAI({ content: '', rate });

      setMessageStart(false);
      setIsStop(false);
      setCurrentConversations([]);

      enqueueSnackbar('We appreciate your support!');
    } catch (error) {
      console.error(error);
    }
  };

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
              defaultValue={0}
              getAriaValueText={valuetext}
              aria-labelledby="Temperature"
              valueLabelDisplay="on"
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
          <Button onClick={() => handleRate(valuetext as unknown as string)}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
