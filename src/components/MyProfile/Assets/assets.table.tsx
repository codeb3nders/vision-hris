import { DataGrid, GridColDef } from '@mui/x-data-grid';
import moment from 'moment';
import React, { useState } from 'react';
import {
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import {
  AddTwoTone,
  LaptopChromebookTwoTone,
  SaveTwoTone,
} from '@mui/icons-material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

type Props = {};

type AssetModel = {
  id: any | null;
  category: any;
  description: string | null;
  serial_no: string | null;
  date_assigned: string | null;
  date_returned: string | null;
  remarks: string | null;
};

const dummyRows = [
  {
    id: 1,
    category: 'Category 1',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi, totam?',
    serial_no: '123abcd',
    date_assigned: moment().format('LL'),
    date_returned: moment().format('LL'),
    remarks: 'Sample remarks',
  },
  {
    id: 2,
    category: 'Category 2',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi, totam?',
    serial_no: '123abcd',
    date_assigned: moment().format('LL'),
    date_returned: moment().format('LL'),
    remarks: 'Sample remarks',
  },
];

const AssetsTable = (props: Props) => {
  const [rows, setRows] = useState<AssetModel[]>(dummyRows);
  const [open, setOpen] = useState<boolean>(false);
  const [newAsset, setNewAsset] = useState<AssetModel>({
    id: null,
    category: null,
    description: null,
    serial_no: null,
    date_assigned: null,
    date_returned: null,
    remarks: null,
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
      field: 'serial_no',
      headerName: 'Serial #',
      flex: 1,
      renderCell: (params: any) => {
        return params.value;
      },
    },
    {
      field: 'date_assigned',
      headerName: 'Date Assigned',
      flex: 1,
      renderCell: (params: any) => {
        return params.value;
      },
    },
    {
      field: 'date_returned',
      headerName: 'Date Returned',
      flex: 1,
      renderCell: (params: any) => {
        return params.value;
      },
    },
    {
      field: 'remarks',
      headerName: 'Remarks',
      flex: 1,
      renderCell: (params: any) => {
        return params.value;
      },
    },
  ];

  const handleSaveNewAsset = () => {
    setOpen(false);
    setRows([...rows, { ...newAsset, id: rows.length + 1 }]);
    setNewAsset({
      id: null,
      category: null,
      date_assigned: null,
      date_returned: null,
      description: null,
      remarks: null,
      serial_no: null,
    });
  };

  return (
    <div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <div className='p-6 flex flex-col gap-4 w-[350px]'>
          <p className='text-md font-bold '>
            <LaptopChromebookTwoTone /> New Asset
          </p>
          <FormControl variant='standard' size='small' fullWidth>
            <InputLabel id='cat'>Category</InputLabel>
            <Select
              label='Category'
              labelId='cat'
              onChange={(e: any) =>
                setNewAsset({ ...newAsset, category: e.target.value })
              }
            >
              <MenuItem value='Computer'>Computer</MenuItem>
              <MenuItem value='Monitor'>Monitor</MenuItem>
              <MenuItem value='Office Chair'>Office Chair</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            variant='standard'
            size='small'
            multiline
            label='Description'
            onChange={(e: any) =>
              setNewAsset({ ...newAsset, description: e.target.value })
            }
          />
          <TextField
            fullWidth
            variant='standard'
            size='small'
            label='Serial #'
            onChange={(e: any) =>
              setNewAsset({ ...newAsset, serial_no: e.target.value })
            }
          />
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label='Date Assigned'
              onChange={(value) =>
                setNewAsset({
                  ...newAsset,
                  date_assigned: moment(value).format('LL'),
                })
              }
              value={new Date()}
              renderInput={(params) => (
                <TextField {...params} fullWidth required variant='standard' />
              )}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label='Date Returned'
              onChange={(value) =>
                setNewAsset({
                  ...newAsset,
                  date_returned: moment(value).format('LL'),
                })
              }
              value={new Date()}
              renderInput={(params) => (
                <TextField {...params} fullWidth required variant='standard' />
              )}
            />
          </LocalizationProvider>
          <TextField
            fullWidth
            variant='standard'
            size='small'
            label='Remarks'
            multiline
            onChange={(e: any) =>
              setNewAsset({ ...newAsset, remarks: e.target.value })
            }
          />

          <div className='grid grid-cols-5'>
            <button
              disabled={
                !newAsset.category ||
                !newAsset.description ||
                !newAsset.serial_no ||
                !newAsset.date_assigned ||
                !newAsset.date_returned
              }
              onClick={handleSaveNewAsset}
              className='col-span-3 px-2 py-1 bg-green-500 text-white rounded-md w-full flex items-center justify-center hover:bg-green-400 transition duration-150 disabled:bg-slate-300 disabled:text-slate-400 disabled:cursor-not-allowed'
            >
              <SaveTwoTone fontSize='small' className='mr-2' />
              Save Asset
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
          <AddTwoTone /> Add Asset
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

export default AssetsTable;
