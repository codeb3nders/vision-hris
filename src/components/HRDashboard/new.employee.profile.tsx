import React, { useContext } from 'react';
import { Dialog, IconButton } from '@mui/material';
import ProfileMain, { ProfileCtx } from '../MyProfile/profile.main';
import DialogModal from 'CustomComponents/DialogModal';
import { Close } from '@mui/icons-material';
import ProfileDetails from 'components/MyProfile/profile.details';
import { EmployeeDBI } from 'slices/interfaces/employeeI';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setViewDetails: React.Dispatch<
    React.SetStateAction<{
      employeeDetails: EmployeeDBI;
      status: boolean;
    }>
  >;
  viewDetails: {
    employeeDetails: EmployeeDBI;
    status: boolean;
  }
};

const NewEmployeeProfile = ({ open, setOpen, setViewDetails, viewDetails }: Props) => {
  return (
    <DialogModal
        className="w-screen"
        title={
          <div className='flex items-start content-left'>
            <ProfileDetails employeeDetails={viewDetails.employeeDetails} />
            <IconButton
              sx={{ ml: 'auto' }}
              onClick={() => setOpen(false)}
            >
              <Close />
            </IconButton>
          </div>
        }
        open={open}
      >
      <ProfileMain setOpen={setOpen} setViewDetails={setViewDetails} viewDetails={viewDetails} />
    </DialogModal>
  );
};

export default NewEmployeeProfile;
