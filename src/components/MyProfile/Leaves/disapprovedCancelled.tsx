import { EventBusyTwoTone } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { DataGrid, gridClasses, GridColDef } from '@mui/x-data-grid';
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
    field: 'status',
    headerName: 'Status'
  },
  {
    field: 'leaveReasonOfDisapproval',
    headerName: 'Comments',
    width: 400
  },
];

const DisapprovedCancelled = ({data}: Props) => {
  return (
    <CollapseWrapper
      panelTitle='Disapproved/Cancelled'
      icon={EventBusyTwoTone}
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

export default DisapprovedCancelled;
