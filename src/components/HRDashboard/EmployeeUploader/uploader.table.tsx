import { DataGrid } from '@mui/x-data-grid';

type Props = {
  rows: any[];
  columns: any[];
};

const UploaderTable = ({ rows = [], columns= [] }: Props) => {
  return (
    <DataGrid
      columns={columns}
      rows={rows}
      getRowId={(data) =>
        `${data?.lastName}${data?.firstName}${data.personalContactNumber}`
      }
      autoHeight
      density="compact"
      disableSelectionOnClick
      disableColumnFilter
      hideFooter
    />
  );
};

export default UploaderTable;
