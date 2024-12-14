import { Dialog, DialogContent, DialogTitle, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React, { createRef, forwardRef, useImperativeHandle, useState } from 'react';
import Iconify from 'src/components/iconify';

type IRefLessionView = {
  onOpen: (data: string) => void;
  onClose: () => void;
};

export const magicLessionRef = createRef<IRefLessionView>();

const Transition = forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>
  ) => <Slide direction="up" ref={ref} {...props} />
);

const LessionView = () => {
  const [open, setOpen] = useState(false);
  const [dataLession, setDataLession] = useState('');
  useImperativeHandle(magicLessionRef, () => ({
    onOpen: handleClickOpen,
    onClose: handleClose,
  }));
  const handleClickOpen = (data: string) => {
    setDataLession(data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      scroll="paper"
      id="order-detail"
      fullWidth
      keepMounted={false}
      maxWidth="lg"
      PaperProps={{
        sx: {
          maxWidth: 1920,
        },
      }}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      {' '}
      <DialogTitle
        sx={{
          backgroundColor: (theme) => theme.palette.primary.main,
          color: 'white',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          display: 'flex',
        }}
      >
        <span>Lession Preview</span>
        <Iconify icon="eva:close-fill" width={24} onClick={handleClose} />
      </DialogTitle>
      <DialogContent dividers>
        <div dangerouslySetInnerHTML={{ __html: dataLession }} />
      </DialogContent>
    </Dialog>
  );
};
export default LessionView;
