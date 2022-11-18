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
        title={
          <div className='flex items-start content-left'>
            <ProfileDetails employeeDetails={viewDetails.employeeDetails} />
            <IconButton
              sx={{ ml: 'auto' }}
              onClick={() => setViewDetails({ employeeDetails: initialState, status: false })}
            >
              <Close />
            </IconButton>
          </div>
        }
        open={viewDetails.status}
        actions={
          <button
            // disabled={!validated}
            // className='px-4 py-2 bg-green-500 text-white w-full absolute bottom-0 left-0 z-10 disabled:bg-gray-300 disabled:cursor-not-allowed'
            onClick={() => setViewDetails({  employeeDetails: initialState, status: false })}
          >
            CANCEL
          </button>
        }
      >
    <ProfileMain setViewDetails={setViewDetails} viewDetails={viewDetails} isView isModal employeeNo={viewDetails.employeeDetails.employeeNo} />
    </DialogModal>
  )
};

export default ViewEmployeeProfile;
