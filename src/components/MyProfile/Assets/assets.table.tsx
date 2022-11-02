/* eslint-disable react-hooks/exhaustive-deps */
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import moment from 'moment';
import { useContext, useEffect, useState } from 'react';
import {
  Autocomplete,
  Chip,
  Dialog,
  Divider,
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
import {
  data as _getCompanyAssetsData, dataStatus as _getCompanyAssetsDataStatus, getAllDataAction
} from 'slices/companyAssets';
import ConfirmDelete from 'components/Other/confirm.delete';
import { styled, lighten, darken } from '@mui/system';
import { ASSET_CONDITIONS } from 'constants/Values';

// import { getByEmployeeNoAction, getEmployeeAssetsData, getEmployeeAssetsStatus } from 'slices/assets/getSlice';
// import { deleteAssetAction, getAssetDeleteStatus } from 'slices/assets/deleteSlice';

type Props = {};

export type AssetModel = {
  id: string;
  timestamp: number;
  employeeNo: string;
  companyAssetId: string;
  dateAssigned: Date | null;
  dateReturned: Date | null;
  conditionAssigned: string;
  conditionReturned: string;
  remarks: string;
  companyAssetDetails?: any;
};

export const AssetInitialState = {
  id: '',
  timestamp: 0,
  employeeNo: '',
  companyAssetId: '',
  dateAssigned: null,
  dateReturned: null,
  conditionAssigned: '',
  conditionReturned: '',
  remarks: '',
  companyAssetDetails: {}
};

const GroupHeader = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: '-8px',
  padding: '4px 10px',
  color: theme.palette.primary.main,
  backgroundColor:
    theme.palette.mode === 'light'
      ? lighten(theme.palette.primary.light, 0.85)
      : darken(theme.palette.primary.main, 0.8),
}));

const GroupItems = styled('ul')({
  padding: 0,
});

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
  const [assetData, setAssetData] = useState<AssetModel>(AssetInitialState);
  const [confirmDelete, setConfirmDelete] = useState<{
    row: any;
    status: boolean;
  }>({ row: null, status: false });
  const [isSaving, setIsSaving] = useState<boolean>(false);
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
    !open && setAssetData(AssetInitialState);
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
    asset.id && setAssetData(asset);
    setOpen(true);
  }

  return (
    <div>
      <ConfirmDelete
        open={confirmDelete}
        setOpen={setConfirmDelete}
        handleDelete={handleDelete}
      />
      <AssetDialog setOpen={setOpen} open={open} setRows={setRows} employeeNo={employeeDetails.employeeNo} access_token={access_token} assetData={assetData} isUpdate={isUpdate} isSaving={isSaving} setIsSaving={setIsSaving} />
      <div style={{ width: '100%' }}>
        <div style={{marginBottom: 10}}>
          <AddButton setOpen={setOpen} text='Add Record' />
        </div>
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
          getRowId={(data) => data.id}
        />
      </div>
    </div>
  );
};

const AssetDialog = ({ open, setOpen, setRows, employeeNo, access_token, assetData: data, isUpdate, isSaving, setIsSaving }) => {
  const [newAsset, setNewAsset] = useState<AssetModel>(AssetInitialState);
  const { enums, resetNotif, failed } = useContext(ProfileCtx);
  const dispatch = useDispatch();
  const [assetTypes, setAssetTypes] = useState<any[]>([]);
  const [assetData, setAssetData] = useState<any>([]);
  const assetsDataStatus = useSelector(_getCompanyAssetsDataStatus);
  const assetsData = useSelector(_getCompanyAssetsData);
  console.log({ assetsData });

  useEffect(() => { 
    getCompanyAssets();
  }, [])

  useEffect(() => {
    if (assetsDataStatus !== 'idle') {
      // setAssetTypes(assetsData)
    }
  }, [assetsDataStatus])

  useEffect(() => {
    setAssetData(data);
  }, [data]);

  useEffect(() => {
    if (!open) {
      setNewAsset(AssetInitialState)
      resetNotif()
    }
  }, [open]);

  const getCompanyAssets = async() => {
    await dispatch(getAllDataAction({access_token}))
  }

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
      setIsSaving(true);
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
          const { id, timestamp, companyAssetDetails, ...rest } = newAsset;
          await dispatch(
            createAction({
              body: { ...rest, employeeNo: employeeNo },
              access_token,
            })
          );
        }
      } catch (error: any) {
        console.log(error);
      }
      setOpen(false);
      setNewAsset(AssetInitialState);
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} id="assets-dialog">
      <div className='p-6 flex flex-col gap-4 w-[550px]'>
        <p className='text-md font-bold '>
          <LaptopChromebookTwoTone /> {isUpdate ? 'Update' : 'Assign'}{' '} Asset
        </p>

        <GridWrapper colSize='1'>
          <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
               <Autocomplete
                  id="company-asset-autpcomplete"
                  options={assetTypes.sort((a, b) => -b.assetName.localeCompare(a.assetName))}
                  groupBy={(option:any) => option.assetType}
              getOptionLabel={(option: any) => {
                console.log({ option })
                return option && `${option.assetName} - ${option.assetDetails} (${option.assetSerialNumber})`
                  }}
                  defaultValue={assetData.companyAssetId}
                  renderInput={(params) => <TextField {...params} label="Company Asset" />}
                  onChange={(e: any) => {
                    setNewAsset({ ...newAsset, companyAssetId: e.target.value });
                    isUpdate && setAssetData((prev: any) => ({
                    ...prev,
                    companyAssetId: e.target.value,
                  }));
                  }}
                  renderGroup={(params) => (
                    <li>
                      <GroupHeader>{params.group}</GroupHeader>
                      <GroupItems>{params.children}</GroupItems>
                    </li>
                  )}
                />
          </div>
          </GridWrapper>
        <GridWrapper colSize='2'>
          <div className='col-span-2'>
            <Divider textAlign='left'>
              <Chip label="ASSIGNMENT" />
              </Divider>
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
            <FormControl variant='standard' size='small' fullWidth required>
              <InputLabel id='condition'>Condition</InputLabel>
              <Select
                label='Condition'
                labelId='condition'
                onChange={(e: any) => {
                  setNewAsset({ ...newAsset, conditionAssigned: e.target.value });
                  isUpdate && setAssetData((prev: any) => ({
                  ...prev,
                  conditionAssigned: e.target.value,
                }));
                }}
                defaultValue={assetData.conditionAssigned}
              >
                {ASSET_CONDITIONS.map((o) => {
                  return (
                    <MenuItem key={o} value={o}>
                      {o}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className='col-span-2'>
            <Divider textAlign='left'>
              <Chip label="RETURN" />
              </Divider>
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
          <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
            <FormControl variant='standard' size='small' fullWidth required>
              <InputLabel id='condition'>Condition</InputLabel>
              <Select
                label='Condition'
                labelId='condition'
                onChange={(e: any) => {
                  setNewAsset({ ...newAsset, conditionReturned: e.target.value });
                  isUpdate && setAssetData((prev: any) => ({
                  ...prev,
                  conditionReturned: e.target.value,
                }));
                }}
                defaultValue={assetData.conditionReturned}
              >
                {ASSET_CONDITIONS.map((o) => {
                  return (
                    <MenuItem key={o} value={o}>
                      {o}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
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
            disabled={isSaving}
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
