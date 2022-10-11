import React from 'react';
import { Dialog } from '@mui/material';
import ProfileMain from '../MyProfile/profile.main';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setViewDetails: React.Dispatch<
    React.SetStateAction<{
      employeeNo: string;
      status: boolean;
    }>
  >;
};

const NewEmployeeProfile = ({ open, setOpen, setViewDetails }: Props) => {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className='mx-auto [&>.MuiDialog-container>.MuiPaper-root]:!max-w-[1200px] [&>.MuiDialog-container>.MuiPaper-root]:max-h-[800px] [&>.MuiDialog-container>.MuiPaper-root]:w-full overflow-y-auto'
    >
      <ProfileMain isNew setOpen={setOpen} setViewDetails={setViewDetails} />
    </Dialog>
  );
};

export default NewEmployeeProfile;
