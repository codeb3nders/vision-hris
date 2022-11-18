/* eslint-disable react-hooks/exhaustive-deps */
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import moment from 'moment';
import { useContext, useEffect, useState } from 'react';
import {
  Autocomplete,
  Button,
  Chip,
  Dialog,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from '@mui/material';
import {
  AssignmentReturn,
  Close,
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
import { EmployeeCtx } from 'components/HRDashboard/EmployeeDatabase';

// import { getByEmployeeNoAction, getEmployeeAssetsData, getEmployeeAssetsStatus } from 'slices/assets/getSlice';
// import { deleteAssetAction, getAssetDeleteStatus } from 'slices/assets/deleteSlice';

type Props = {};

export type AssetModel = {
  id: string;
  timestamp: number;
  employeeNo: string;
  companyAssetId: string;
  dateAssigned?: Date | null;
  dateReturned?: Date | null;
  conditionAssigned?: string;
  conditionReturned?: string;
  remarks?: string;
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
  const { setUpdatedDetails, employeeDetails } = useContext(ProfileCtx);
  const { isNew } = useContext(EmployeeCtx);
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
  const [isReturn, setIsReturn] = useState<boolean>(false);
  const isUpdate = assetData?.id;

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
    if (!open) {
      setAssetData(AssetInitialState);
      setIsReturn(false);
    }
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

  const handleReturn = async (row: AssetModel) => {
    const asset = rows.filter(
      (t) => t.id === row.id
    )[0];
    asset.id && setAssetData(asset);
    setOpen(true);
    setIsReturn(true);
  }

  return (
    <div>
      <ConfirmDelete
        open={confirmDelete}
        setOpen={setConfirmDelete}
        handleDelete={handleDelete}
      />
      <AssetDialog setOpen={setOpen} open={open} setRows={setRows} employeeNo={employeeDetails.employeeNo} access_token={access_token} assetData={assetData} isUpdate={isUpdate} isSaving={isSaving} setIsSaving={setIsSaving} isReturn={isReturn} />
      <div style={{ width: '100%' }}>
        <div style={{marginBottom: 10}}>
          <AddButton setOpen={setOpen} text='Add Record' />
        </div>
        <DataGrid
          autoHeight
          disableSelectionOnClick
          rows={rows}
          columns={columns(setConfirmDelete, handleEdit, handleReturn)}
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

const AssetDialog = ({ open, setOpen, setRows, employeeNo, access_token, assetData: data, isUpdate, isSaving, setIsSaving, isReturn }) => {
  const [newAsset, setNewAsset] = useState<AssetModel>(AssetInitialState);
  const { enums, resetNotif, failed } = useContext(ProfileCtx);
  const dispatch = useDispatch();
  const [assetTypes, setAssetTypes] = useState<any[]>([]);
  const [assetData, setAssetData] = useState<any>([]);
  const assetsDataStatus = useSelector(_getCompanyAssetsDataStatus);
  const assetsData = useSelector(_getCompanyAssetsData);
  const disabled = data?.dateReturned;

  useEffect(() => { 
    getCompanyAssets();
  }, [])

  useEffect(() => {
    if (assetsDataStatus !== 'idle') {
      const options = assetsData.map((option) => {
        const type = option.assetType.name;
        return {
          type,
          ...option,
        };
      });
      setAssetTypes(options)
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
          const {id, timestamp, lastModifiedDate, assetDetails, ...rest } = assetData;
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
console.log({newAsset}, {assetData}, {assetTypes})
  return (
    <Dialog open={open} onClose={() => setOpen(false)} id="assets-dialog">
      <div className='p-6 flex flex-col gap-4 w-[550px]'>
        <p className='text-md font-bold '>
          <LaptopChromebookTwoTone /> {isReturn ? (disabled ? "Asset Return Details" : 'Return Asset') : (isUpdate ? (disabled ? "Asset Assignment Details" : 'Update Asset') : 'Assign Asset')}{' '}
        </p>
        <div className='cursor-pointer absolute top-[16px] right-[10px] z-10 w-[36px] h-[36px] bg-white/75 rounded-full flex items-center justify-center'>
          <IconButton onClick={() => setOpen(false)}>
            <Close />
          </IconButton>
        </div>

        <GridWrapper colSize='1'>
          <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
               <Autocomplete
                  id="company-asset-autpcomplete"
                  options={assetTypes.sort((a, b) => -b.type.localeCompare(a.type))}
                  getOptionDisabled={(option) => option.assignedTo !== undefined && option.assignedTo.employeeNo !== employeeNo}
                  disabled={isReturn || disabled}
                  groupBy={(option:any) => option.type}
                  getOptionLabel={(option: any) => {
                    console.log({option})
                    if (!isUpdate) {
                      return option && option.assetName ? `${option.assetName} - ${option.assetDetails} (${option.assetSerialNumber})` : "";
                    }
                    return option && option.assetName ? `${option.assetName} - ${option.assetDetails} (${option.assetSerialNumber})` : "";
                  }}
                  defaultValue={assetData.assetDetails}
                  // value={assetData.companyAssetId}
                  renderInput={(params) => <TextField {...params} label="Company Asset" />}
                  onChange={(e: any, newValue: any) => {
                    setNewAsset({ ...newAsset, companyAssetId: newValue.id });
                    isUpdate && setAssetData((prev: any) => ({
                      ...prev,
                      companyAssetId: newValue.id,
                    }));
                  }}
                  renderGroup={(params:any) => (
                    <li key={params.group}>
                      <GroupHeader>{params.group}</GroupHeader>
                      <GroupItems>{params.children}</GroupItems>
                    </li>
                  )}
                />
          </div>
        </GridWrapper>
        
        <GridWrapper colSize='2'>
          {isReturn ? <>
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
                  disabled={disabled}
                  value={newAsset.dateReturned || assetData.dateReturned || null}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth variant='standard' />
                  )}
                />
              </LocalizationProvider>
            </div>
            <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
              <FormControl variant='standard' size='small' fullWidth>
                <InputLabel id='condition'>Condition</InputLabel>
                <Select
                  label='Condition'
                  disabled={disabled}
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
            </div> </>
            : <>
              <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    label='Date Assigned'
                    disabled={disabled}
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
                <FormControl variant='standard' size='small' fullWidth>
                  <InputLabel id='condition'>Condition</InputLabel>
                  <Select
                    label='Condition'
                    disabled={disabled}
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
            </>
          }
          <div className='col-span-2'>
            <TextField
              fullWidth
              variant='standard'
              size='small'
              label='Remarks'
              multiline
              disabled={disabled}
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

        {!disabled &&
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
        }
      </div>
    </Dialog>
  );
};

const columns: any = (setConfirmDelete: any, handleEdit:any, handleReturn:any) => [
  {
    field: 'assetDetails.assetName',
    headerName: 'Asset Name',
    flex: 1,
    renderCell: (params: any) => params.row.assetDetails.assetName
  },
  {
    field: 'assetDetails.assetType',
    headerName: 'Asset Type',
    flex: 1,
    renderCell: (params: any) => params.row.assetDetails.assetType
  },
  {
    field: 'assetDetails.assetDetails',
    headerName: 'Asset Details',
    flex: 1,
    renderCell: (params: any) => params.row.assetDetails.assetDetails
  },
  {
    field: 'assetDetails.assetSerialNumber',
    headerName: 'Serial #',
    flex: 1,
    renderCell: (params: any) => params.row.assetDetails.assetSerialNumber
  },
  {
    field: 'dateAssigned',
    headerName: 'Date Assigned',
    flex: 1,
    renderCell: (params: any) => {
      return params.value && <Button onClick={() => handleEdit(params.row)}>{ moment(params.value).format('MM/DD/YYYY')}</Button>;
    },
  },
  {
    field: 'dateReturned',
    headerName: 'Date Returned',
    flex: 1,
    renderCell: (params: any) => {
      return params.value && <Button onClick={() => handleReturn(params.row)}>{moment(params.value).format('MM/DD/YYYY')}</Button>;
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
    width: 150,
    renderCell: (params: any) => {
      return <div>
        <Tooltip title="Delete Data">
          <IconButton size='small' disabled={params.row.dateReturned} onClick={() => setConfirmDelete({ row: params.row, status: true })}>
            <Delete />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit Assignment Details">
          <IconButton size='small' disabled={params.row.dateReturned} onClick={() => handleEdit(params.row)}>
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title="Return Asset">
          <IconButton size='small' disabled={params.row.dateReturned} onClick={() => handleReturn(params.row)}>
            <AssignmentReturn />
          </IconButton>
        </Tooltip>
      </div>
    },
  },
];

export default AssetsTable;
