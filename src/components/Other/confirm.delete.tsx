import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React from 'react';
import { SpecialTrainingI } from './../MyProfile/LearningAndDevelopment/special.trainings.attended';

type Props = {
  open: { row: SpecialTrainingI; status: boolean };
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
        Are you sure you want to delete{' '}
        <strong>{open?.row?.courseTitle}</strong>?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          <section className='grid grid-cols-2'>
            <div className='col-span-1'>Institution:</div>
            <div className='col-span-1'>
              <strong>{open.row?.institution}</strong>
            </div>
            <div className='col-span-1'>Address/Venue:</div>
            <div className='col-span-1'>
              <strong>{open.row?.venue}</strong>
            </div>
            <div className='col-span-1'>Status:</div>
            <div className='col-span-1'>
              <strong>{open.row?.status}</strong>
            </div>
          </section>
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
