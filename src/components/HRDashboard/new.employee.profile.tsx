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
        // actions={
        //   <button
        //     // disabled={!validated}
        //     className='px-4 py-2 bg-green-500 text-white w-full absolute bottom-0 left-0 z-10 disabled:bg-gray-300 disabled:cursor-not-allowed'
        //     onClick={saveEmployee}
        //   >
        //     Save Employee Profile
        //   </button>
        // }
      >
    {/* <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className='mx-auto [&>.MuiDialog-container>.MuiPaper-root]:!max-w-[1200px] [&>.MuiDialog-container>.MuiPaper-root]:max-h-[800px] [&>.MuiDialog-container>.MuiPaper-root]:w-full overflow-y-auto'
    > */}
      <ProfileMain setOpen={setOpen} setViewDetails={setViewDetails} viewDetails={viewDetails} />
      {/* </Dialog> */}
    </DialogModal>
  );
};

export default NewEmployeeProfile;
