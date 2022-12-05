/* eslint-disable react-hooks/exhaustive-deps */
import { EventNote, Publish } from '@mui/icons-material';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Grid,
  Chip
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
// import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { useParams, useLocation } from 'react-router-dom';
import dayjs, { Dayjs } from 'dayjs';
import { AppCtx, moment } from 'App';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDataAction, dataStatus, data } from 'slices/teamLeader';
import GridWrapper from 'CustomComponents/GridWrapper';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LeaveDetailsModel } from 'components/MyProfile/Leaves';


type Props = {
  setNewForm?: any;
  setOpenSnack?: any;
  leaveType: string;
  leaveDetails: LeaveDetailsModel;
  setLeaveDetails: any;
};

const LeaveForm: React.FC<Props> = ({
  setNewForm,
  setOpenSnack,
  leaveType,
  leaveDetails,
  setLeaveDetails
}) => {
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [approvers, setApprovers] = useState<any[]>([])
  const { access_token } = useContext(AppCtx);
  const TLDataStatus = useSelector(dataStatus);
  const TLData = useSelector(data);

  useEffect(() => {
    if (TLDataStatus !== 'idle') {
      setApprovers(TLData)
    }
  }, [TLDataStatus])
  
console.log({leaveType})
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
    const noOfDays = leaveDetails.noOfDays, dateFrom = leaveDetails.dateFrom;
    if (noOfDays && dateFrom) {
      lastDay = noOfDays > 1 ? moment(dateFrom).businessAdd(noOfDays-1, 'day') : moment(dateFrom);
      returnToWork = moment(lastDay).businessAdd(1, 'day');
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

  const handleChange = () => {};

  // const CLForm = (
  //   <>
  //     <Grid item xs={12} md={6}>
  //       <TextField
  //         label='Approved OT Hours to Offset (CL)'
  //         variant='standard'
  //         fullWidth
  //         disabled={loading}
  //       />
  //     </Grid>
  //     <Grid item xs={12} md={3}>
  //       <LocalizationProvider dateAdapter={AdapterDateFns}>
  //         <DatePicker
  //           label='Date to Offset (CL) - From'
  //           onChange={handleChange}
  //           disabled={loading}
  //           value={new Date()}
  //           renderInput={(params) => (
  //             <TextField {...params} fullWidth required variant='standard' />
  //           )}
  //         />
  //       </LocalizationProvider>
  //     </Grid>
  //     <Grid item xs={12} md={3}>
  //       <LocalizationProvider dateAdapter={AdapterDateFns}>
  //         <DatePicker
  //           value={new Date()}
  //           disabled={loading}
  //           label='Date to Offset (CL) - From'
  //           onChange={handleChange}
  //           renderInput={(params) => (
  //             <TextField {...params} fullWidth required variant='standard' />
  //           )}
  //         />
  //       </LocalizationProvider>
  //     </Grid>
  //   </>
  // );

  // const OBForm = (
  //   <>
  //     <Grid item xs={12} md={6}>
  //       <TextField
  //         required
  //         label='Itinerary (FROM)'
  //         variant='standard'
  //         fullWidth
  //         disabled={loading}
  //       />
  //     </Grid>
  //     <Grid item xs={12} md={6}>
  //       <TextField
  //         required
  //         label='Itinerary (TO)'
  //         variant='standard'
  //         fullWidth
  //         disabled={loading}
  //       />
  //     </Grid>
  //     <Grid item xs={12} md={12}>
  //       <TextField
  //         required
  //         label='Purpose'
  //         variant='standard'
  //         fullWidth
  //         disabled={loading}
  //       />
  //     </Grid>
  //     <Grid item xs={12} md={6}>
  //       <LocalizationProvider dateAdapter={AdapterDateFns}>
  //         <DateTimePicker
  //           value={new Date()}
  //           label='Date & Time of Departure'
  //           onChange={handleChange}
  //           disabled={loading}
  //           renderInput={(params) => (
  //             <TextField {...params} fullWidth required variant='standard' />
  //           )}
  //         />
  //       </LocalizationProvider>
  //     </Grid>
  //     <Grid item xs={12} md={6}>
  //       <LocalizationProvider dateAdapter={AdapterDateFns}>
  //         <DateTimePicker
  //           value={new Date()}
  //           label='Date & Time of Arrival'
  //           onChange={handleChange}
  //           disabled={loading}
  //           renderInput={(params) => (
  //             <TextField {...params} fullWidth required variant='standard' />
  //           )}
  //         />
  //       </LocalizationProvider>
  //     </Grid>
  //   </>
  // );

  const maxWidth = 780;
  return (
    <>
      <GridWrapper colSize='2' className='grid grid-cols-8 gap-4'>
        <div className='col-span-6'>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <MobileDateTimePicker
              label="Date of Leave (First Day)"
              value={leaveDetails.dateFrom}
              onChange={(newValue) => {
                setLeaveDetails({
                  ...leaveDetails,
                  dateFrom: newValue
                })
              }}
              renderInput={(params) => <TextField {...params} variant="standard" size="small" className='w-full' />}
            />
          </LocalizationProvider>
        </div>
        <div className='col-span-2'>
          <TextField
            size='small'
            value={leaveDetails.noOfDays}
            label='No. of Days'
            disabled={!(leaveDetails.dateFrom)}
            variant='standard'
            InputProps={{ inputProps: { min: 1 } }}
            type={"number"}
            onChange={(e) => {
              setLeaveDetails({
                ...leaveDetails,
                noOfDays: e.target.value,
              })
            }}
          />
        </div>
        <div className='col-span-4'>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <MobileDateTimePicker
              label="Date of Leave (Last Day)"
              disabled={!(leaveDetails.dateFrom && leaveDetails.noOfDays)}
              value={leaveDetails.dateTo}
              onChange={(newValue) => {
                setLeaveDetails({
                  ...leaveDetails,
                  dateTo: newValue
                })
              }}
              renderInput={(params) => <TextField {...params} variant="standard" size="small" className='w-full' />}
            />
          </LocalizationProvider>
        </div>
        <div className='col-span-4'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
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
            rows={3}
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
                      {tl.employeeNo}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
        </div>
        
        </GridWrapper>
    </>
  );
};

export default LeaveForm;
