import { formatDistanceToNowStrict } from 'date-fns';
// @mui
import { Avatar, Typography, Stack } from '@mui/material';
// @types
// import { IChatConversation } from '../../../../@types/chat';

// ----------------------------------------------------------------------

type Props = {
  message: any;
  createdAt: string;
  senderId: number;
  currentId: number;
  senderName: string;
};

export default function ChatMessageItem({
  message,
  createdAt,
  senderId,
  currentId,
  senderName,
}: Props) {
  const senderDetails =
    senderId === currentId
      ? {
          type: 'me',
        }
      : {
          name: senderName,
        };

  const currentUser = senderDetails.type === 'me';

  const firstName = senderDetails.name && senderDetails.name.split(' ')[0];

  return (
    <Stack direction="row" justifyContent={currentUser ? 'flex-end' : 'flex-start'} sx={{ mb: 3 }}>
      {!currentUser && (
        <Avatar
          alt={senderDetails.name}
          src={senderDetails.name}
          sx={{ width: 32, height: 32, mr: 2 }}
        />
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
          {!currentUser && `${firstName},`} &nbsp;
          {formatDistanceToNowStrict(new Date(createdAt), {
            addSuffix: true,
          })}
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
          {message}
        </Stack>
      </Stack>
    </Stack>
  );
}
