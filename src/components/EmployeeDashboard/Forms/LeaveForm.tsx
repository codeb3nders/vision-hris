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
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LeaveDetailsModel } from 'components/EmployeeDashboard/Management/LeaveManagement';
import { ALLOWED_POST_FILING } from 'constants/Values';
import { DateTimeValidationError } from '@mui/x-date-pickers/internals/hooks/validation/useDateTimeValidation';
import { INVALID_NO_OF_DAYS, POST_FILING_MESSAGE } from 'constants/errors';

type Props = {
  setNewForm?: any;
  setOpenSnack?: any;
  leaveType: string;
  leaveDetails: LeaveDetailsModel;
  setLeaveDetails: any;
  setWithError: any;
};

const LeaveForm: React.FC<Props> = ({
  setNewForm,
  setOpenSnack,
  leaveType,
  leaveDetails,
  setLeaveDetails,
  setWithError
}) => {
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const [approvers, setApprovers] = useState<any[]>([])
  const [invalidNoOfDays, setInvalidNoOfDays] = useState<boolean>(false)
  const [isPostFiling, setIsPostFiling] = useState<boolean>(false);
  const { access_token, userData } = useContext(AppCtx);
  const TLDataStatus = useSelector(dataStatus);
  const TLData = useSelector(data);

  useEffect(() => {
    if (TLDataStatus !== 'idle') {
      setApprovers(TLData.filter((x=>x.employeeDetails.department.toLocaleLowerCase() === userData.department.code.toLocaleLowerCase())))
    }
  }, [TLDataStatus])
  

  useEffect(() => {
    console.log({ params, location: location?.search?.split('=')[1] });
  }, [params, location]);

  useEffect(() => { 
    if (access_token) {
      getTeamLeaders();
    }
  }, [access_token])

  useEffect(() => {
    let lastDay: any = null, returnToWork: any = null;
    const noOfDays:number | null = leaveDetails.noOfDays, dateFrom = leaveDetails.dateFrom;
    if (noOfDays && noOfDays > 0 && dateFrom) {
      lastDay = moment(dateFrom).businessAdd(9, 'hours');
      returnToWork = moment(lastDay).businessAdd(1, 'day');
      if (noOfDays > 1) {
        lastDay = moment(dateFrom).businessAdd(noOfDays - 1, 'day')
        if (noOfDays % 1 != 0) {
          lastDay = moment(dateFrom).businessAdd(noOfDays - 1, 'day').businessAdd(4, 'hours')
        }
      } else if (noOfDays < 1) {
        lastDay = moment(dateFrom).businessAdd(4, 'hours')
        returnToWork = moment(dateFrom);
      }
    }
    setLeaveDetails({
      ...leaveDetails,
      dateTo: lastDay,
      dateOfReturnToWork: returnToWork
    })
  }, [leaveDetails.noOfDays, leaveDetails.dateFrom])

  useEffect(() => {
    console.log({ loading });
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

  return <GridWrapper colSize='2' className='grid grid-cols-8 gap-4'>
    {leaveType === "CL" && /* TODO: table of approved OT with checkbox */
      <div className='col-span-8'>
        <TextField
          label='Approved OT Hours to Offset (CL)'
          variant='standard'
          className='w-[50%]'
          disabled={loading}
        />
      </div>
    }
    <div className='col-span-6'>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DateTimePicker
          label="Date of Leave (First Day)"
          value={leaveDetails.dateFrom}
          minDateTime={ALLOWED_POST_FILING.indexOf(leaveDetails.leaveType) < 0 ? moment() : null}
          onError={(message: DateTimeValidationError) => {
            console.log({message})
            if (message) {
              setIsPostFiling(true)
              setWithError(true)
            } else {
              setIsPostFiling(false)
              setWithError(false)
            }
          }}
          onChange={(newValue) => {
            setLeaveDetails({
              ...leaveDetails,
              dateFrom: newValue
            })
            setWithError(false)
          }}
          renderInput={(params) => <TextField {...params} variant="standard" required error={isPostFiling}
              helperText={isPostFiling && POST_FILING_MESSAGE} size="small" className='w-full' />}
        />
      </LocalizationProvider>
    </div>
    <div className='col-span-2'>
      <TextField
        size='small'
        value={leaveDetails.noOfDays}
        required
        label='No. of Days'
        disabled={!(leaveDetails.dateFrom)}
        variant='standard'
        InputProps={{ inputProps: { min: 1 } }}
        type={"number"}
        error={invalidNoOfDays}
        helperText={invalidNoOfDays && INVALID_NO_OF_DAYS}
        onChange={(e) => {
          setLeaveDetails({
            ...leaveDetails,
            noOfDays: e.target.value,
          })
          setWithError(false);
          setInvalidNoOfDays(false);
          const pattern = new RegExp(/^[0-9]\d*(\.5)?$/)
          if (e.target.value && parseInt(e.target.value) > 0 && !pattern.test(e.target.value)) {
            setWithError(true);
            setInvalidNoOfDays(true);
          }
        }}
      />
    </div>
    <div className='col-span-4'>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DateTimePicker
          label="Date of Leave (Last Day)"
          disabled={!(leaveDetails.dateFrom && leaveDetails.noOfDays)}
          value={leaveDetails.dateTo}
          minDateTime={leaveDetails.dateFrom}
          onChange={(newValue) => {
            setLeaveDetails({
              ...leaveDetails,
              dateTo: newValue
            })
          }}
          renderInput={(params) => <TextField {...params} variant="standard" required size="small" className='w-full' />}
        />
      </LocalizationProvider>
    </div>
    <div className='col-span-4'>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Date of Return to Work"
          value={leaveDetails.dateOfReturnToWork}
          disabled
          onChange={(newValue) => {
            setLeaveDetails({
              ...leaveDetails,
              dateOfReturnToWork: newValue
            })
          }}
          renderInput={(params) => <TextField {...params} variant="standard" size="small" className='w-full' />}
        />
      </LocalizationProvider>
    </div>
    <div className='col-span-8'>
      <TextField
        fullWidth
        value={leaveDetails.reasonOfLeave}
        multiline
        onChange={(e:any) => {
          setLeaveDetails({
                ...leaveDetails,
                reasonOfLeave: e.target.value
              })
        }}
        maxRows={3}
            label='Please State the Reason for the Filed Leave '
            required
            disabled={loading}
            variant='standard'
            className='text-sm'
          />
    </div>
    <div className='col-span-8'>
      <FormControl variant='standard' size='small' fullWidth required>
          <InputLabel id='approver'>Approver</InputLabel>
          <Select
            label='Approver'
          labelId='approver'
          value={leaveDetails.approver}
            onChange={(e: any) => {
              setLeaveDetails({
                ...leaveDetails,
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

export default LeaveForm;
