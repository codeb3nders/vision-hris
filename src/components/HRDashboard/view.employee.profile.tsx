import { Dialog } from '@mui/material';
import ProfileMain from 'components/MyProfile/profile.main';
import React from 'react';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ViewEmployeeProfile = ({ open, setOpen }: Props) => {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className='mx-auto [&>.MuiDialog-container>.MuiPaper-root]:!max-w-[900px] [&>.MuiDialog-container>.MuiPaper-root]:max-h-[800px] [&>.MuiDialog-container>.MuiPaper-root]:w-full overflow-y-auto'
    >
      <ProfileMain isNew />
    </Dialog>
  );
};

export default ViewEmployeeProfile;
