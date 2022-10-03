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
};

const ConfirmDelete = ({ handleDelete, open, setOpen }: Props) => {
  console.log({ open });

  return (
    <Dialog
      open={open.status}
      onClose={() => setOpen({ row: null, status: false })}
      id='confirm-delete-dialog'
    >
      <DialogTitle id='alert-dialog-title' className='text-[1rem]'>
        Delete Confirmation
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Are you sure you want to delete?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen({ row: null, status: false })}>
          Cancel
        </Button>
        <Button onClick={() => handleDelete(open?.row)} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDelete;
