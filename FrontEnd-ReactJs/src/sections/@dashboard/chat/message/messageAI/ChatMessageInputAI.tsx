import { useState } from 'react';
// @mui
import { Stack, InputBase, InputBaseProps, IconButton, InputAdornment } from '@mui/material';
// utils
// @types
import { IChatAI } from '../../../../../@types/chat';
// components
import Iconify from '../../../../../components/iconify';

// ----------------------------------------------------------------------

const CURRENT_USER_ID = '8864c717-587d-472a-929a-8e5f298024da-0';

interface Props extends InputBaseProps {
  conversationId: number | null;
  onSend: (data: IChatAI) => void;
}

export default function ChatMessageInput({
  disabled,
  conversationId,
  onSend,
  sx,
  ...other
}: Props) {
  const [message, setMessage] = useState('');

  const onSendMess = () => {
    if (onSend && message) {
      onSend({
        message,
        senderName: 'me',
      });
      setMessage('');
    }
  };

  const handleSend = (event: React.KeyboardEvent<HTMLInputElement>) => {
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

  return (
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
  );
}
