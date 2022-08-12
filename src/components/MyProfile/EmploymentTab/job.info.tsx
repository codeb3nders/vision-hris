import React from 'react';
import CollapseWrapper from '../PersonalProfileTab/collapse.wrapper';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import moment from 'moment';
import { EngineeringTwoTone } from '@mui/icons-material';

type Props = {};

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'effective_date', headerName: 'Effective Date', width: 130 },
  { field: 'division', headerName: 'Division', width: 130 },
  { field: 'location', headerName: 'Location', width: 160 },
  { field: 'department', headerName: 'Department', width: 130 },
  { field: 'rank', headerName: 'Rank', width: 130 },
  { field: 'position', headerName: 'Position', width: 130 },
  { field: 'reports_to', headerName: 'Reports To', width: 130 },
  { field: 'comment', headerName: 'Comment', width: 130 },
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
    <CollapseWrapper panelTitle='Job Information' icon={EngineeringTwoTone}>
      <div style={{ height: 300, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </CollapseWrapper>
  );
};

export default JobInfo;
