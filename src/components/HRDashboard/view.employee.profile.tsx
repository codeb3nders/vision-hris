import { Dialog } from '@mui/material';
import ProfileMain from 'components/MyProfile/profile.main';
import React from 'react';

type Props = {
  viewDetails: {
    details: any;
    status: boolean;
  };
  setViewDetails: React.Dispatch<
    React.SetStateAction<{
      details: any;
      status: boolean;
    }>
  >;
};

const ViewEmployeeProfile = ({ setViewDetails, viewDetails }: Props) => {
  return (
    <Dialog
      open={viewDetails.status}
      onClose={() => setViewDetails({ details: null, status: false })}
      className='mx-auto [&>.MuiDialog-container>.MuiPaper-root]:!max-w-[1200px] [&>.MuiDialog-container>.MuiPaper-root]:w-full'
    >
      <div className='relative'>
        <ProfileMain isView userDetails={viewDetails.details} />
      </div>
    </Dialog>
  );
};

export default ViewEmployeeProfile;
