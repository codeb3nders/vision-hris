/* eslint-disable react-hooks/exhaustive-deps */
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useParams, useLocation } from 'react-router-dom';
import { AppCtx, moment } from 'App';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDataAction, dataStatus, data } from 'slices/teamLeader';
import GridWrapper from 'CustomComponents/GridWrapper';
import { TimePicker, DatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DateValidationError } from '@mui/x-date-pickers/internals';
import { POST_FILING_MESSAGE } from 'constants/errors';
import { TimeValidationError } from '@mui/x-date-pickers/internals/hooks/validation/useTimeValidation';
import { OTDetailsModel } from '../Management/OTManangement';


type Props = {
  setNewForm?: any;
  setOpenSnack?: any;
  details: OTDetailsModel;
  setDetails: any;
  setWithError: any;
};

const OTForm: React.FC<Props> = ({
  setNewForm,
  setOpenSnack,
  details,
  setDetails,
  setWithError
}) => {
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [isPostOT, setIsPostOT] = useState<boolean>(false);
  const [approvers, setApprovers] = useState<any[]>([])
  const { access_token } = useContext(AppCtx);
  const TLDataStatus = useSelector(dataStatus);
  const TLData = useSelector(data);

  useEffect(() => { 
    // console.log(moment(details.date).isSame(moment().startOf("day")), "isSame", moment(details.date), moment())
    if (details.date && details.timeFrom && details.timeTo && details.approver) {
      setWithError(false);
    } else {
      setWithError(true);
    }
  }, [details])

  useEffect(() => {
    if (TLDataStatus !== 'idle') {
      setApprovers(TLData)
    }
  }, [TLDataStatus])
  
  useEffect(() => { 
    if (access_token) {
      getTeamLeaders();
    }
  }, [access_token])

  useEffect(() => {
    // console.log({ loading });
    loading &&
      setTimeout(() => {
        setLoading(false);
        setOpenSnack(true);
        setNewForm(false);
      }, 2000);
  }, [loading]);

  const getTeamLeaders = async() => {
    await dispatch(getAllDataAction({ access_token }));
  }

  const handleChange = () => { };

  return <GridWrapper colSize='7' className='grid gap-2'>
    <div className='col-span-3'>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          label="Date"
          minDate={new Date()}
          onError={(message: DateValidationError) => {
            // console.log({message})
            if (message) {
              setIsPostOT(true)
              setWithError(true)
            } else {
              setIsPostOT(false)
              setWithError(false)
            }
          }}
          value={details.date}
          onChange={(newValue) => {
            setDetails({
              ...details,
              date: newValue
            })
            setWithError(false)
          }}
          renderInput={(params) => <TextField {...params} required error={isPostOT}
              helperText={isPostOT && POST_FILING_MESSAGE} variant="standard" size="small" className='w-full' />}
        />
      </LocalizationProvider>
    </div>
    <div className='col-span-2'>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <TimePicker
          minTime={moment(details.date).isSame(moment().startOf("day")) ? moment().set({"hour": moment().format("HH"), "minute" : moment().format("mm")}) : null}
          label="Time From"
          disabled={!details.date}
          onError={(message: TimeValidationError) => {
            // console.log({message}, "timeval")
            if (message) {
              setIsPostOT(true)
              setWithError(true)
            } else {
              setIsPostOT(false)
              setWithError(false)
            }
          }}
          value={details.timeFrom}
          inputFormat="hh:mm A"
          onChange={(newValue) => {
            setDetails({
              ...details,
              timeFrom: newValue
            })
          }}
          renderInput={(params) => <TextField {...params} required error={isPostOT}
              helperText={isPostOT && POST_FILING_MESSAGE} variant="standard" size="small" className='w-full' />}
        />
      </LocalizationProvider>
    </div>
    <div className='col-span-2'>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <TimePicker
          label="Time To"
          minTime={moment(details.date).isSame(moment().startOf("day")) ? moment().set({"hour": moment(details.timeFrom).add(2, "hours").format("HH")}) : null}
          disabled={!details.timeFrom}
          value={details.timeTo}
          inputFormat="hh:mm A"
          onChange={(newValue) => {
            setDetails({
              ...details,
              timeTo: newValue
            })
          }}
          renderInput={(params) => <TextField {...params} required variant="standard" size="small" className='w-full' />}
        />
      </LocalizationProvider>
    </div>

    <div className='col-span-7'>
      <FormControlLabel control={<Checkbox onChange={(e: any) => setDetails({ ...details, earlyOT: e.target.checked ? 'Y' : 'N' })} />} label="Early OT" />
      <FormHelperText>Check if your OT will start BEFORE your regular shift. Example: 5am - 6:30am etc.</FormHelperText>
    </div>

    <div className='col-span-7'>
      <FormControlLabel control={<Checkbox onChange={(e: any) => setDetails({ ...details, lessBreak: e.target.checked ? 'Y' : 'N' })} />} label="Less Break" />
    </div>

    <div className='col-span-7'>
      <FormControlLabel control={<Checkbox onChange={(e: any) => setDetails({ ...details, plus1day: e.target.checked ? 'Y' : 'N' })} />} label="Actual Date is plus 1 day" />
    </div>

    <div className='col-span-7'>
      <TextField
        fullWidth
        value={details.reason}
        multiline
        onChange={(e:any) => {
          setDetails({
            ...details,
            reason: e.target.value
          })
        }}
        maxRows={3}
        label="Reason"
        required
        disabled={loading}
        variant='standard'
        className='text-sm'
      />
    </div>
    <div className='col-span-7'>
      <FormControl variant='standard' size='small' fullWidth required>
          <InputLabel id='approver'>Approver</InputLabel>
          <Select
            label='Approver'
          labelId='approver'
          value={details.approver}
            onChange={(e: any) => {
              setDetails({
                ...details,
                approver: e.target.value
              })
            }}
          >
            {approvers.map((tl) => {
              return (
                <MenuItem key={tl.employeeNo} value={tl.employeeNo}>
                  {tl.employeeDetails.firstName} {tl.employeeDetails.lastName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
    </div>
  </GridWrapper>
};

export default OTForm;
