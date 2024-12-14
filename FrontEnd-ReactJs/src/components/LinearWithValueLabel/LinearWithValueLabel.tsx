/* eslint-disable react/destructuring-assignment */
import * as React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const circleColor = (value: any) => {
  if (value <= 30) {
    return 'warning';
  }
  if (value <= 70) return 'primary';
  return 'success';
};

export default function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number; fontSize?: string | number }
) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} color={circleColor(props.value)} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          variant="body2"
          color="text.primary"
          sx={{
            fontSize: props.fontSize || '1rem', // Default font size
          }}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}
