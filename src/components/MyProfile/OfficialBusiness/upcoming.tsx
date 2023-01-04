import { Upcoming } from '@mui/icons-material';
import { Grid, Tooltip } from '@mui/material';
import { DataGrid, gridClasses, GridColDef } from '@mui/x-data-grid';
import LeaveDataCard from 'components/EmployeeDashboard/Management/LeaveDataCard';
import moment from 'moment';
import React, { useState } from 'react';
import CollapseWrapper from '../PersonalProfileTab/collapse.wrapper';

type Props = {
  data: any[];
};

const columns: GridColDef[] = [
  {
    field: 'leaveTypeDetails',
    width: 50,
    headerName: '',
    renderCell: (params: any) => {
      return <Tooltip title={params.row.leaveTypeDetails.name} >
        {params.row.leaveTypeDetails.icon}
      </Tooltip>;
    },
  },
  {
    field: 'startDate',
    headerName: 'Start Date',
    width: 200
  },
  {
    field: 'noOfDays',
    headerName: 'No. Of Days',
    align: 'center'
  },
  {
    field: 'reasonOfLeave',
    headerName: 'Reason of Leave',
    width: 400
  },
  {
    field: 'balance',
    headerName: 'Balance',
    width: 70,
    renderCell: (params: any) => {
      return params.value;
    },
  }
];

const UpcomingOB = ({data}: Props) => {
  return (
    <CollapseWrapper
      panelTitle='Upcoming/Ongoing'
      icon={Upcoming}
      contentClassName='p-0'
    >
      <Grid container justifyContent="center" sx={{paddingLeft: 3, paddingRight: 3, paddingBottom: 3}} spacing={{ xs: 1, md: 2 }} columns={{ xs: 12, sm: 6, md: 12 }}>
        {
          data.map((d: any) => {
            return <Grid item xs sm={3} md={3}>
              <LeaveDataCard d={d} />
            </Grid>
          })
        }
      </Grid>
    </CollapseWrapper>
  );
};

export default UpcomingOB;
