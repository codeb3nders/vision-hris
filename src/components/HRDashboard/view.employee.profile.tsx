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
      className='mx-auto [&>.MuiDialog-container>.MuiPaper-root]:!max-w-[1000px] [&>.MuiDialog-container>.MuiPaper-root]:max-h-[800px] [&>.MuiDialog-container>.MuiPaper-root]:w-full overflow-y-auto'
    >
      <ProfileMain isView userDetails={viewDetails.details} />
    </Dialog>
  );
};

export default ViewEmployeeProfile;
