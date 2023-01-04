import { HistoryTwoTone } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { DataGrid, gridClasses, GridColDef } from '@mui/x-data-grid';
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

const History = ({data}: Props) => {
  return (
    <CollapseWrapper
      panelTitle='History'
      icon={HistoryTwoTone}
      contentClassName='p-0'
    >
      <DataGrid
        autoHeight
        disableSelectionOnClick
        sx={{
          [`& .${gridClasses.cell}`]: {
            py: 1,
            wordBreak: "break-word"
          },
        }}
        hideFooter={true}
        getRowHeight={() => 'auto'}
        getRowId={(data) => data.id}
        initialState={{
          columns: {
            columnVisibilityModel: {
              // Hide columns status and traderName, the other columns will remain visible
              status: false,
              // startDate: false,
            },
          },
        }}
        className="data-grid border-0"
        density='compact'
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection={false}
      />
    </CollapseWrapper>
  );
};

export default History;
