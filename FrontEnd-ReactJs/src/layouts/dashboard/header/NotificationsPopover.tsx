import { noCase } from 'change-case';
import { ReactNode, useCallback, useEffect, useState } from 'react';
// @mui
import {
  Box,
  Stack,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  IconButton,
  Typography,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
} from '@mui/material';
// utils
import { getNotis } from 'src/api/useQuestion';
import _mock from 'src/_mock';
import socketApp from 'socket.io-client';
import { useAuthContext } from 'src/api/useAuthContext';
import { fToNow } from '../../../utils/formatTime';
// _mock_
import { _notifications } from '../../../_mock/arrays';

// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import MenuPopover from '../../../components/menu-popover';
import { IconButtonAnimate } from '../../../components/animate';

// ----------------------------------------------------------------------
type IPropsNoti = NotificationItemProps[];

export default function NotificationsPopover() {
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const [notifications, setNotifications] = useState<IPropsNoti>([]);
  const [totalUnRead, settotalUnRead] = useState<number>(0);
  const { user } = useAuthContext();

  useEffect(() => {
    getNotis().then((value) => {
      setNotifications(
        value.data.map((noti: any) => ({
          ...noti,
          isRead: false,
        }))
      );
    });
  }, []);
  useEffect(() => {
    settotalUnRead(notifications.filter((item) => item.isRead === false).length);
  }, [notifications]);

  const initSocket = useCallback(
    (url: string) => {
      const socketClient = socketApp(url, {
        query: {
          userId: user?.id,
        },
      });

      socketClient.on('newNoti', (newNoti) => {
        setNotifications((prev) =>
          prev.concat([
            {
              ...newNoti,
              isRead: false,
            },
          ])
        );
      });
    },
    [user?.id]
  );

  useEffect(() => {
    initSocket('http://localhost:5001');
  }, [initSocket]);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        isRead: true,
      }))
    );
  };

  return (
    <>
      <IconButtonAnimate
        color={openPopover ? 'primary' : 'default'}
        onClick={handleOpenPopover}
        sx={{ width: 40, height: 40 }}
      >
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify icon="eva:bell-fill" />
        </Badge>
      </IconButtonAnimate>

      <MenuPopover open={openPopover} onClose={handleClosePopover} sx={{ width: 360, p: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {totalUnRead} unread messages
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Iconify icon="eva:done-all-fill" />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar
          sx={{
            height: {
              maxHeight: 400, // Set a maximum height for the scrollable area
              overflowY: 'auto',
            },
          }}
        >
          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                New
              </ListSubheader>
            }
          >
            {notifications
              .slice(-2)
              .reverse()
              .map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
          </List>

          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                Before that
              </ListSubheader>
            }
          >
            {notifications
              .slice(0, -2)
              .reverse()
              .map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
          </List>
        </Scrollbar>

        <Divider sx={{ borderStyle: 'dashed' }} />
      </MenuPopover>
    </>
  );
}

// ----------------------------------------------------------------------

type NotificationItemProps = {
  id: string;
  from: string;
  content: string;
  avatar: string | null;
  createdAt: Date;
  isRead: boolean | false;
};

function NotificationItem({ notification }: { notification: NotificationItemProps }) {
  const { avatar, title } = renderContent(notification);

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(!notification.isRead && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
      </ListItemAvatar>

      <ListItemText
        disableTypography
        primary={title}
        secondary={
          <Stack direction="row" sx={{ mt: 0.5, typography: 'caption', color: 'text.disabled' }}>
            <Iconify icon="eva:clock-fill" width={16} sx={{ mr: 0.5 }} />
            <Typography variant="caption">{fToNow(notification.createdAt)}</Typography>
          </Stack>
        }
      />
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

function renderContent(notification: NotificationItemProps) {
  const title = (
    <Typography variant="subtitle2">
      {notification.from}
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {noCase(notification.content)}
      </Typography>
    </Typography>
  );

  if (notification.from === 'System') {
    return {
      avatar: <img alt={notification.from} src="/assets/icons/notification/ic_package.svg" />,
      title,
    };
  }

  return {
    avatar: <img alt={notification.from} src={_mock.image.avatar(2)} />,
    title,
  };
  // return {
  //   avatar: <img alt={notification.from} src="/assets/icons/notification/ic_shipping.svg" />,
  //   title,
  // };
  // if (notification.type === 'mail') {
  //   return {
  //     avatar: <img alt={notification.title} src="/assets/icons/notification/ic_mail.svg" />,
  //     title,
  //   };
  // }
  // if (notification.type === 'chat_message') {
  //   return {
  //     avatar: <img alt={notification.title} src="/assets/icons/notification/ic_chat.svg" />,
  //     title,
  //   };
  // }
  // return {
  //   avatar: notification.avatar ? <img alt={notification.title} src={notification.avatar} /> : null,
  //   title,
  // };
}
