/* eslint-disable react-hooks/exhaustive-deps */
import { EventNote, Publish } from '@mui/icons-material';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  FormLabel,
  RadioGroup,
  Radio,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LoadingButton from '@mui/lab/LoadingButton';

import { Box } from '@mui/system';
import OTModal from './OTModal';
import CustomCard from '../../../CustomComponents/CustomCard';

type Props = {
  setNewForm?: any;
  setOpenSnack?: any;
  setSelectedLeaveType?: any;
  isOT?: boolean;
};

const OTForm: React.FC<Props> = ({
  setNewForm,
  setOpenSnack,
  setSelectedLeaveType,
}) => {
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [leaveType, setLeaveType] = useState('');

  useEffect(() => {
    console.log({ leaveType });
    setSelectedLeaveType && setSelectedLeaveType(leaveType);
  }, [leaveType]);

  useEffect(() => {
    console.log({ loading });
    loading &&
      setTimeout(() => {
        setLoading(false);
        setOpenSnack(true);
        setNewForm(false);
      }, 2000);
  }, [loading]);

  const handleChange = () => {};

  return (
    <>
      <CustomCard className='max-w-[780px] mx-auto'>
        <OTModal />
        <Typography
          variant='h6'
          // sx={{ display: 'flex', alignItems: 'center', mb: 2 }}
          className='text-sky-500 flex items-center mb-4'
          color='primary'
        >
          <EventNote className='mr-2 text-sky-500 ' />
          OT Application Details
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={new Date()}
                disabled={loading}
                label='Date'
                onChange={handleChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    required
                    variant='standard'
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={4}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                value={new Date()}
                disabled={loading}
                label='Time From'
                onChange={handleChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    required
                    variant='standard'
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={4}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                value={new Date()}
                disabled={loading}
                label='Time To'
                onChange={handleChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    required
                    variant='standard'
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} md={5}>
            <FormControl required>
              <FormLabel id='early'>Early OT</FormLabel>
              <Typography variant='caption'>
                Default selection: <strong>No</strong>. Select{' '}
                <strong>Yes</strong> if your OT will start BEFORE your regular
                shift. Example: 5am - 6:30am etc.
              </Typography>
              <RadioGroup row aria-labelledby='early' defaultValue='No'>
                <FormControlLabel value='Yes' control={<Radio />} label='Yes' />
                <FormControlLabel value='No' control={<Radio />} label='No' />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl required>
              <FormLabel id='early'>Less Break</FormLabel>
              <RadioGroup row aria-labelledby='early'>
                <FormControlLabel value='Yes' control={<Radio />} label='Yes' />
                <FormControlLabel value='No' control={<Radio />} label='No' />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl required>
              <FormLabel id='early'>Actual Date is plus 1 day</FormLabel>
              <RadioGroup row aria-labelledby='early'>
                <FormControlLabel value='Yes' control={<Radio />} label='Yes' />
                <FormControlLabel value='No' control={<Radio />} label='No' />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              fullWidth
              multiline
              label='Reason'
              required
              disabled={loading}
              variant='standard'
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <Box
              className={`${
                confirmed ? 'bg-sky-200' : 'bg-slate-200'
              } px-4 py-2 rounded-sm ease-in-out`}
            >
              <FormControlLabel
                disabled={loading}
                onChange={() => setConfirmed(!confirmed)}
                control={
                  <Checkbox required className='text-sm checked:text-sky-500' />
                }
                label='Click if all information is true and correct.'
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={12} sx={{ textAlign: 'right' }}>
            <LoadingButton
              className='bg-sky-500 hover:bg-sky-600 text-md ease-in-out'
              loading={loading}
              loadingPosition='start'
              startIcon={<Publish />}
              variant='contained'
              disabled={!confirmed}
              onClick={() => setLoading(true)}
              disableElevation
            >
              Submit OT Application
            </LoadingButton>
          </Grid>
        </Grid>
      </CustomCard>
    </>
  );
};

export default OTForm;
