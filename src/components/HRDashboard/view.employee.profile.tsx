import { Dialog } from '@mui/material';
import ProfileMain from 'components/MyProfile/profile.main';
import React from 'react';

type Props = {
  viewDetails: {
    employeeNo: string;
    status: boolean;
    myTeam: any[];
  };
  setViewDetails: React.Dispatch<
    React.SetStateAction<{
      employeeNo: string;
      status: boolean;
      myTeam: any[];
    }>
  >;
};

const ViewEmployeeProfile = ({ setViewDetails, viewDetails }: Props) => {
  return (
    <Dialog
      open={viewDetails.status}
      onClose={() => setViewDetails({ employeeNo: "", status: false, myTeam: [] })}
      className='mx-auto [&>.MuiDialog-container>.MuiPaper-root]:!max-w-[1200px] [&>.MuiDialog-container>.MuiPaper-root]:w-full'
    >
      <div className='relative'>
        <ProfileMain isView employeeNo={viewDetails.employeeNo} myTeam={viewDetails.myTeam} />
      </div>
    </Dialog>
  );
};

export default ViewEmployeeProfile;
