import { ContactMail, EventNote, Publish } from '@mui/icons-material';
import {
  Button,
  Card,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import LeaveModal from './LeaveModal';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LoadingButton from '@mui/lab/LoadingButton';

import { Box } from '@mui/system';
import { LeaveTypes } from '../../../constants/LeaveTypes';

const LeaveForm = ({ setNewForm, setOpenSnack, setSelectedLeaveType }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [leaveType, setLeaveType] = useState('');

  useEffect(() => {
    console.log({ leaveType });
    setSelectedLeaveType(leaveType);
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
            renderInput={(params) => (
              <TextField {...params} fullWidth required variant='standard' />
            )}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12} md={3}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
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
      <Card sx={{ p: 3, textAlign: 'left', maxWidth, width: '100%' }}>
        <LeaveModal isOpen={isOpen} setIsOpen={setIsOpen} />
        <Typography
          variant='h6'
          sx={{ display: 'flex', alignItems: 'center', mb: 2 }}
          color='primary'
        >
          <EventNote sx={{ mr: 1 }} /> Leave Application Details
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
                value={leaveType}
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

          <Grid item xs={12} md={4}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                disabled={loading}
                label='Date & Time of Leave (First Day)'
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
              <DateTimePicker
                disabled={loading}
                label='Date & Time of Leave (Last Day)'
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
              <DateTimePicker
                disabled={loading}
                label='Date of Return to Work'
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

          <Grid item xs={12} md={8}>
            <FormControl
              fullWidth
              variant='standard'
              required
              disabled={loading}
            >
              <InputLabel id='supervisor'>
                Select your Immediate Team Leader/Supervisor.
              </InputLabel>

              <Select
                fullWidth
                labelId='supervisor'
                label='Select your Immediate Team Leader/Supervisor.'
              >
                <MenuItem value='Quino'>Al Quino</MenuItem>
                <MenuItem value='Ignacio'>Albert Ignacio</MenuItem>
                <MenuItem value='Tawagon'>Anna Tawagon</MenuItem>
                <MenuItem value='Cabingasl'>Carla Cabingas</MenuItem>
                <MenuItem value='Derit'>Charles Derit</MenuItem>
              </Select>
            </FormControl>
            <Typography variant='caption' color='#999'>
              For SITE-BASED employees, please select your PROJECT MANAGER,
              only.
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              label='No. of Leave Days'
              fullWidth
              required
              variant='standard'
              type='number'
              defaultValue={1}
              disabled={loading}
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
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
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <Box
              sx={{
                background: confirmed ? '#1976d22e' : '#eee',
                p: 2,
                py: 1,
                borderRadius: 1,
                transition: 'background 300ms ease',
              }}
            >
              <FormControlLabel
                disabled={loading}
                onChange={() => setConfirmed(!confirmed)}
                control={<Checkbox required />}
                label='Click if all information is true and correct.'
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={12} sx={{ textAlign: 'right' }}>
            <LoadingButton
              loading={loading}
              color='primary'
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
    </>
  );
};

export default LeaveForm;
