import { Dialog } from '@mui/material';
import ProfileMain from 'components/MyProfile/profile.main';
import React from 'react';

type Props = {
  viewDetails: {
    employeeNo: string;
    status: boolean;
  };
  setViewDetails: React.Dispatch<
    React.SetStateAction<{
      employeeNo: string;
      status: boolean;
    }>
  >;
};

const ViewEmployeeProfile = ({ setViewDetails, viewDetails }: Props) => {
  return (
    <Dialog
      open={viewDetails.status}
      onClose={() => setViewDetails({ employeeNo: "", status: false })}
      className='mx-auto [&>.MuiDialog-container>.MuiPaper-root]:!max-w-[1200px] [&>.MuiDialog-container>.MuiPaper-root]:w-full'
    >
      <div className='relative'>
        <ProfileMain setViewDetails={setViewDetails} isView employeeNo={viewDetails.employeeNo} />
      </div>
    </Dialog>
  );
};

export default ViewEmployeeProfile;
