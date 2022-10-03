/* eslint-disable react-hooks/exhaustive-deps */
import { DataGrid, gridClasses } from '@mui/x-data-grid';
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
import {
  createAction,
  deleteAction,
  getByEmployeeNoAction,
  data as getAssetsData, dataStatus as getAssetsDataStatus,
  deleteStatus as getAssetDeleteStatus,
  updateStatus as getAssetUpdateStatus,
  newDataStatus as getNewAssetStatus,
  updateAction
} from 'slices/assets';
import ConfirmDelete from 'components/Other/confirm.delete';
// import { getByEmployeeNoAction, getEmployeeAssetsData, getEmployeeAssetsStatus } from 'slices/assets/getSlice';
// import { deleteAssetAction, getAssetDeleteStatus } from 'slices/assets/deleteSlice';

type Props = {};

type AssetModel = {
  id?: string;
  assetName: any;
  assetType: any;
  assetDetails: string;
  assetSerialNumber: string;
  dateAssigned: Date | null;
  dateReturned: Date | null;
  remarks: string;
};

const initialState = {
  id: '',
  assetName: '',
  assetDetails: '',
  assetSerialNumber: '',
  dateAssigned: null,
  dateReturned: null,
  remarks: '',
  assetType: "",
};

const AssetsTable = (props: Props) => {
  const { setUpdatedDetails, isNew, employeeDetails } = useContext(ProfileCtx);
  const [rows, setRows] = useState<AssetModel[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const employeeAssets = useSelector(getAssetsData);
  const employeeAssetsStatus = useSelector(getAssetsDataStatus);
  const employeeUpdateAssetStatus = useSelector(getAssetUpdateStatus);
  const employeeDeleteAssetStatus = useSelector(getAssetDeleteStatus);
  const employeeNewAssetStatus = useSelector(getNewAssetStatus);
  const { access_token } = useContext(AppCtx);
  const [assetData, setAssetData] = useState<AssetModel>(initialState);
  const [confirmDelete, setConfirmDelete] = useState<{
    row: any;
    status: boolean;
  }>({ row: null, status: false });
  const isUpdate = assetData.id;

  useEffect(() => {
    if (employeeAssetsStatus !== "idle") {
      setRows(employeeAssets)
    }
  }, [employeeAssetsStatus])

  useEffect(() => {
    if (employeeDetails.employeeNo) {
      getData();
    }
  }, [employeeDetails.employeeNo])

  useEffect(() => {
    if (employeeNewAssetStatus === "succeeded" || employeeDeleteAssetStatus === 'succeeded' || employeeUpdateAssetStatus === "succeeded") {
      getData();
    }
  }, [employeeNewAssetStatus, employeeDeleteAssetStatus, employeeUpdateAssetStatus])

  useEffect(() => {
    !open && setAssetData(initialState);
  }, [open]);

  const getData = async () => {
    await dispatch(getByEmployeeNoAction({access_token, employeeNo: employeeDetails.employeeNo}))
  }

  const handleDelete = async (row: AssetModel) => {
    await dispatch(deleteAction({id: row.id, access_token}))
    setConfirmDelete({ row: null, status: false });
  };

  const handleEdit = async (row: AssetModel) => {
    const asset = rows.filter(
      (t) => t.id === row.id
    )[0];
    asset.id && setAssetData(() => {
      return {
        ...asset,
        assetType: asset.assetType.code
      }
    });
    setOpen(true);
  }

  return (
    <div>
      <ConfirmDelete
        open={confirmDelete}
        setOpen={setConfirmDelete}
        handleDelete={handleDelete}
      />
      <AssetDialog setOpen={setOpen} open={open} setRows={setRows} employeeNo={employeeDetails.employeeNo} access_token={access_token} assetData={assetData} isUpdate={isUpdate} />
      <div style={{ width: '100%' }}>
        <DataGrid
          autoHeight
          disableSelectionOnClick
          rows={rows}
          columns={columns(setConfirmDelete, handleEdit)}
          sx={{
            [`& .${gridClasses.cell}`]: {
              py: 1,
              wordBreak: "break-word"
            },
          }}
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

const AssetDialog = ({ open, setOpen, setRows, employeeNo, access_token, assetData: data, isUpdate }) => {
  const [newAsset, setNewAsset] = useState<AssetModel>(initialState);
  const { enums, resetNotif, failed } = useContext(ProfileCtx);
  const dispatch = useDispatch();
  const [assetTypes, setAssetTypes] = useState<any[]>([]);
  const [assetData, setAssetData] = useState<any>(initialState);

  useEffect(() => { 
    setAssetTypes(enums.assets)
  }, [enums])

  useEffect(() => {
    setAssetData(data);
  }, [data]);

  useEffect(() => {
    if (!open) {
      setNewAsset(initialState)
      resetNotif()
    }
  }, [open]);
  console.log({assetData}, {newAsset})
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
      try {
        if (isUpdate) {
          const {id, timestamp, lastModifiedDate, ...rest } = assetData;
          await dispatch(
            updateAction({
              params: {
                id: assetData.id,
                ...rest
              },
              access_token,
            })
          );
        } else {
          delete newAsset.id;
          await dispatch(
            createAction({
              body: { ...newAsset, employeeNo: employeeNo },
              access_token,
            })
          );
        }
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
          <LaptopChromebookTwoTone /> {isUpdate ? 'Update' : 'Add'}{' '} Asset
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
              onChange={(e: any) => { 
                setNewAsset({ ...newAsset, assetName: e.target.value });
                isUpdate && setAssetData((prev: any) => ({
                  ...prev,
                  assetName: e.target.value,
                }));
              }}
              defaultValue={assetData.assetName}
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
              onChange={(e: any) => {
                setNewAsset({ ...newAsset, assetDetails: e.target.value });
                isUpdate && setAssetData((prev: any) => ({
                  ...prev,
                  assetDetails: e.target.value,
                }));
              }}
              defaultValue={assetData.assetDetails}
            />
          </div>
          <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
            <FormControl variant='standard' size='small' fullWidth required>
              <InputLabel id='asset-type'>Asset Type</InputLabel>
              <Select
                label='Asset Type'
                labelId='asset-type'
                onChange={(e: any) => {
                  setNewAsset({ ...newAsset, assetType: e.target.value });
                  isUpdate && setAssetData((prev: any) => ({
                  ...prev,
                  assetType: e.target.value,
                }));
                }}
                defaultValue={assetData.assetType}
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
              onChange={(e: any) => {
                setNewAsset({ ...newAsset, assetSerialNumber: e.target.value });
                isUpdate && setAssetData((prev: any) => ({
                  ...prev,
                  assetSerialNumber: e.target.value,
                }));
              }}
              defaultValue={assetData.assetSerialNumber}
            />
          </div>
          <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label='Date Assigned'
                onChange={(value) => {
                  setNewAsset({
                    ...newAsset,
                    dateAssigned: value,
                  });
                  isUpdate && setAssetData((prev: any) => ({
                    ...prev,
                    dateAssigned: value,
                  }));
                }}
                value={newAsset.dateAssigned || assetData.dateAssigned || null}
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
                onChange={(value) => {
                  setNewAsset({
                    ...newAsset,
                    dateReturned: value,
                  });
                  isUpdate && setAssetData((prev: any) => ({
                    ...prev,
                    dateReturned: value,
                  }));
                }}
                value={newAsset.dateReturned || assetData.dateReturned || null}
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
              onChange={(e: any) => {
                setNewAsset({ ...newAsset, remarks: e.target.value });
                isUpdate && setAssetData((prev: any) => ({
                    ...prev,
                    remarks: e.target.value,
                  }));
              }}
              defaultValue={assetData.remarks}
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

const columns: any = (setConfirmDelete: any, handleEdit:any) => [
  {
    field: 'assetName',
    headerName: 'Asset Name',
    flex: 1,
    // renderCell: (params: any) => {
    //   return `${params.value} - ${params.row.id}`;
    // },
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
        <IconButton size='small' onClick={() => setConfirmDelete({ row: params.row, status: true })}>
          <Delete />
        </IconButton>
        <IconButton size='small' onClick={() => handleEdit(params.row)}>
          <Edit />
        </IconButton>
      </div>
    },
  },
];

export default AssetsTable;
