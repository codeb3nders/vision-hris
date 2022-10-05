import { DataGrid } from '@mui/x-data-grid';

type Props = {
  rows: any[];
};

const UploaderTable = ({ rows = [] }: Props) => {
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

const columns: any = [
  {
    field: 'lastName',
    headerName: 'Last Name',
    width: 150,
  },
  {
    field: 'firstName',
    headerName: 'First Name',
    width: 150,
  },
  {
    field: 'middleName',
    headerName: 'Middle Name',
    width: 150,
  },
  {
    field: 'suffix',
    headerName: 'Suffix',
    width: 150,
  },
  {
    field: 'birthDate',
    headerName: 'Birth Date',
    width: 150,
  },
  {
    field: 'gender',
    headerName: 'Gender',
    width: 150,
  },
  {
    field: 'civilStatus',
    headerName: 'Civil Status',
    width: 150,
  },
  {
    field: 'citizenship',
    headerName: 'Citizenship',
    width: 150,
  },
  {
    field: 'personalContactNumber',
    headerName: 'Personal Contact Number',
    width: 150,
  },
  {
    field: 'personalEmail',
    headerName: 'Personal Email',
    width: 150,
  },
];

export default UploaderTable;
