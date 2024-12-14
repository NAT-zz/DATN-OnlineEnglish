import { formatDistanceToNowStrict } from 'date-fns';
// @mui
import { Avatar, Typography, Stack } from '@mui/material';
// @types
// import { IChatConversation } from '../../../../@types/chat';

// ----------------------------------------------------------------------

type Props = {
  message: string;
  senderName: string;
};

export default function ChatMessageItem({ message, senderName }: Props) {
  const currentUser = senderName === 'Me';

  return (
    <Stack direction="row" justifyContent={currentUser ? 'flex-end' : 'flex-start'} sx={{ mb: 3 }}>
      {!currentUser && (
        <Avatar alt={senderName} src={senderName} sx={{ width: 32, height: 32, mr: 2 }} />
      )}

      <Stack spacing={1} alignItems={currentUser ? 'flex-end' : 'flex-start'}>
        <Typography
          noWrap
          variant="caption"
          sx={{
            color: 'text.disabled',
            ...(!currentUser && {
              mr: 'auto',
            }),
          }}
        >
          {`${senderName === '' ? 'E-Bot' : senderName}`} &nbsp;
        </Typography>

        <Stack
          sx={{
            p: 1.5,
            minWidth: 48,
            maxWidth: 320,
            borderRadius: 1,
            overflow: 'hidden',
            typography: 'body2',
            bgcolor: 'background.neutral',
            ...(currentUser && {
              color: 'grey.800',
              bgcolor: 'primary.lighter',
            }),
          }}
        >
          {message.split('\n').map((line, ind) => (
            <span key={ind}>
              {line}
              <br />
            </span>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}
