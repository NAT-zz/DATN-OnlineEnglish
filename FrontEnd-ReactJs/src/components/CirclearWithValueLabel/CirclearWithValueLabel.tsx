/* eslint-disable react/destructuring-assignment */
import * as React from 'react';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const circleColor = (value: any) => {
  if (value <= 30) {
    return 'warning';
  }
  if (value <= 70) return 'primary';
  return 'success';
};

export default function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number; fontSize?: string | number }
) {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-flex',
        width: props.size || 120, // Customizable size
        height: props.size || 120,
      }}
    >
      <CircularProgress
        variant="determinate"
        {...props}
        sx={{
          width: '100%',
          height: '100%',
        }}
        color={circleColor(props.value)}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.primary"
          sx={{
            fontSize: props.fontSize || '1rem', // Default font size
          }}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}
