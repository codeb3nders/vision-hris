/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { Card, Button, Link } from '@mui/material';
import { AddCircleOutlineTwoTone, UploadTwoTone } from '@mui/icons-material';
import NewEmployeeProfile from './new.employee.profile';
import {
  getEmployeesWithLeavesAction as _getEmployeesWithLeavesAction,
  getEmployeesWithLeaveStatus as _getEmployeesWithLeaveStatus,
  getEmployeesWithLeaveItems as _getEmployeesWithLeaveItems,
  getEmployeesWithLeaveError as _getEmployeesWithLeaveError,
  getEmployeesAction as _getEmployeesAction,
  getEmployeeStatus as _getEmployeeStatus,
  getEmployeeItems as _getEmployeeItems,
  getEmployeeError as _getEmployeeError,
} from 'slices';
import { EmployeeI } from 'slices/interfaces/employeeI';
import ViewEmployeeProfile from './view.employee.profile';
import { useLocation } from 'react-router-dom';
import { MainCtx } from 'components/Main';
import { authStore } from 'slices/userAccess/authSlice';
import { AppCtx } from 'App';

type Props = {};

export const EmployeeCtx = createContext<any>({});

const EmployeeDatabase: React.FC<Props> = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { access_token } = useContext(AppCtx);

  // Employees
  const getEmployeeStatus = useSelector(_getEmployeeStatus);
  const getEmployeeItems = useSelector(_getEmployeeItems);
  const getEmployeeError = useSelector(_getEmployeeError);

  const getEmployeesWithLeaveStatus = useSelector(_getEmployeesWithLeaveStatus);
  const getEmployeesWithLeaveItems = useSelector(_getEmployeesWithLeaveItems);
  const getEmployeesWithLeaveError = useSelector(_getEmployeesWithLeaveError);
  const { setIsTable } = useContext(MainCtx);
  const [viewDetails, setViewDetails] = useState<{
    details: any;
    status: boolean;
  }>({
    details: {},
    status: false,
  });

  const [refresh, setRefresh] = useState<boolean>(false);

  const [employees, setEmployees] = useState<EmployeeI[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (location.pathname === '/people/employees') {
      setIsTable(true);
    } else {
      setIsTable(false);
    }
  }, [location]);

  useEffect(() => {
    if (access_token && getEmployeeStatus === 'idle') {
      dispatch(_getEmployeesAction(access_token));
    }
  }, [access_token]);

  useEffect(() => {
    setEmployees(
      getEmployeeItems.map((r: any) => {
        const mi = r.middleName ? r.middleName.charAt(0) : '';
        const full_name = `${r.lastName}, ${r.firstName} ${mi}`;
        return { ...r, id: r.employeeNo, full_name };
      })
    );
  }, [getEmployeeItems]);

  return (
    <EmployeeCtx.Provider value={{ setRefresh }}>
      <NewEmployeeProfile open={open} setOpen={setOpen} />
      <ViewEmployeeProfile
        viewDetails={viewDetails}
        setViewDetails={setViewDetails}
      />

      <Card sx={{ mt: 5, p: 2 }}>
        <div style={{ marginBottom: 16, textAlign: 'right' }}>
          <Button startIcon={<UploadTwoTone />} sx={{ mr: 1 }}>
            Upload Employee Details
          </Button>
          <Button
            startIcon={<AddCircleOutlineTwoTone />}
            onClick={() => setOpen(true)}
            id='add-new-employee-btn'
          >
            Add New Employee
          </Button>
        </div>

        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            disableSelectionOnClick
            rows={employees || []}
            columns={columns(setViewDetails)}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            loading={employees?.length <= 0}
            getRowId={(row) => row.employeeNo}
          />
        </div>
      </Card>
    </EmployeeCtx.Provider>
  );
};

const columns = (setViewDetails: any) => [
  {
    field: 'full_name',
    headerName: 'Employee name',
    width: 300,
    renderCell: (cell) => {
      return (
        <Link
          underline='none'
          variant='button'
          style={{ cursor: 'pointer' }}
          onClick={() => setViewDetails({ details: cell.row, status: true })}
        >
          <div className='whitespace-normal'>{cell.value}</div>
        </Link>
      );
    },
  },
  {
    field: 'employeeNo',
    headerName: 'Employee No.',
    width: 100,
    renderCell: (cell) => (
      <span title={cell.value} className='MuiDataGrid-cellContent'>
        {cell.value}
      </span>
    ),
  },
  { field: 'position', headerName: 'Position', width: 200 },
  {
    field: 'rank',
    headerName: 'Rank',
    width: 140,
  },
  {
    field: 'department',
    headerName: 'Department',
    width: 250,
    //   renderCell: (cell) => cell,
  },
  {
    field: 'location',
    headerName: 'Location',
    width: 140,
    //   renderCell: (cell) => cell,
  },
  {
    field: 'employmentStatus',
    headerName: 'Employment Status',
    width: 140,
    //   renderCell: (cell) => cell,
  },
];

export default EmployeeDatabase;
