/* eslint-disable react-hooks/exhaustive-deps */
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useParams, useLocation } from 'react-router-dom';
import { AppCtx, moment } from 'App';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDataAction, dataStatus, data } from 'slices/teamLeader';
import GridWrapper from 'CustomComponents/GridWrapper';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import ItineraryForm from './ItineraryForm';
import { OBDetailsModel } from 'components/MyProfile/OfficialBusiness';
import { DateValidationError } from '@mui/x-date-pickers/internals';
import { POST_FILING_MESSAGE } from 'constants/errors';


type Props = {
  setNewForm?: any;
  setOpenSnack?: any;
  details: OBDetailsModel;
  setDetails: any;
  setWithError: any;
};

const OBForm: React.FC<Props> = ({
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
  const [approvers, setApprovers] = useState<any[]>([])
  const [isPostOB, setIsPostOB] = useState<boolean>(false);
  const { access_token } = useContext(AppCtx);
  const TLDataStatus = useSelector(dataStatus);
  const TLData = useSelector(data);

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
    let lastDay: any = null, returnToWork: any = null;
    const noOfDays = details.noOfDays, dateFrom = details.dateFrom;
    if (noOfDays && dateFrom) {
      lastDay = noOfDays > 1 ? moment(dateFrom).businessAdd(noOfDays-1, 'day') : moment(dateFrom);
      returnToWork = moment(lastDay).businessAdd(1, 'day');
    }
    setDetails({
      ...details,
      dateTo: lastDay,
    })
  }, [details.noOfDays, details.dateFrom])

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

  return <GridWrapper colSize='2' className='grid grid-cols-8 gap-4'>
    <div className='col-span-3'>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          label="Start Date"
          minDate={new Date()}
          onError={(message: DateValidationError) => {
            // console.log({message})
            if (message) {
              setIsPostOB(true)
              setWithError(true)
            } else {
              setIsPostOB(false)
              setWithError(false)
            }
          }}
          value={details.dateFrom}
          onChange={(newValue) => {
            setDetails({
              ...details,
              dateFrom: newValue
            })
            setWithError(false)
          }}
          renderInput={(params) => <TextField {...params} required error={isPostOB}
              helperText={isPostOB && POST_FILING_MESSAGE} variant="standard" size="small" className='w-full' />}
        />
      </LocalizationProvider>
    </div>
    <div className='col-span-2'>
      <TextField
        size='small'
        value={details.noOfDays}
        label='No. of Days'
        disabled={!(details.dateFrom)}
        variant='standard'
        InputProps={{ inputProps: { min: 1 } }}
        type={"number"}
        onChange={(e) => {
          setDetails({
            ...details,
            noOfDays: e.target.value,
          })
        }}
      />
    </div>
    <div className='col-span-3'>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          label="End Date"
          disabled={!(details.dateFrom && details.noOfDays)}
          value={details.dateTo}
          onChange={(newValue) => {
            setDetails({
              ...details,
              dateTo: newValue
            })
          }}
          renderInput={(params) => <TextField {...params} variant="standard" size="small" className='w-full' />}
        />
      </LocalizationProvider>
    </div>

    <div className='col-span-8'>
      <FormControlLabel control={<Checkbox onChange={(e:any) => setDetails({...details, isWorkFromHome: e.target.checked})} />} label="Work From Home" />
    </div>

    <div className='col-span-8'>
      <TextField
        fullWidth
        value={details.purpose}
        multiline
        onChange={(e:any) => {
          setDetails({
            ...details,
            purpose: e.target.value
          })
        }}
        maxRows={3}
        label={details.isWorkFromHome ? 'Reason' : 'Purpose'}
        required
        disabled={loading}
        variant='standard'
        className='text-sm'
      />
    </div>
    {!details.isWorkFromHome &&
      <div className='col-span-8'>
        <ItineraryForm data={details} setDetails={setDetails} />
      </div>
    }
    <div className='col-span-8'>
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

export default OBForm;
