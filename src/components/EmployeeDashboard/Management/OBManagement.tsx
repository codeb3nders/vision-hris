import React, { createContext, useContext, useEffect, useState } from 'react';
import { Close, EventNote, KeyboardArrowDown, Publish } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { AppCtx } from 'App';
import DialogModal from 'CustomComponents/DialogModal';
import { useDispatch, useSelector } from 'react-redux';
import {authStore} from 'slices/userAccess/authSlice';

import {
  createAction as createOB, data as OBRequestsData, dataStatus as OBDataStatus
}
from 'slices/obRequests';
import { PENDING } from 'constants/Values';
import OB, { OBDetailsInitialState, OBDetailsModel } from 'components/MyProfile/OfficialBusiness';
import AddButton from 'CustomComponents/AddButton';
import OBForm from '../Forms/OBForm';
import useRequiredChecker from 'hooks/useRequiredChecker';

const approverModes = ["approver", "hr admin"];

const OBManagement = () => {
  const dispatch = useDispatch();
  const { userGroup } = useSelector(authStore)
  const { access_token } = useContext(AppCtx);
  const [open, setOpen] = useState<boolean>(false);
  const [withError, setWithError] = useState<boolean>(true);
  const [details, setDetails] = useState<OBDetailsModel>(OBDetailsInitialState)

  const data = useSelector(OBRequestsData);
  const getDataStatus = useSelector(OBDataStatus);
  const { userData } = useContext(AppCtx);

  useEffect(() => {
    if (!open) {
      setDetails({
        ...OBDetailsInitialState,
        employeeNo: userData.employeeNo
      })
    }
  }, [open])

  const handleSubmit = async () => {
    const { id, noOfDays,  ...obData } = details;
    await dispatch(
      createOB({
        body: {
          ...obData
        },
        access_token,
      })
    );
    setOpen(false);
  }

  const isApprover = approverModes.indexOf(userGroup.toLocaleLowerCase()) >= 0;
  return <div className='mt-5'>
    <div className='flex justify-start'><AddButton text='File an Official Business' cb={() => setOpen(true)} /></div>
    {open && <NewApplicationModal open={open} setOpen={setOpen} details={details} setDetails={setDetails} handleSubmit={handleSubmit} withError={withError} setWithError={setWithError} />}
    <OB employeeNo={userData.employeeNo} isApprover />
    </div>  
};

const NewApplicationModal = ({ open, setOpen, details, setDetails, handleSubmit, withError, setWithError }) => {
  const { validated } = useRequiredChecker({
    data: details,
    module: "obForm"
  });
// console.log({validated}, {withError})
  return <DialogModal
      className='laptop:w-[500px] desktop:w-[500px] '
      titleIcon={<EventNote className='mr-2 text-sky-500' />}
      title={`Official Business Form`}
      onClose={()=>setOpen(false)}
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
                disabled={!validated || withError}
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
      <OBForm details={details} setDetails={setDetails} setWithError={setWithError} />
    </DialogModal>
}

export default OBManagement;
