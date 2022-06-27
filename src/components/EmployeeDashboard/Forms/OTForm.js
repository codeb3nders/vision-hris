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
  FormLabel,
  RadioGroup,
  Radio,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import LeaveModal from './LeaveModal';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import TimePicker from '@mui/lab/TimePicker';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LoadingButton from '@mui/lab/LoadingButton';

import { Box } from '@mui/system';
import { LeaveTypes } from '../../../constants/LeaveTypes';
import OTModal from './OTModal';

const OTForm = ({ setNewForm, setOpenSnack, setSelectedLeaveType, isOT }) => {
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

  const maxWidth = 780;
  return (
    <>
      <Card sx={{ p: 3, textAlign: 'left', maxWidth, width: '100%' }}>
        <OTModal isOpen={isOpen} setIsOpen={setIsOpen} />
        <Typography
          variant='h6'
          sx={{ display: 'flex', alignItems: 'center', mb: 2 }}
          color='primary'
        >
          <EventNote sx={{ mr: 1 }} />
          OT Application Details
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
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
          <Grid item xs={12} md={5}>
            <TextField
              fullWidth
              multiline
              label='Reason'
              required
              disabled={loading}
              variant='standard'
            />
          </Grid>

          <Grid item xs={12} md={7}>
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
              Submit OT Application
            </LoadingButton>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default OTForm;
