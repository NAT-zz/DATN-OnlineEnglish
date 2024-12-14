import { useCallback, useEffect, useState } from 'react';
// @mui
import { Avatar, Button, Card, Container, Stack, Typography } from '@mui/material';
import {
  getConversationsChat,
  getMyClass,
  getStudentWithClass,
  sendMessage,
} from 'src/api/useQuestion';
import { isArray } from 'lodash';
import { useAuthContext } from 'src/api/useAuthContext';
// eslint-disable-next-line import/no-extraneous-dependencies
import socketApp from 'socket.io-client';
import { CloseIcon, NextIcon } from 'yet-another-react-lightbox/core';

import _mock from 'src/_mock';
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { useSettingsContext } from '../../../components/settings';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// @types
import { IChatParticipant, IChatSendMessage } from '../../../@types/chat';
// sections
import ChatMessageInput from './message/ChatMessageInput';
import ChatMessageList from './message/ChatMessageList';
import ChatHeaderCompose from './header/ChatHeaderCompose';

// ----------------------------------------------------------------------
type IStudent = {
  userName: string;
  id: number;
};

export default function Chat() {
  const { themeStretch } = useSettingsContext();

  const { user } = useAuthContext();
  const [listStudent, setListStudent] = useState<IStudent[]>([]);

  const [currentStudent, setCurrentStudent] = useState({} as IStudent);

  const [currentConversations, setCurrentConversations] = useState([]);

  const [myClass, setMyClass] = useState<[]>([]);

  const initSocket = useCallback(
    (url: string) => {
      const socketClient = socketApp(url, {
        query: {
          userId: user?.id,
        },
      });
      socketClient.on('newMessage', (msg) => {
        console.log(msg);

        if (msg !== '') {
          const newMess = [
            {
              createdAt: msg.createdAt,
              message: msg.message,
              senderId: msg.id,
            },
          ];
          // @ts-ignore
          setCurrentConversations((prev) => prev.concat(newMess));
        }
      });
      socketClient.on('connect_error', (error) => {
        console.log('CONNECT_ERROR', error);
      });
      socketClient.on('reconnect_attempt', (attempt) => {
        console.log('RECONNECT_ATTEMPT', attempt);
      });
      socketClient.on('reconnect_failed', () => {
        console.log('RECONNECT_FAILED');
      });
      socketClient.on('reconnect_error', (error) => {
        console.log('RECONNECT_ERROR', error);
      });
      socketClient.on('connection', () => {
        console.log('connection', socketClient.id);
      });
      socketClient.on('connect', () => {
        console.log('connect', socketClient.id);
      });
      socketClient.on('error', (error) => {
        // check logic event error
        console.log('error', error);
      });
      socketClient.on('disconnect', (reason) => {
        console.log('disconnect', reason);
      });
    },
    [user?.id]
  );

  useEffect(() => {
    if (currentStudent) {
      initSocket('http://localhost:5001');
    }
  }, [currentStudent, initSocket]);

  useEffect(() => {
    getMyClass().then((value) => {
      setMyClass(value.data);
    });
  }, [user?.role]);

  useEffect(() => {
    if (currentStudent.id) {
      getConversationsChat(currentStudent?.id).then((value) => {
        if (isArray(value.data)) {
          // @ts-ignore
          setCurrentConversations(value.data);
        }
      });
    }
  }, [currentStudent]);

  const handleAddRecipients = (selectedRecipients: IChatParticipant | null) => {
    if (!selectedRecipients) {
      setListStudent([]);
      setCurrentConversations([]);
      setCurrentStudent({} as IStudent);
    } else if (user?.role === 'TEACHER') {
      getStudentWithClass(selectedRecipients.id).then((val) => {
        setListStudent(val.data);
      });
    } else if (user?.role === 'STUDENT') {
      // @ts-ignore
      const findTeacher = myClass.find((e) => e?.id === selectedRecipients.id)?.teacher;
      if (findTeacher) {
        setListStudent([findTeacher]);
      }
    }
  };

  const handleSendMessage = async (value: IChatSendMessage) => {
    try {
      await sendMessage(currentStudent.id, { message: value.message });
      const newMess = [
        {
          createdAt: value.createdAt,
          message: value.message,
          senderId: user?.id,
        },
      ];
      // @ts-ignore
      setCurrentConversations((prev) => prev.concat(newMess));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseChat = () => {
    setCurrentStudent({} as IStudent);
    setCurrentConversations([]);
  };

  const handleSelectStudent = (student: IStudent) => () => {
    setCurrentStudent(student);
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
          { name: 'Chat' },
        ]}
      />

      <Card sx={{ height: '72vh', display: 'flex' }}>
        <Stack flexGrow={1} sx={{ overflow: 'hidden' }}>
          <Stack direction="row" alignItems="center">
            <ChatHeaderCompose
              recipients={myClass}
              contacts={myClass}
              onAddRecipients={handleAddRecipients}
            />

            {listStudent.length > 0 &&
              listStudent.map((student, index) => (
                <Button
                  variant={student.id === currentStudent.id ? 'contained' : 'outlined'}
                  disabled={!!(currentStudent.id && student.id !== currentStudent.id)}
                  endIcon={
                    student.id === currentStudent.id ? (
                      <CloseIcon onClick={handleCloseChat} />
                    ) : (
                      <NextIcon onClick={handleSelectStudent(student)} />
                    )
                  }
                >
                  <Stack direction="row" alignItems="center" justifyContent="center">
                    <Avatar
                      src={_mock.image.avatar(index)}
                      sx={{
                        width: 32,
                        height: 32,
                      }}
                    />
                    <Typography sx={{ ml: 1 }}>{student?.userName}</Typography>
                  </Stack>
                </Button>
              ))}
          </Stack>
          <Stack
            direction="row"
            flexGrow={1}
            sx={{
              overflow: 'hidden',
              borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
            }}
          >
            <Stack flexGrow={1} sx={{ minWidth: 0 }}>
              <ChatMessageList
                conversation={currentConversations}
                currentId={user?.id}
                senderName={currentStudent.userName}
              />

              <ChatMessageInput
                conversationId={currentStudent?.id}
                onSend={handleSendMessage}
                disabled={!!currentStudent?.id}
              />
            </Stack>
          </Stack>
        </Stack>
      </Card>
    </Container>
  );
}
