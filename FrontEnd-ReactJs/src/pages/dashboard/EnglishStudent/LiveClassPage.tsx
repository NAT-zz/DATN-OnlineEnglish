import { Button, IconButton, Input, InputBase, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import Iconify from 'src/components/iconify';
import { getLiveClass } from 'src/api/useQuestion';

const LiveClassPage = () => {
  const [roomId, setRoomId] = useState<string>('');
  const { enqueueSnackbar } = useSnackbar();

  const domain = 'https://natvideocall.daily.co/';
  const tempLink = `${domain}temp`;

  const handleJoinCall = () => {
    const callContainer = document.getElementById('call-container');
    const callFrame = document.getElementById('call-frame');

    if (!roomId) {
      enqueueSnackbar('Please enter a room ID', {
        variant: 'error',
      });
      return;
    }
    if (callContainer) {
      getLiveClass(roomId)
        .then((res) => {
          callFrame?.setAttribute('src', `${domain}${roomId}`);
        })
        .catch((err: any) => {
          enqueueSnackbar('Failed to join the call. Please check your room ID and try again.', {
            variant: 'error',
          });
        });
    }
  };

  const toggleFullscreen = () => {
    const callContainer = document.getElementById('call-container');

    if (callContainer) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        callContainer.requestFullscreen();
      }
    }
  };

  return (
    <div>
      <h2>Join Call</h2>

      <InputBase
        value={roomId}
        onChange={(event) => setRoomId(event.target.value)}
        placeholder="Enter room ID"
        endAdornment={
          <Stack direction="row" spacing={1} sx={{ flexShrink: 0, mr: 1.5 }}>
            <IconButton onClick={handleJoinCall}>
              <Iconify icon="formkit:caretright" />
            </IconButton>
          </Stack>
        }
      />

      <Button
        onClick={toggleFullscreen}
        sx={{
          backgroundColor: 'primary.main',
          color: 'white',
          fontSize: '16px',
          padding: '0px 10px',
          minWidth: 'auto',
          '&:hover': {
            backgroundColor: 'primary.dark',
          },
        }}
      >
        Fullscreen
      </Button>
      <div
        id="call-container"
        style={{
          width: '100%',
          height: '500px',
          marginTop: '20px',
          border: '1px solid #ccc',
          position: 'relative',
        }}
      >
        <iframe
          id="call-frame"
          title="Daily Video Call Room: your-room-id"
          allow="microphone; camera; autoplay; display-capture; screen-wake-lock"
          src={tempLink}
          style={{ position: 'relative', width: '100%', height: '100%', border: '0' }}
        />
      </div>
    </div>
  );
};
export default LiveClassPage;
