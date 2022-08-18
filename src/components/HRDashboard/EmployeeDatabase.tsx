/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Card, Button, Link } from '@mui/material';
import { AddCircleOutlineTwoTone, UploadTwoTone } from '@mui/icons-material';
import NewEmployeeProfile from './new.employee.profile';
import { getEmployeesEndpoint } from 'apis/employees';
import { EmployeeI } from 'slices/interfaces/employeeI';
import ViewEmployeeProfile from './view.employee.profile';
import { useLocation } from 'react-router-dom';
import { MainCtx } from 'components/Main';

type Props = {};

export const EmployeeCtx = createContext<any>({});

const EmployeeDatabase: React.FC<Props> = () => {
  const location = useLocation();
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
    employees && employees?.length <= 0 && getEmployees();
  }, [employees]);

  useEffect(() => {
    if (refresh) {
      setEmployees([]);
      getEmployees();
    }
  }, [refresh]);

  const getEmployees = async () => {
    try {
      const res = await getEmployeesEndpoint();
      setEmployees(
        res.data?.map((r: any) => {
          return { ...r, id: r.employeeNo };
        })
      );
    } catch (error: any) {
      console.log(error.message);
    }
  };

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
          />
        </div>
      </Card>
    </EmployeeCtx.Provider>
  );
};

const columns = (setViewDetails: any) => [
  {
    field: 'employee_name',
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
          <div className='whitespace-normal'>
            {cell.row.lastName}, {cell.row.firstName} {cell.row.middleName}
          </div>
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
