import { WorkHistoryTwoTone } from '@mui/icons-material';
import CollapseWrapper from '../PersonalProfileTab/collapse.wrapper';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import moment from 'moment';

type Props = {};

export const employment_status = [
  'Regular',
  'Probationary',
  'Project Employee',
];

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'effective_date', headerName: 'Effective Date', width: 130 },
  { field: 'status', headerName: 'Employment Status', width: 160 },
  {
    field: 'comment',
    headerName: 'Comment',
    type: 'string',
    width: 130,
  },
];

const rows = [
  {
    id: 1,
    effective_date: moment().format('LL'),
    status: employment_status[0],
    comment: '',
  },
  {
    id: 2,
    effective_date: moment().format('LL'),
    status: employment_status[2],
    comment: '',
  },
  {
    id: 2,
    effective_date: moment().format('LL'),
    status: employment_status[1],
    comment: '',
  },
];

const EmployementStatus = (props: Props) => {
  return (
    <CollapseWrapper panelTitle='Employment Status' icon={WorkHistoryTwoTone}>
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

export default EmployementStatus;
