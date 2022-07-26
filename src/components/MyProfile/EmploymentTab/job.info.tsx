import React from 'react';
import CollapseWrapper from '../PersonalProfileTab/collapse.wrapper';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import moment from 'moment';
import { EngineeringTwoTone } from '@mui/icons-material';

type Props = {};

const columns: GridColDef[] = [
  { field: 'effective_date', headerName: 'Effective Date', flex: 1 },
  { field: 'division', headerName: 'Division', flex: 1 },
  { field: 'location', headerName: 'Location', flex: 1 },
  { field: 'department', headerName: 'Department', flex: 1 },
  { field: 'rank', headerName: 'Rank', flex: 1 },
  { field: 'position', headerName: 'Position', flex: 1 },
  { field: 'reports_to', headerName: 'Reports To', flex: 1 },
  { field: 'comment', headerName: 'Comment', flex: 1 },
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
      <div style={{ minHeight: 300, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          getRowHeight={() => 'auto'}
          autoHeight
        />
      </div>
    </CollapseWrapper>
  );
};

export default JobInfo;
