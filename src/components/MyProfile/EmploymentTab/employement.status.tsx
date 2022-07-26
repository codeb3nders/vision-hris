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
  { field: 'effective_date', headerName: 'Effective Date', flex: 1 },
  { field: 'status', headerName: 'Employment Status', flex: 1 },
  {
    field: 'comment',
    headerName: 'Comment',
    type: 'string',
    flex: 1,
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
      <div style={{ minHeight: 300, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          autoHeight
          getRowHeight={() => 'auto'}
        />
      </div>
    </CollapseWrapper>
  );
};

export default EmployementStatus;
