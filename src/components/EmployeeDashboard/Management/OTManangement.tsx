import React, { createContext, useContext, useEffect, useState } from 'react';
import { Close, EventNote, KeyboardArrowDown, Publish } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { AppCtx } from 'App';
import DialogModal from 'CustomComponents/DialogModal';
import { useDispatch, useSelector } from 'react-redux';
import {authStore} from 'slices/userAccess/authSlice';

import {
  createAction as createOT, data as OTRequestsData, dataStatus as OTDataStatus
}
  from 'slices/otRequests';
import { PENDING } from 'constants/Values';
import OT, { OTDetailsInitialState, OTDetailsModel } from 'components/MyProfile/Overtime';
import AddButton from 'CustomComponents/AddButton';
import OTForm from '../Forms/OTForm';
import { moment } from "App";
import useRequiredChecker from 'hooks/useRequiredChecker';

const approverModes = ["approver", "hr admin"];

const OTManagement = () => {
  const dispatch = useDispatch();
  const { userGroup } = useSelector(authStore)
  const { access_token } = useContext(AppCtx);
  const [open, setOpen] = useState<boolean>(false);
  const [withError, setWithError] = useState<boolean>(true);
  const [details, setDetails] = useState<OTDetailsModel>(OTDetailsInitialState)

  const data = useSelector(OTRequestsData);
  const getDataStatus = useSelector(OTDataStatus);
  const { userData } = useContext(AppCtx);

  useEffect(() => {
    if (!open) {
      setDetails({
        ...OTDetailsInitialState,
        employeeNo: userData.employeeNo,
        status: PENDING
      })
    }
  }, [open])

  const handleSubmit = async () => {
    const { id, timeFrom, timeTo, ...otData } = details;
    let timeToTmp = timeTo;
    if (details.plus1day === "Y") {
      timeToTmp = moment(timeTo).add(1, "day")
    }
    if (details.lessBreak === "Y") {
      timeToTmp = moment(timeToTmp).subtract(1, "hour")
    }
    var duration = moment.duration(moment(timeToTmp).diff(moment(timeFrom)));
    // console.log({duration}, moment(timeToTmp), moment(timeFrom))
    const totalOThrs = parseInt(duration.asHours());
    // // console.log({ totalOThrs }); return;
    await dispatch(
      createOT({
        body: {
          ...otData,
          timeFrom: moment(timeFrom).format("hh:mm A"),
          timeTo: moment(timeTo).format("hh:mm A"),
          totalOThrs
        },
        access_token,
      })
    );
    setOpen(false);
  }

  const isApprover = approverModes.indexOf(userGroup.toLocaleLowerCase()) >= 0;
  return <div className='mt-5'>
    <div className='flex justify-start'><AddButton text='File an OT' cb={() => setOpen(true)} /></div>
    {open && <NewApplicationModal open={open} setOpen={setOpen} details={details} setDetails={setDetails} handleSubmit={handleSubmit} withError={withError} setWithError={setWithError} />}
    <OT employeeNo={userData.employeeNo} isApprover />
    </div>  
};

const NewApplicationModal = ({ open, setOpen, details, setDetails, handleSubmit, withError, setWithError }) => {
  const { validated } = useRequiredChecker({
    data: details,
    module: "otForm"
  });
// console.log({validated}, {withError})
  return <DialogModal
      className='laptop:w-[500px] desktop:w-[500px] '
      titleIcon={<EventNote className='mr-2 text-sky-500' />}
      title={`Overtime Application Form`}
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
      <OTForm details={details} setDetails={setDetails} setWithError={setWithError} />
    </DialogModal>
}

export default OTManagement;
