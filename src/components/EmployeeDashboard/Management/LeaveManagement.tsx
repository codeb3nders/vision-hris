import React, { createContext, useContext, useEffect, useState } from 'react';
import { Close, EventNote, KeyboardArrowDown, Publish } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Button, Chip, Divider, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { AppCtx } from 'App';
import History from 'components/MyProfile/Leaves/history';
import LeaveBalances from 'components/MyProfile/Leaves/leave.balances';
import UpcomingLeaves from 'components/MyProfile/Leaves/upcoming.leaves';
import DialogModal from 'CustomComponents/DialogModal';
import { useDispatch, useSelector } from 'react-redux';
import {authStore} from 'slices/userAccess/authSlice';
import LeaveForm from '../Forms/LeaveForm';
import LeaveTable from '../Tables/LeaveTable';

import {
  getListOfValues
} from "slices"
import moment, { Moment } from 'moment';
import {
  createAction, getAllDataAction, data as requestsData, dataStatus
}
from 'slices/leaveRequests';
import { PENDING } from 'constants/Values';
import Leaves, { LeaveDetailsInitialState, LeaveDetailsModel } from 'components/MyProfile/Leaves';

const approverModes = ["approver", "hr admin"];

export type LeavesContext = {
  isRefresh: boolean;
  leaveTypes: any[];
}

export const LeavesCtx = createContext<LeavesContext>({
  isRefresh: true,
  leaveTypes: []
});

const LeaveManagement = () => {
  const dispatch = useDispatch();
  const { userGroup } = useSelector(authStore)
  const { access_token } = useContext(AppCtx);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedLeaveType, setSelectedLeaveType] = useState<{
    code: string, name: string
  }>({
    code: "", name: ""
  });
  const [leaveDetails, setLeaveDetails] = useState<LeaveDetailsModel>(LeaveDetailsInitialState)
  // const [leaveTypes, setLeaveTypes] = useState<any[]>([]);
  const [isRefresh, setIsRefresh] = useState<boolean>(true)

  const {leaveTypes} = useSelector(getListOfValues);
  const data = useSelector(requestsData);
  const getDataStatus = useSelector(dataStatus);
  const { userData } = useContext(AppCtx);

  useEffect(() => { 
    if (selectedLeaveType.code !== "") {
      setLeaveDetails({
        ...leaveDetails,
        employeeNo: userData.employeeNo,
        leaveType: selectedLeaveType.code,
        status: PENDING
      })
      setOpen(true)
    }
  }, [selectedLeaveType])
    console.log({ leaveDetails })

  useEffect(() => {
    if (!open) {
      setSelectedLeaveType({
        code: "", name: ""
      })
      setLeaveDetails(LeaveDetailsInitialState)
    }
  }, [open])

  // useEffect(() => {
  //   setLeaveTypes(enumsData.filter((x:any) => x.type.toLocaleLowerCase() === "leavetype"))
  // }, [])
console.log({leaveTypes})
  const handleSubmit = async () => {
    const { id, ...rest} = leaveDetails;
    await dispatch(
      createAction({
        body: { 
          ...rest
        },
        access_token,
      })
    );
  }

  const isApprover = approverModes.indexOf(userGroup.toLocaleLowerCase()) >= 0;
  return isApprover ? <LeaveTable isApprover={isApprover} /> : <LeavesCtx.Provider
    value={{
      isRefresh,
      leaveTypes
    }}
  >
    <LeaveBalances />
    <SelectAndFileLeave setSelectedLeaveType={setSelectedLeaveType} />
    {open && <NewApplicationModal open={open} setOpen={setOpen} selectedLeaveType={selectedLeaveType} leaveDetails={leaveDetails} setLeaveDetails={setLeaveDetails} handleSubmit={handleSubmit} />}
    <Leaves employeeNo={userData.employeeNo} />
    </LeavesCtx.Provider>  
};

const SelectAndFileLeave = ({ setSelectedLeaveType }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { leaveTypes } = useContext(LeavesCtx);
  
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    selected:any
  ) => {
    setSelectedLeaveType(selected);
    setAnchorEl(null);
  };

  return <div>
      <Button
        // variant="contained"
        disableElevation
        // color='primary'
        onClick={handleClick}
        endIcon={<KeyboardArrowDown />}
      >
        Apply for Leave
      </Button>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          role: 'listbox',
        }}
      >
        {leaveTypes.map((option, index) => (
          <MenuItem
            key={option.code}
            onClick={(event) => handleMenuItemClick(event, option)}
          >
            {option.name}
          </MenuItem>
        ))}
    </Menu>
  </div>
}

const NewApplicationModal = ({ open, setOpen, selectedLeaveType, leaveDetails, setLeaveDetails, handleSubmit }) => {

  return <DialogModal
      className='laptop:w-[500px] desktop:w-[500px] '
      title={
        <div className='flex items-center content-left'>
            <Typography
            variant='h6'
            className='flex items-center mb-4 text-sky-500'
            color='primary'
          >
            <EventNote className='mr-2 text-sky-500' /> {selectedLeaveType.name} Form
          </Typography>
          <IconButton
            sx={{ ml: 'auto' }}
            onClick={() => setOpen(false)}
          >
            <Close />
          </IconButton>
        </div>
      }
      open={open}
      actions={
        <div className='mt-4'>
          <div className='grid grid-cols-2'>
            <LoadingButton
                className='bg-sky-500 hover:bg-sky-600 text-md ease-in-out'
                // loading={loading}
                loadingPosition='start'
                // startIcon={<Publish />}
                variant='contained'
                // disabled={!confirmed}
                onClick={()=>handleSubmit()}
                disableElevation
              >
                Submit
              </LoadingButton>
            <button
              className='col-span-1 px-2 py-1 text-slate-400 hover:text-slate-800'
              onClick={() => setOpen(false)}
            >
            Cancel
            </button>
          </div>
        </div>
      }
    >
      <LeaveForm leaveType={selectedLeaveType.code} leaveDetails={leaveDetails} setLeaveDetails={setLeaveDetails} />
    </DialogModal>
}

export default LeaveManagement;
