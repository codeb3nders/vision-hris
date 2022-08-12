import { DataGrid, GridColDef } from '@mui/x-data-grid';
import moment from 'moment';
import { useState } from 'react';
import {
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { AddTaskTwoTone, AddTwoTone, SaveTwoTone } from '@mui/icons-material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

type Props = {};

type ChecklistModel = {
  id: any | null;
  category: string | null;
  description: string | null;
  url: string | null;
  date_completed: string | null;
};

const dummyRows = [
  {
    id: 1,
    category: 'HR Tasks',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi, totam?',
    url: null,
    date_completed: moment().format('LL'),
  },
  {
    id: 2,
    category: 'IT Setup',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi, totam?',
    url: 'resource@website.com',
    date_completed: moment().format('LL'),
  },
];

const ChecklistTable = (props: Props) => {
  const [rows, setRows] = useState<ChecklistModel[]>(dummyRows);
  const [open, setOpen] = useState<boolean>(false);
  const [newChecklist, setNewChecklist] = useState<ChecklistModel>({
    id: null,
    category: null,
    description: null,
    url: null,
    date_completed: null,
  });

  const columns: GridColDef[] = [
    {
      field: 'category',
      headerName: 'Category',
      flex: 1,
      renderCell: (params: any) => {
        return params.value;
      },
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
      renderCell: (params: any) => {
        return params.value;
      },
    },
    {
      field: 'url',
      headerName: 'URL',
      flex: 1,
      renderCell: (params: any) => {
        return (
          <a
            href={params.value}
            target='_blank'
            rel='noreferrer'
            className='text-sky-500'
          >
            {params.value}
          </a>
        );
      },
    },
    {
      field: 'date_completed',
      headerName: 'Date Completed',
      flex: 1,
      renderCell: (params: any) => {
        return params.value;
      },
    },
  ];

  const handleSaveNewCheclist = () => {
    setOpen(false);
    setRows([...rows, { ...newChecklist, id: rows.length + 1 }]);
    setNewChecklist({
      id: null,
      category: null,
      date_completed: null,
      url: null,
      description: null,
    });
  };

  return (
    <div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <div className='p-6 flex flex-col gap-4 w-[350px]'>
          <p className='text-md font-bold '>
            <AddTaskTwoTone /> New Task
          </p>
          <FormControl variant='standard' size='small' fullWidth required>
            <InputLabel id='cat'>Category</InputLabel>
            <Select
              label='Category'
              labelId='cat'
              onChange={(e: any) =>
                setNewChecklist({ ...newChecklist, category: e.target.value })
              }
            >
              <MenuItem value='HR Tasks'>HR Tasks</MenuItem>
              <MenuItem value='IT Setup'>IT Setup</MenuItem>
            </Select>
          </FormControl>
          <TextField
            required
            fullWidth
            variant='standard'
            size='small'
            multiline
            label='Description'
            onChange={(e: any) =>
              setNewChecklist({ ...newChecklist, description: e.target.value })
            }
          />
          <TextField
            fullWidth
            variant='standard'
            size='small'
            label='URL'
            onChange={(e: any) =>
              setNewChecklist({ ...newChecklist, url: e.target.value })
            }
          />
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label='Date Completed'
              onChange={(value) =>
                setNewChecklist({
                  ...newChecklist,
                  date_completed: moment(value).format('LL'),
                })
              }
              value={new Date()}
              renderInput={(params) => (
                <TextField {...params} fullWidth required variant='standard' />
              )}
            />
          </LocalizationProvider>

          <div className='grid grid-cols-5'>
            <button
              disabled={
                !newChecklist.category ||
                !newChecklist.description ||
                !newChecklist.date_completed
              }
              onClick={handleSaveNewCheclist}
              className='col-span-3 px-2 py-1 bg-green-500 text-white rounded-md w-full flex items-center justify-center hover:bg-green-400 transition duration-150 disabled:bg-slate-300 disabled:text-slate-400 disabled:cursor-not-allowed'
            >
              <SaveTwoTone fontSize='small' className='mr-2' />
              Save Task
            </button>
            <button
              className='col-span-2 px-2 py-1 text-slate-400 hover:text-slate-800'
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Dialog>

      <div className='flex flex-row items-center justify-end mb-4 '>
        <button
          onClick={() => setOpen(true)}
          className='px-2 py-1 bg-sky-500 text-white rounded-md w-[140px] flex items-center justify-center self-end hover:bg-sky-400 transition duration-150'
        >
          <AddTwoTone /> Add Task
        </button>
      </div>

      <div style={{ width: '100%' }}>
        <DataGrid
          autoHeight
          disableSelectionOnClick
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          getRowHeight={() => 'auto'}
        />
      </div>
    </div>
  );
};

export default ChecklistTable;
