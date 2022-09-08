/* eslint-disable react-hooks/exhaustive-deps */
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';
import { useContext, useEffect, useState } from 'react';
import {
  Dialog,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import {
  Delete,
  LaptopChromebookTwoTone,
  SaveTwoTone,
} from '@mui/icons-material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import AddButton from 'CustomComponents/AddButton';
import { ProfileCtx } from '../profile.main';

type Props = {};

type AssetModel = {
  assetName: any;
  assetType: string;
  assetDetails: string;
  assetSerialNumber: string;
  dateAssigned: string;
  dateReturned: string;
  remarks: string;
};

const AssetsTable = (props: Props) => {
  const { setUpdatedDetails, isNew } = useContext(ProfileCtx);
  const [rows, setRows] = useState<AssetModel[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const handleDelete = (params: any) => {
    setRows((prev: any) => {
      const filtered = prev.filter(
        (a: any) => a.assetName !== params.row.assetName
      );
      return filtered;
    });
  };

  useEffect(() => {
    !isNew &&
      rows.length > 0 &&
      setUpdatedDetails((prev: any) => ({ ...prev, assetManagement: rows }));
  }, [rows]);

  return (
    <div>
      <AssetDialog setOpen={setOpen} open={open} setRows={setRows} />
      <div style={{ width: '100%' }}>
        <DataGrid
          autoHeight
          disableSelectionOnClick
          rows={rows}
          columns={columns(handleDelete)}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          getRowHeight={() => 'auto'}
          getRowId={(data) => data.assetName}
        />
      </div>

      <AddButton text='Add Asset' setOpen={setOpen} />
    </div>
  );
};

const initialState = {
  assetName: '',
  assetDetails: '',
  assetSerialNumber: '',
  dateAssigned: '',
  dateReturned: '',
  remarks: '',
  assetType: '',
};

const AssetDialog = ({ open, setOpen, setRows }) => {
  const [newAsset, setNewAsset] = useState<AssetModel>(initialState);
  const { enums } = useContext(ProfileCtx);

  const handleSaveNewAsset = () => {
    setOpen(false);
    setRows((prev: any) => [...prev, newAsset]);
    setNewAsset(initialState);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <div className='p-6 flex flex-col gap-4 w-[350px]'>
        <p className='text-md font-bold '>
          <LaptopChromebookTwoTone /> New Asset
        </p>

        <TextField
          required
          fullWidth
          variant='standard'
          size='small'
          multiline
          label='Asset Name'
          onChange={(e: any) =>
            setNewAsset({ ...newAsset, assetName: e.target.value })
          }
        />

        <TextField
          required
          fullWidth
          variant='standard'
          size='small'
          multiline
          label='Asset Details'
          onChange={(e: any) =>
            setNewAsset({ ...newAsset, assetDetails: e.target.value })
          }
        />

        <FormControl variant='standard' size='small' fullWidth required>
          <InputLabel id='asset-type'>Asset Type</InputLabel>
          <Select
            label='Asset Type'
            labelId='asset-type'
            onChange={(e: any) =>
              setNewAsset({ ...newAsset, assetType: e.target.value })
            }
          >
            {enums.assets.map((asset) => {
              return (
                <MenuItem key={asset.code} value={asset.code}>
                  {asset.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          variant='standard'
          size='small'
          label='Serial #'
          onChange={(e: any) =>
            setNewAsset({ ...newAsset, assetSerialNumber: e.target.value })
          }
        />

        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            label='Date Assigned'
            onChange={(value) =>
              setNewAsset({
                ...newAsset,
                dateAssigned: moment(value).format('LL'),
              })
            }
            value={new Date()}
            renderInput={(params) => (
              <TextField {...params} fullWidth variant='standard' />
            )}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            label='Date Returned'
            onChange={(value) =>
              setNewAsset({
                ...newAsset,
                dateReturned: moment(value).format('LL'),
              })
            }
            value={new Date()}
            renderInput={(params) => (
              <TextField {...params} fullWidth variant='standard' />
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
              !newAsset.assetName ||
              !newAsset.assetDetails ||
              !newAsset.assetSerialNumber ||
              !newAsset.dateAssigned ||
              !newAsset.dateReturned
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
  );
};

const columns: any = (handleDelete: any) => [
  {
    field: 'assetName',
    headerName: 'Asset Name',
    flex: 1,
    renderCell: (params: any) => {
      return params.value;
    },
  },
  {
    field: 'assetType',
    headerName: 'Asset Type',
    flex: 1,
    renderCell: (params: any) => {
      return params.value;
    },
  },
  {
    field: 'assetDetails',
    headerName: 'Asset Details',
    flex: 1,
    renderCell: (params: any) => {
      return params.value;
    },
  },
  {
    field: 'assetSerialNumber',
    headerName: 'Serial #',
    flex: 1,
    renderCell: (params: any) => {
      return params.value;
    },
  },
  {
    field: 'dateAssigned',
    headerName: 'Date Assigned',
    flex: 1,
    renderCell: (params: any) => {
      return params.value;
    },
  },
  {
    field: 'dateReturned',
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
      return (
        <div className='flex flex-row items-center w-full gap-1'>
          <span className='text-xs'>{params.value}</span>
          <div className='flex-1 flex justify-end'>
            <IconButton size='small' onClick={() => handleDelete(params)}>
              <Delete />
            </IconButton>
          </div>
        </div>
      );
    },
  },
];

export default AssetsTable;
