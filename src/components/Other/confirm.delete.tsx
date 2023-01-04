import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React from 'react';

type Props = {
  open: { row: any; status: boolean };
  setOpen: React.Dispatch<React.SetStateAction<{ row: any; status: boolean }>>;
  handleDelete: any;
  isCancel?: boolean;
};

const ConfirmDelete = ({ handleDelete, open, setOpen, isCancel }: Props) => {

  return (
    <Dialog
      open={open.status}
      onClose={() => setOpen({ row: null, status: false })}
      id='confirm-delete-dialog'
    >
      <DialogTitle id='alert-dialog-title' className='text-[1rem]'>
        Confirmation
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {`Are you sure you want to ${isCancel ? 'cancel' : 'delete'}?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen({ row: null, status: false })}>
          NO
        </Button>
        <Button onClick={() => handleDelete(open?.row)} autoFocus>
          YES
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDelete;
