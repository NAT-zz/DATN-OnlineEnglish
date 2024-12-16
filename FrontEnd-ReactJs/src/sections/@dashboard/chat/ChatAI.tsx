import { useCallback, useEffect, useState } from 'react';
// @mui
import { Card, Container, Stack } from '@mui/material';
import { sendMessageAI } from 'src/api/useQuestion';
import { useAuthContext } from 'src/api/useAuthContext';
// eslint-disable-next-line import/no-extraneous-dependencies
import socketApp from 'socket.io-client';

import { HOST_API_KEY } from 'src/config-global';
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { useSettingsContext } from '../../../components/settings';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// @types
import { IChatAI, IChatSendMessage } from '../../../@types/chat';
// sections
import ChatMessageInputAI from './message/messageAI/ChatMessageInputAI';
import ChatMessageListAI from './message/messageAI/ChatMessageListAI';

// ----------------------------------------------------------------------

export default function Chat() {
  const { themeStretch } = useSettingsContext();

  const { user } = useAuthContext();

  const [currentConversations, setCurrentConversations] = useState([]);

  const initSocket = useCallback(
    (url: string) => {
      const socketClient = socketApp(url, {
        query: {
          userId: user?.id,
        },
      });

      socketClient.on('startOneMessage', (msg) => {
        const newMess = [
          {
            message: '',
            senderName: '',
          },
        ];
        // @ts-ignore
        setCurrentConversations((prev) => prev.concat(newMess));
      });

      socketClient.on('newMessage', (msg) => {
        // setCurrentConversations((prev: any) => prev[prev.length - 1].message.concat(' ', msg));
        setCurrentConversations((prev: any) =>
          prev.map((val: IChatAI) => {
            if (val.senderName === '') {
              val.message += msg;
            }
            return val;
          })
        );
      });

      socketClient.on('endOneMessage', () => {
        // @ts-ignore
        setCurrentConversations((prev) =>
          prev.map((val: IChatAI) => {
            if (val.senderName === '') {
              val.senderName = 'E-Bot';
            }
            return val;
          })
        );
      });

      socketClient.on('disconnect', (reason) => {
        console.log('disconnect', reason);
      });
    },
    [user?.id]
  );

  useEffect(() => {
    initSocket(HOST_API_KEY);
  }, [initSocket]);

  const handleSendMessage = async (value: IChatAI) => {
    try {
      const newMess = [
        {
          message: value.message,
          senderName: 'Me',
        },
      ];
      // @ts-ignore
      setCurrentConversations((prev) => prev.concat(newMess));
      await sendMessageAI({ content: value.message });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth={themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading="Chat"
        links={[
          {
            name: 'Dashboard',
            href: PATH_DASHBOARD.root,
          },
          { name: 'Chat with AI' },
        ]}
      />

      <Card sx={{ height: '72vh', display: 'flex' }}>
        <Stack flexGrow={1} sx={{ overflow: 'hidden' }}>
          <Stack
            direction="row"
            flexGrow={1}
            sx={{
              overflow: 'hidden',
              borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
            }}
          >
            <Stack flexGrow={1} sx={{ minWidth: 0 }}>
              <ChatMessageListAI conversation={currentConversations} />

              <ChatMessageInputAI conversationId={0} onSend={handleSendMessage} disabled={false} />
            </Stack>
          </Stack>
        </Stack>
      </Card>
    </Container>
  );
}
