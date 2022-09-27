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
  Edit,
  LaptopChromebookTwoTone,
  SaveTwoTone,
} from '@mui/icons-material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import AddButton from 'CustomComponents/AddButton';
import { ProfileCtx } from '../profile.main';
import GridWrapper from 'CustomComponents/GridWrapper';
import { AppCtx } from 'App';
import { useDispatch, useSelector } from 'react-redux';
import { INCOMPLETE_FORM_MESSAGE } from 'constants/errors';
import { createAssetAction } from 'slices/assets/createSlice';
import { getByEmployeeNoAction, getEmployeeAssetsData, getEmployeeAssetsStatus } from 'slices/assets/getSlice';
import { deleteAssetAction, getAssetDeleteStatus } from 'slices/assets/deleteSlice';

type Props = {};

type AssetModel = {
  assetName: any;
  assetType: any;
  assetDetails: string;
  assetSerialNumber: string;
  dateAssigned: Date | null;
  dateReturned: Date | null;
  remarks: string;
};

const AssetsTable = (props: Props) => {
  const { setUpdatedDetails, isNew, employeeDetails } = useContext(ProfileCtx);
  const [rows, setRows] = useState<AssetModel[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const employeeAssets = useSelector(getEmployeeAssetsData);
  const employeeAssetsStatus = useSelector(getEmployeeAssetsStatus);
  const employeeDeleteAssetStatus = useSelector(getAssetDeleteStatus);
  const { access_token } = useContext(AppCtx);

  useEffect(() => {
    if (employeeAssetsStatus !== "idle") {
      console.log({employeeAssets})
      setRows(employeeAssets)
    }
  }, [employeeAssetsStatus])

  useEffect(() => {
    if (employeeDetails.employeeNo) {
      getData();
    }
  }, [employeeDetails.employeeNo])

  useEffect(() => {
    if (employeeDeleteAssetStatus === "succeeded") {
      getData();
    }
  }, [employeeDeleteAssetStatus])

  const getData = async () => {
    await dispatch(getByEmployeeNoAction({access_token, employeeNo: employeeDetails.employeeNo}))
  }

  const handleDelete = async(id: string) => {
    await dispatch(deleteAssetAction({id, access_token}))
  };

  const handleEdit = async (id?: string) => {
    
  }

  useEffect(() => {
    !isNew &&
      rows.length > 0 &&
      setUpdatedDetails((prev: any) => ({ ...prev, assetManagement: rows }));
      
    rows.length <= 0 &&
      setUpdatedDetails((prev: any) => {
        delete prev?.assetManagement;
        return prev;
      });
  }, [rows]);

  return (
    <div>
      <AssetDialog setOpen={setOpen} open={open} setRows={setRows} employeeNo={employeeDetails.employeeNo} access_token={access_token} />
      <div style={{ width: '100%' }}>
        <DataGrid
          autoHeight
          disableSelectionOnClick
          rows={rows}
          columns={columns(handleDelete, handleEdit)}
          pageSize={30}
          rowsPerPageOptions={[30]}
          hideFooter={true}
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
  dateAssigned: null,
  dateReturned: null,
  remarks: '',
  assetType: "",
};

const AssetDialog = ({ open, setOpen, setRows, employeeNo, access_token }) => {
  const [newAsset, setNewAsset] = useState<AssetModel>(initialState);
  const { enums, resetNotif, failed } = useContext(ProfileCtx);
  const dispatch = useDispatch();
  const [assetTypes, setAssetTypes] = useState<any[]>([]);

  useEffect(() => { 
    setAssetTypes(enums.assets)
  }, [enums])

  useEffect(() => {
    if (!open) {
      setNewAsset(initialState)
      resetNotif()
    }
  }, [open]);
  
  const handleSave = async () => {
    const validateFields = async () => {
        const dialog: any = document.getElementById("assets-dialog");
        const required = dialog.querySelectorAll("[required]");
        let invalidCtr = 0;

        invalidCtr = await Array.from(required)
          .filter((e: any) => !e.value)
          .map((e: any) => e.id).length;

        if (invalidCtr > 0) {
          return failed(INCOMPLETE_FORM_MESSAGE);
        }
        return true;
      }
      //check inputs...
    if (await validateFields()) {
      setRows((prev: any) => [...prev, newAsset]);
      try {
        await dispatch(createAssetAction({ body: {...newAsset, employeeNo: employeeNo}, access_token }));
      } catch (error: any) {
        console.log(error);
      }
      setOpen(false);
      setNewAsset(initialState);
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} id="assets-dialog">
      <div className='p-6 flex flex-col gap-4 w-[550px]'>
        <p className='text-md font-bold '>
          <LaptopChromebookTwoTone /> New Asset
        </p>

        <GridWrapper colSize='2'>
          <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
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
          </div>
          <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
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
          </div>
          <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
            <FormControl variant='standard' size='small' fullWidth required>
              <InputLabel id='asset-type'>Asset Type</InputLabel>
              <Select
                label='Asset Type'
                labelId='asset-type'
                onChange={(e: any) =>
                  setNewAsset({ ...newAsset, assetType: e.target.value })
                }
              >
                {assetTypes.map((asset) => {
                  return (
                    <MenuItem key={asset.code} value={asset.code}>
                      {asset.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
            <TextField
              fullWidth
              variant='standard'
              size='small'
              label='Serial #'
              onChange={(e: any) =>
                setNewAsset({ ...newAsset, assetSerialNumber: e.target.value })
              }
            />
          </div>
          <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label='Date Assigned'
                onChange={(value) =>
                  setNewAsset({
                    ...newAsset,
                    dateAssigned: value,
                  })
                }
                value={newAsset.dateAssigned}
                renderInput={(params) => (
                  <TextField {...params} fullWidth variant='standard' />
                )}
              />
            </LocalizationProvider>
          </div>
          <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label='Date Returned'
                onChange={(value) =>
                  setNewAsset({
                    ...newAsset,
                    dateReturned: value,
                  })
                }
                value={newAsset.dateReturned}
                renderInput={(params) => (
                  <TextField {...params} fullWidth variant='standard' />
                )}
              />
            </LocalizationProvider>
          </div>
          <div className='col-span-2'>
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
          </div>
        </GridWrapper>

        <div className='grid grid-cols-7'>
          <button
            onClick={handleSave}
            className='col-span-5 px-2 py-1 text-xs bg-green-500 text-white rounded-sm w-full flex items-center justify-center hover:bg-green-400 transition duration-150 disabled:bg-slate-300 disabled:text-slate-400 disabled:cursor-not-allowed'
          >
            <SaveTwoTone fontSize='small' className='mr-2' />
            Save
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

const columns: any = (handleDelete: any, handleEdit:any) => [
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
      return params.row?.assetType?.name || params.value;
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
      return params.value && moment(params.value).format('MM/DD/YYYY');
    },
  },
  {
    field: 'dateReturned',
    headerName: 'Date Returned',
    flex: 1,
    renderCell: (params: any) => {
      return params.value && moment(params.value).format('MM/DD/YYYY');
    },
  },
  {
    field: 'remarks',
    headerName: 'Remarks',
    flex: 1
  },
  {
    field: 'actions',
    headerName: 'Actions',
    flex: 1,
    renderCell: (params: any) => {
      return <div>
        <IconButton size='small' onClick={() => handleDelete(params.row?.id)}>
          <Delete />
        </IconButton>
        <IconButton size='small' onClick={() => handleEdit(params.row?.id)}>
          <Edit />
        </IconButton>
      </div>
    },
  },
];

export default AssetsTable;
