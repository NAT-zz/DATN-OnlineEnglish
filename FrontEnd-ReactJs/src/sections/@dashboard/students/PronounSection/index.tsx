import { useState, useRef } from 'react';
import { IconButton, Button, Box } from '@mui/material';
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'notistack';

const PronunciationPractice = ({ word }: { word: string }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [isRecording, setIsRecording] = useState(false); // Track recording state
  const [audioURL, setAudioURL] = useState<string | null>(null); // Store recorded audio URL
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async (mouseEvent: React.MouseEvent) => {
    mouseEvent.stopPropagation();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        audioChunksRef.current = [];

        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);

        uploadAudio(audioBlob); // Upload the audio for analysis
      };

      mediaRecorderRef.current.start();
      setIsRecording(true); // Update state to indicate recording
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = (mouseEvent: React.MouseEvent) => {
    mouseEvent.stopPropagation();
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false); // Update state to indicate recording has stopped
    }
  };

  // Optional function to upload audio to the server
  const uploadAudio = async (audioBlob: Blob) => {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.mp3');
    try {
      const response = await fetch(`http://localhost:5001/api/ai/analyze-voice?word=${word}`, {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();

      if (response.status === 200) enqueueSnackbar(result.message);
      else if (response.status === 417) enqueueSnackbar(result.message, { variant: 'error' });
      else enqueueSnackbar('Please try again!', { variant: 'error' });
    } catch (error) {
      console.error('Error uploading audio:', error);
    }
  };

  // Function to play the pronunciation or the recorded audio
  const playAudio = (url: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent the box flip when clicking the icon
    const audio = new Audio(url);
    audio.play();
  };

  return (
    <Box sx={{ marginTop: 2 }}>
      {/* Start and Stop Recording Buttons */}
      <Box sx={{ display: 'flex' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={(event) => startRecording(event)}
          disabled={isRecording}
        >
          Start
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={(event) => stopRecording(event)}
          disabled={!isRecording}
        >
          Stop
        </Button>

        {audioURL && (
          <Box sx={{ marginTop: 1 }}>
            <IconButton onClick={(event) => playAudio(audioURL, event)}>
              <Iconify icon="formkit:caretright" />
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PronunciationPractice;
