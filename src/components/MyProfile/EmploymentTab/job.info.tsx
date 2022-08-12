import React from 'react';
import CollapseWrapper from '../PersonalProfileTab/collapse.wrapper';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import moment from 'moment';
import { EngineeringTwoTone } from '@mui/icons-material';

type Props = {};

const columns: GridColDef[] = [
  {
    field: 'effective_date',
    headerName: 'Effective Date',
    width: 120,
    renderCell: (params: any) => {
      return <div className='text-xs p-1'>{params.value}</div>;
    },
  },
  {
    field: 'division',
    headerName: 'Division',
    width: 120,
    renderCell: (params: any) => {
      return <div className='text-xs p-1'>{params.value}</div>;
    },
  },
  {
    field: 'location',
    headerName: 'Location',
    width: 120,
    renderCell: (params: any) => {
      return <div className='text-xs p-1'>{params.value}</div>;
    },
  },
  {
    field: 'department',
    headerName: 'Department',
    width: 120,
    renderCell: (params: any) => {
      return <div className='text-xs p-1'>{params.value}</div>;
    },
  },
  {
    field: 'rank',
    headerName: 'Rank',
    width: 120,
    renderCell: (params: any) => {
      return <div className='text-xs p-1'>{params.value}</div>;
    },
  },
  {
    field: 'position',
    headerName: 'Position',
    width: 120,
    renderCell: (params: any) => {
      return <div className='text-xs p-1'>{params.value}</div>;
    },
  },
  {
    field: 'reports_to',
    headerName: 'Reports To',
    width: 120,
    renderCell: (params: any) => {
      return <div className='text-xs p-1'>{params.value}</div>;
    },
  },
  {
    field: 'comment',
    headerName: 'Comment',
    width: 120,
    renderCell: (params: any) => {
      return <div className='text-xs p-1'>{params.value}</div>;
    },
  },
];

const rows = [
  {
    id: 1,
    effective_date: moment().format('LL'),
    division: 'HEAD OFFICE',
    location: 'HEAD OFFICE',
    department: 'HEAD OFFICE',
    rank: 'HEAD OFFICE',
    position: 'PLANNING & SCHEDULING MANAGER',
    reports_to: 'SUPERVISOR',
    comment: 'Test comment',
  },
  {
    id: 2,
    effective_date: moment().format('LL'),
    division: 'HEAD OFFICE',
    location: 'HEAD OFFICE',
    department: 'HEAD OFFICE',
    rank: 'HEAD OFFICE',
    position: 'PLANNING & SCHEDULING MANAGER',
    reports_to: 'SUPERVISOR',
    comment: 'Test comment',
  },
  {
    id: 3,
    effective_date: moment().format('LL'),
    division: 'HEAD OFFICE',
    location: 'HEAD OFFICE',
    department: 'HEAD OFFICE',
    rank: 'HEAD OFFICE',
    position: 'PLANNING & SCHEDULING MANAGER',
    reports_to: 'SUPERVISOR',
    comment: 'Test comment',
  },
];

const JobInfo = (props: Props) => {
  return (
    <CollapseWrapper
      panelTitle='Job Information'
      icon={EngineeringTwoTone}
      contentClassName='p-0'
    >
      <div style={{ width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          getRowHeight={() => 'auto'}
          autoHeight
          className='border-0'
        />
      </div>
    </CollapseWrapper>
  );
};

export default JobInfo;
