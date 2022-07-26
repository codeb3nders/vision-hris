import {
  ClearTwoTone,
  EditTwoTone,
  UpcomingTwoTone,
} from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import moment from 'moment';
import { useState } from 'react';
import CollapseWrapper from '../PersonalProfileTab/collapse.wrapper';

type Props = {};

const columns: GridColDef[] = [
  {
    field: 'date',
    headerName: 'Date',
    width: 120,
    renderCell: (params: any) => {
      console.log({ params });

      return params.value;
    },
  },
  {
    field: 'type',
    headerName: 'Type',
    width: 120,
    renderCell: (params: any) => {
      return params.value;
    },
  },
  {
    field: '',
    headerName: 'Actions',
    width: 200,
    renderCell: (params: any) => {
      return (
        <div className='flex flex-row gap-2 text-xs justify-center w-full'>
          <button className='bg-slate-200 hover:bg-slate-300 text-slate-700 px-2 py-1 flex items-center justify-center transition duration-150 ease-in-out rounded-sm'>
            <ClearTwoTone className='text-sm' /> Cancel
          </button>
          <button className='bg-orange-600 hover:bg-orange-700 text-white px-2 py-1 flex items-center justify-center transition duration-150 ease-in-out rounded-sm'>
            <EditTwoTone className='text-sm' /> Update
          </button>
        </div>
      );
    },
  },
];

const initialState = [
  {
    id: 1,
    date: moment().format('LL'),
    type: 'Vacation',
  },
  {
    id: 2,
    date: moment().format('LL'),
    type: 'Sick',
  },
];

const UpcomingLeaves = (props: Props) => {
  const [rows, setRows] = useState<any[]>(initialState);

  return (
    <CollapseWrapper
      panelTitle='Upcoming Leaves'
      icon={UpcomingTwoTone}
      open
      contentClassName='p-0'
    >
      <DataGrid
        autoHeight
        disableSelectionOnClick
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        getRowHeight={() => 'auto'}
        className='border-0'
      />
    </CollapseWrapper>
  );
};

export default UpcomingLeaves;
