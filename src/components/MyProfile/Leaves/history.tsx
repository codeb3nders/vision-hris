import { HistoryTwoTone } from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import moment from 'moment';
import React, { useState } from 'react';
import CollapseWrapper from './../PersonalProfileTab/collapse.wrapper';

type Props = {};

const columns: GridColDef[] = [
  {
    field: 'date',
    headerName: 'Date',
    width: 90,
    renderCell: (params: any) => {
      console.log({ params });

      return params.value;
    },
  },
  {
    field: 'leave_type',
    headerName: 'Leave Type',
    width: 90,
    renderCell: (params: any) => {
      return params.value;
    },
  },
  {
    field: 'details',
    headerName: 'Details',
    width: 250,
    renderCell: (params: any) => {
      return <div className='text-xs p-1'>{params.value}</div>;
    },
  },
  {
    field: 'used',
    headerName: 'Used',
    width: 50,
    renderCell: (params: any) => {
      return params.value;
    },
  },
  {
    field: 'balance',
    headerName: 'Balance',
    width: 70,
    renderCell: (params: any) => {
      return params.value;
    },
  },
  {
    field: 'comments',
    headerName: 'Comments',
    width: 90,
    renderCell: (params: any) => {
      return <div className='text-xs p-1'>{params.value}</div>;
    },
  },
];

const initialState = [
  {
    id: 1,
    date: moment().format('LL'),
    leave_type: 'Vacation',
    details:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. In necessitatibus dolorum eaque soluta quasi harum ipsam omnis voluptatum, reiciendis animi repellat.',
    used: 1,
    balance: 4,
    comments: 'sample comment',
  },
  {
    id: 2,
    date: moment().format('LL'),
    leave_type: 'Sick',
    details:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. In necessitatibus dolorum eaque soluta quasi harum ipsam omnis voluptatum, reiciendis animi repellat.',
    used: 2,
    balance: 3,
    comments: 'sample comment',
  },
];

const History = (props: Props) => {
  const [rows, setRows] = useState<any>(initialState);

  return (
    <CollapseWrapper
      panelTitle='History'
      icon={HistoryTwoTone}
      contentClassName='p-0'
    >
      <DataGrid
        autoHeight
        disableSelectionOnClick
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        getRowHeight={() => 'auto'}
        className='border-0 '
      />
    </CollapseWrapper>
  );
};

export default History;
