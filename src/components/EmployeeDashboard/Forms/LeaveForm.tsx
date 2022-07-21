/* eslint-disable react-hooks/exhaustive-deps */
import { EventNote, Publish } from '@mui/icons-material';
import {
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LoadingButton from '@mui/lab/LoadingButton';

import { Box } from '@mui/system';
import { LeaveTypes } from '../../../constants/LeaveTypes';
import CustomCard from '../../../CustomComponents/CustomCard';
import LeaveModal from './LeaveModal';
import { useParams, useLocation } from 'react-router-dom';

type Props = {
  setNewForm?: any;
  setOpenSnack?: any;
  setSelectedLeaveType?: any;
  isOT?: any;
};

const LeaveForm: React.FC<Props> = ({
  setNewForm,
  setOpenSnack,
  setSelectedLeaveType,
  isOT,
}) => {
  const params = useParams();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [leaveType, setLeaveType] = useState<string>('');

  useEffect(() => {
    console.log({ params, location: location?.search?.split('=')[1] });
  }, [params, location]);

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

  const CLForm = (
    <>
      <Grid item xs={12} md={6}>
        <TextField
          label='Approved OT Hours to Offset (CL)'
          variant='standard'
          fullWidth
          disabled={loading}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label='Date to Offset (CL) - From'
            onChange={handleChange}
            disabled={loading}
            value={new Date()}
            renderInput={(params) => (
              <TextField {...params} fullWidth required variant='standard' />
            )}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12} md={3}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            value={new Date()}
            disabled={loading}
            label='Date to Offset (CL) - From'
            onChange={handleChange}
            renderInput={(params) => (
              <TextField {...params} fullWidth required variant='standard' />
            )}
          />
        </LocalizationProvider>
      </Grid>
    </>
  );

  const OBForm = (
    <>
      <Grid item xs={12} md={6}>
        <TextField
          required
          label='Itinerary (FROM)'
          variant='standard'
          fullWidth
          disabled={loading}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          required
          label='Itinerary (TO)'
          variant='standard'
          fullWidth
          disabled={loading}
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <TextField
          required
          label='Purpose'
          variant='standard'
          fullWidth
          disabled={loading}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            value={new Date()}
            label='Date & Time of Departure'
            onChange={handleChange}
            disabled={loading}
            renderInput={(params) => (
              <TextField {...params} fullWidth required variant='standard' />
            )}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12} md={6}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            value={new Date()}
            label='Date & Time of Arrival'
            onChange={handleChange}
            disabled={loading}
            renderInput={(params) => (
              <TextField {...params} fullWidth required variant='standard' />
            )}
          />
        </LocalizationProvider>
      </Grid>
    </>
  );

  const maxWidth = 780;
  return (
    <>
      <CustomCard className='max-w-[800px] mx-auto'>
        <Card
          sx={{ textAlign: 'left', maxWidth, width: '100%', boxShadow: 'none' }}
        >
          <LeaveModal isOpen={isOpen} setIsOpen={setIsOpen} />
          <Typography
            variant='h6'
            className='flex items-center mb-4 text-sky-500'
            color='primary'
          >
            <EventNote className='mr-2 text-sky-500' /> Leave Application
            Details
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={12}>
              <FormControl
                fullWidth
                variant='standard'
                required
                disabled={loading}
              >
                <InputLabel id='leave_applied'>Leave applied for:</InputLabel>
                <Select
                  fullWidth
                  labelId='leave_applied'
                  label='Leave applied for:'
                  required
                  value={location?.search?.split('=')[1] || leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                >
                  {LeaveTypes.map((lt) => (
                    <MenuItem key={lt.id} value={lt.id}>
                      {lt.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {leaveType === 'cl' && CLForm}
            {leaveType === 'ob' && OBForm}

            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  value={new Date()}
                  disabled={loading}
                  label='Date & Time of Leave (First Day)'
                  onChange={handleChange}
                  className='text-sm'
                  renderInput={(params) => (
                    <TextField
                      className='text-sm'
                      {...params}
                      fullWidth
                      required
                      variant='standard'
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  className='text-sm'
                  value={new Date()}
                  disabled={loading}
                  label='Date & Time of Leave (Last Day)'
                  onChange={handleChange}
                  renderInput={(params) => (
                    <TextField
                      className='text-sm'
                      {...params}
                      fullWidth
                      required
                      variant='standard'
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  className='text-sm'
                  value={new Date()}
                  disabled={loading}
                  label='Date of Return to Work'
                  onChange={handleChange}
                  renderInput={(params) => (
                    <TextField
                      className='text-sm'
                      {...params}
                      fullWidth
                      required
                      variant='standard'
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label='No. of Leave Days'
                fullWidth
                required
                variant='standard'
                type='number'
                defaultValue={1}
                disabled={loading}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                className='text-sm'
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                multiline
                label='Please State the Reason for the Filed Leave '
                required
                disabled={loading}
                variant='standard'
                className='text-sm'
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
                  control={<Checkbox required className='text-sm' />}
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
                Submit Leave Application
              </LoadingButton>
            </Grid>
          </Grid>
        </Card>
      </CustomCard>
    </>
  );
};

export default LeaveForm;
