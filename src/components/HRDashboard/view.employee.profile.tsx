import { Close } from '@mui/icons-material';
import { Dialog, IconButton } from '@mui/material';
import { initialState } from 'components/MyProfile/employee.initialstate';
import ProfileDetails from 'components/MyProfile/profile.details';
import ProfileMain from 'components/MyProfile/profile.main';
import DialogModal from 'CustomComponents/DialogModal';
import React from 'react';
import { EmployeeDBI } from 'slices/interfaces/employeeI';

type Props = {
  viewDetails: {
    employeeDetails: EmployeeDBI;
    status: boolean;
  };
  setViewDetails: React.Dispatch<
    React.SetStateAction<{
      employeeDetails: EmployeeDBI;
      status: boolean;
    }>
  >;
};

const ViewEmployeeProfile = ({ setViewDetails, viewDetails }: Props) => {
  return (
    <DialogModal
      className="w-screen"
        onClose={()=>setViewDetails({ employeeDetails: initialState, status: false })}
        title={<ProfileDetails employeeDetails={viewDetails.employeeDetails} />}
        open={viewDetails.status}
      >
    <ProfileMain setViewDetails={setViewDetails} viewDetails={viewDetails} isView isModal employeeNo={viewDetails.employeeDetails.employeeNo} />
    </DialogModal>
  )
};

export default ViewEmployeeProfile;
