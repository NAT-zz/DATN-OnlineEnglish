import { ReactQuillProps } from 'react-quill';
// @mui
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/material';

// ----------------------------------------------------------------------

export interface EditorProps extends ReactQuillProps {
  id?: string;
  error?: boolean;
  simple?: boolean;
  helperText?: React.ReactNode;
  sx?: SxProps<Theme>;
  imageHandler?: (file: File) => Promise<string>;
  videoHandler?: (file: File) => Promise<string>;
  audioHandler?: (file: File) => Promise<string>;
  fileHandler?: (file: File) => Promise<string>;
}
