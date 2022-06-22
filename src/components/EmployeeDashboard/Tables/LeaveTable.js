import React, { useContext, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Card,
  Breadcrumbs,
  Link,
  Typography,
  Chip,
  Button,
  Select,
  MenuItem,
  Grid,
  Snackbar,
  Alert,
  Slide,
} from '@mui/material';
import ViewDetailsModal from './ViewDetailsModal';
import { AppCtx } from './../../../App';
import { AddCircleOutlined } from '@mui/icons-material';
import LeaveForm from '../Forms/LeaveForm';
import { LeaveTypes } from '../../../constants/LeaveTypes';

const LeaveTable = () => {
  const { isHRLogin } = useContext(AppCtx);
  const [selectedLeaveType, setSelectedLeaveType] = useState(null);
  const [openSnack, setOpenSnack] = useState(false);
  const [newForm, setNewForm] = useState(false);
  const [viewDetails, setViewDetails] = useState({
    details: {},
    status: false,
  });

  const columns = [
    {
      field: 'employee_name',
      headerName: 'Employee name',
      width: 200,
      renderCell: (cell) => {
        return (
          <Button
            title={cell.value}
            variant='text'
            onClick={() => setViewDetails({ details: cell, status: true })}
          >
            {cell.value}
          </Button>
        );
      },
    },
    { field: 'employee_no', headerName: 'Employee #', width: 100 },
    {
      field: 'leave_type',
      headerName: 'Leave Type',
      width: 160,
      renderCell: (cell) => (
        <span title={cell.value} className='MuiDataGrid-cellContent'>
          {cell.value}
        </span>
      ),
    },
    { field: 'date_requested', headerName: 'Date/Time Requested', width: 160 },
    {
      field: 'reason',
      headerName: 'Reason',
      width: 220,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 140,
      renderCell: (cell) => {
        return !isHRLogin ? (
          <Chip
            label={cell.value}
            color={
              cell.value === 'Pending'
                ? 'warning'
                : cell.value === 'Approve'
                ? 'success'
                : 'error'
            }
            size='small'
          />
        ) : (
          <Select fullWidth>
            <MenuItem>Approve</MenuItem>
            <MenuItem>Disapprove</MenuItem>
          </Select>
        );
      },
    },
  ];

  const rows = [
    {
      id: 1,
      leave_type: 'Sick Leave (SL)',
      employee_no: 1015,
      employee_name: 'Leogie Dela Vega',
      date_requested: '2/21/2022 10:08:52',
      date_from: '2/17/2022 9:00:00',
      date_to: '2/17/2022 18:00:00',
      reason: 'Sick',
      supervisor: 'Albert Ignacio',
      status: 'Pending',
    },
    {
      id: 2,
      leave_type: 'Vacation Leave (VL)',
      employee_no: 1015,
      employee_name: 'Leogie Dela Vega',
      date_requested: '2/21/2022 10:08:52',
      date_from: '2/17/2022 9:00:00',
      date_to: '2/17/2022 18:00:00',
      reason: 'IMPORTANT PERSONAL MATTERS',
      supervisor: 'Albert Ignacio',
      status: 'Disapprove',
    },
    {
      id: 3,
      leave_type: 'Vacation Leave (VL)',
      employee_no: 1015,
      employee_name: 'Leogie Dela Vega',
      date_requested: '2/21/2022 10:08:52',
      date_from: '2/17/2022 9:00:00',
      date_to: '2/17/2022 18:00:00',
      reason: 'CSE Filing',
      supervisor: 'Albert Ignacio',
      status: 'Approve',
    },
  ];

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };

  return (
    <>
      <ViewDetailsModal
        viewDetails={viewDetails}
        setViewDetails={setViewDetails}
      />
      <Snackbar
        open={openSnack}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        TransitionComponent={Slide}
      >
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          {LeaveTypes.filter((lt) => lt.id === selectedLeaveType)[0]?.label}{' '}
          Leave Application submitted successfully.
        </Alert>
      </Snackbar>
      <Grid item>
        <Breadcrumbs
          aria-label='breadcrumb'
          sx={{ my: 2, justifyContent: 'center', display: 'flex' }}
        >
          <Typography color='inherit'>ESS Application</Typography>
          {newForm ? (
            <Link
              underline='hover'
              color='inherit'
              href='#'
              onClick={() => setNewForm(false)}
            >
              Leave Applications
            </Link>
          ) : (
            <Typography color='text.primary'>Leave Applications</Typography>
          )}
          {newForm && (
            <Typography color='text.primary'>New Application</Typography>
          )}
        </Breadcrumbs>
      </Grid>

      {newForm ? (
        <Grid container justifyContent='center'>
          <LeaveForm
            setNewForm={setNewForm}
            setSelectedLeaveType={setSelectedLeaveType}
            setOpenSnack={setOpenSnack}
          />
        </Grid>
      ) : (
        <Card sx={{ width: '100%', p: 2 }}>
          <div style={{ marginBottom: 16, textAlign: 'right' }}>
            <Button
              startIcon={<AddCircleOutlined />}
              onClick={() => setNewForm(true)}
            >
              New Leave Application
            </Button>
          </div>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              disableSelectionOnClick
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              loading={rows.length <= 0}
            />
          </div>
        </Card>
      )}
    </>
  );
};

export default LeaveTable;
