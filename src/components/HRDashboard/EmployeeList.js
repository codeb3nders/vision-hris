import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Card, Button } from '@mui/material';
import { Employees } from './EmployeeData';

const EmployeeList = () => {
  const columns = [
    {
      field: 'employee_name',
      headerName: 'Employee name',
      width: 200,
      renderCell: (cell) => {
        return (
          <Button title={cell.value} variant='text' onClick={() => {}}>
            {cell.value}
          </Button>
        );
      },
    },
    {
      field: 'employee_no',
      headerName: 'Employee No.',
      width: 160,
      renderCell: (cell) => (
        <span title={cell.value} className='MuiDataGrid-cellContent'>
          {cell.value}
        </span>
      ),
    },
    { field: 'position', headerName: 'Position', width: 160 },
    {
      field: 'rank',
      headerName: 'Rank',
      width: 220,
    },
    {
      field: 'division',
      headerName: 'Division',
      width: 180,
      //   renderCell: (cell) => cell,
    },
    {
      field: 'department',
      headerName: 'Department',
      width: 180,
      //   renderCell: (cell) => cell,
    },
  ];

  return (
    <Card>
      {' '}
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          disableSelectionOnClick
          rows={Employees}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          loading={false}
          onCellDoubleClick={(params, event, details) =>
            console.log({ params, event, details })
          }
        />
      </div>
    </Card>
  );
};

export default EmployeeList;
