/* eslint-disable react-hooks/exhaustive-deps */
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { useContext, useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Card,
  Dialog,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  AssignmentReturn,
  Delete,
  Edit,
  LaptopChromebookTwoTone,
  SaveTwoTone,
  TransferWithinAStation,
} from '@mui/icons-material';
import AddButton from 'CustomComponents/AddButton';
import GridWrapper from 'CustomComponents/GridWrapper';
import { AppCtx } from 'App';
import { useDispatch, useSelector } from 'react-redux';
import {
  createAction,
  deleteAction,
  getAllDataAction,
  data as _getCompanyAssetsData, dataStatus as _getCompanyAssetsDataStatus,
  deleteStatus as getAssetDeleteStatus,
  updateStatus as getAssetUpdateStatus,
  newDataStatus as getNewAssetStatus,
  updateAction,
  reset as companyAssetsReset
} from 'slices/companyAssets';
import {
  getListOfValues
} from 'slices/enums/enumsSlice'
import {
  createAction as createEmployeeAsset,
  newDataStatus as createEmployeeAssetStatus,
  updateStatus as updateEmployeeAssetStatus,
  updateError as updateEmployeeAssetError,
  newDataError as createEmployeeAssetError,
  reset
} from 'slices/assets';
import ConfirmDelete from 'components/Other/confirm.delete';
import { EmployeeDBI } from 'slices/interfaces/employeeI';
import { ASSET_CONDITIONS } from 'constants/Values';
import { AssetInitialState, AssetModel } from 'components/MyProfile/Assets/assets.table';
import AssetAssignment from './assignment';
import AssetTransfer from './transfer';
import { INCOMPLETE_FORM_MESSAGE } from 'constants/errors';
import { MainCtx } from 'components/Main';
import AssetReturn from './return';

var moment = require('moment-business-days');
type Props = {};

export type CompanyAssetModel = {
  id: string;
  assetName: string;
  assetDetails: string;
  assetType: any;
  assetSerialNumber: string;
  status: string;
  assignedTo?: any;
};

export const CompanyAssetInitialState = {
  id: "",
  assetName: "",
  assetDetails: "",
  assetType: "",
  assetSerialNumber: "",
  status: ""
};

const CompanyAssets = (props: Props) => {
  const [rows, setRows] = useState<CompanyAssetModel[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [openAssignment, setOpenAssignment] = useState<boolean>(false);
  const [openReturn, setOpenReturn] = useState<boolean>(false);
  const dispatch = useDispatch();
  const assetsData = useSelector(_getCompanyAssetsData);
  const assetsDataStatus = useSelector(_getCompanyAssetsDataStatus);
  const updateAssetStatus = useSelector(getAssetUpdateStatus);
  const deleteAssetStatus = useSelector(getAssetDeleteStatus);
  const newAssetStatus = useSelector(getNewAssetStatus);
  const { access_token } = useContext(AppCtx);
  const [assetData, setAssetData] = useState<CompanyAssetModel>(CompanyAssetInitialState);
  const [assignedAssetData, setAssignedAssetData] = useState<AssetModel>(AssetInitialState);
  const [confirmDelete, setConfirmDelete] = useState<{
    row: any;
    status: boolean;
  }>({ row: null, status: false });
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [openTransfer, setOpenTransfer] = useState<boolean>(false);
  const [openNotif, setOpenNotif] = useState<{
    message: string;
    status: boolean;
    severity: any;
  }>({ message: '', status: false, severity: '' });

  const assignAssetStatus = useSelector(createEmployeeAssetStatus);
  const assignReturnStatus = useSelector(updateEmployeeAssetStatus);
  const assignAssetError = useSelector(getNewAssetStatus);
  const assignReturnError = useSelector(updateEmployeeAssetError);
  const { setIsTable } = useContext(MainCtx);
  const isUpdate = assetData.id;

  useEffect(() => {
    getData();
    setIsTable(true);
  }, [])

  useEffect(() => {
    if (assetsDataStatus !== 'idle') {
      setRows(assetsData)
    }
  }, [assetsDataStatus])


  useEffect(() => {
    if (newAssetStatus === "succeeded" || deleteAssetStatus === 'succeeded' || updateAssetStatus === "succeeded") {
      const message = newAssetStatus === "succeeded" ? "New company asset was successfully registered." : (
        deleteAssetStatus === 'succeeded' ? "Record was successfully deleted." :
          updateAssetStatus === "succeeded" ? "Company asset was successfully updated." : ""
      )
      // console.log('xxxxxxxxxxxxxxxxxxx')
      success(companyAssetsReset(), message)
    }
  }, [newAssetStatus, deleteAssetStatus, updateAssetStatus])

  useEffect(() => {
    !open && setAssetData(CompanyAssetInitialState);
  }, [open]);

  useEffect(() => {
    if (assignAssetStatus !== "idle") {
      if (assignAssetStatus === "succeeded") {
        success(reset(), "Asset was successfully assigned.");
        setOpenAssignment(false);
      } else {
        failed(assignAssetError)
      }
    }
  }, [assignAssetStatus])

  useEffect(() => {
    if (assignReturnStatus !== "idle") {
      if (assignReturnStatus === "succeeded") {
        success(reset(), "Asset assignment/return was successfully updated.");
        setOpenReturn(false);
      } 
    }
  }, [assignReturnStatus])

  const getData = async () => {
    await dispatch(getAllDataAction({ access_token }));
  }

  const handleDelete = async (row: CompanyAssetModel) => {
    await dispatch(deleteAction({code: row.id, access_token}))
    setConfirmDelete({ row: null, status: false });
  };

  const handleEdit = async (row: CompanyAssetModel) => {
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

  const handleAssign = async (row: CompanyAssetModel) => {
    setAssignedAssetData({
      ...assignedAssetData,
      companyAssetId: row.id,
      conditionAssigned: row.status
    });
    setOpenAssignment(true);
  }

  const handleReturn = async (row: CompanyAssetModel) => {
    // console.log({row})
    setAssignedAssetData({
      ...assignedAssetData,
      companyAssetId: row.id,
      conditionReturned: row.status,
      id: row.assignedTo?.id
    });
    setOpenReturn(true);
  }

  const handleTransfer = async (row: CompanyAssetModel) => {
    setAssetData(row);
    setOpenTransfer(true);
  }

  const success = (cb: any, message: string) => {
    setOpenNotif({
      message,
      status: true,
      severity: 'success',
    });
    dispatch(cb);
    getData();
    setIsSaving(false);

    setTimeout(() => {
      setOpenNotif({
        message: '',
        status: false,
        severity: '',
      });
    }, 2000)
  };

  const failed = (message: string) => {
    setIsSaving(false);
    setOpenNotif({
      message,
      status: true,
      severity: 'error',
    });
  };
  

  return (
    <>
      <Snackbar
        autoHideDuration={2000}
        open={openNotif.status}
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
      >
        <Alert severity={openNotif.severity}>{openNotif.message}</Alert>
      </Snackbar>
      <ConfirmDelete
        open={confirmDelete}
        setOpen={setConfirmDelete}
        handleDelete={handleDelete}
      />
      <AssetDialog setOpen={setOpen} open={open} access_token={access_token} assetData={assetData} isUpdate={isUpdate} isSaving={isSaving} setIsSaving={setIsSaving} failed={failed} />
      {openAssignment && <AssetAssignment setOpen={setOpenAssignment} open={openAssignment} access_token={access_token} assetData={assignedAssetData} failed={failed} />}
      {openReturn && <AssetReturn setOpen={setOpenReturn} open={openReturn} access_token={access_token} assetData={assignedAssetData} failed={failed} />}
      <AssetTransfer setOpenTransfer={setOpenTransfer} openTransfer={openTransfer} access_token={access_token} assetData={assetData} failed={failed}/>
      <Card className="phone:mt-0 desktop:mt-5 desktop:p-2 laptop:mt-5 laptop:p-2">
        <section className="flex desktop:flex-row laptop:flex-row tablet:flex-col phone:flex-col items-center justify-center">
          <div className="flex-1 desktop:text-left laptop:text-left">
            <Typography variant="h5">Company Assets</Typography>
          </div>
          <div className="flex-1 mb-[16px] desktop:text-right laptop:text-right tablet:text-left phone:text-left">
            <AddButton text='Add Record' cb={() => setOpen(true)} />
          </div>
        </section>
        <DataGrid
          className='data-grid'
          autoHeight
          disableSelectionOnClick
          rows={rows}
          columns={columns(setConfirmDelete, handleEdit, handleAssign, handleReturn, handleTransfer)}
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
      </Card>
    </>
  );
};

const AssetDialog = ({ open, setOpen, access_token, assetData: data, isUpdate, isSaving, setIsSaving, failed }) => {
  const [newAsset, setNewAsset] = useState<any>(CompanyAssetInitialState);
  const dispatch = useDispatch();
  const [assetTypes, setAssetTypes] = useState<any[]>([]);
  const [assetData, setAssetData] = useState<any>(CompanyAssetInitialState);
  const [isAssigned, setIsAssigned] = useState<boolean>(false);
  const [assignedAsset, setAssignedAsset] = useState<AssetModel>(AssetInitialState);
  const {assets} = useSelector(getListOfValues)
// console.log({assets}, "assetsassetsassets")
  useEffect(() => { 
    setAssetTypes(assets)
  }, [assets])

  useEffect(() => {
    setAssetData(data);
  }, [data]);

  useEffect(() => { 
    if (isAssigned && isUpdate) {
      setAssignedAsset({...assignedAsset, companyAssetId: assetData.id})
    }
  }, [isAssigned])

  useEffect(() => {
    if (!open) {
      setNewAsset(CompanyAssetInitialState)
    }
  }, [open]);
// console.log({isUpdate})
  const handleSave = async () => {
    const validateFields = async () => {
        const dialog: any = document.getElementById("company-assets-dialog");
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
          const { id, ...rest } = newAsset;
          await dispatch(
            createAction({
              body: { ...rest },
              access_token,
            })
          );
        }
        if (assignedAsset.employeeNo) {
          const { companyAssetDetails, id, timestamp, ...rest } = assignedAsset;
          await dispatch(
            createEmployeeAsset({
              body: { ...rest },
              access_token,
            })
          );
        }
      } catch (error: any) {
        // console.log(error);
      }
      setOpen(false);
      setNewAsset(CompanyAssetInitialState);
    }
  };
// console.log({assignedAsset})
  return (
    <Dialog open={open} onClose={() => setOpen(false)} id="company-assets-dialog">
      <div className='p-6 flex flex-col gap-4 w-[550px]'>
        <p className='text-md font-bold '>
          <LaptopChromebookTwoTone /> {isUpdate ? 'Update' : 'Add'}{' '} Asset
        </p>

        <GridWrapper colSize='2'>
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
        </GridWrapper>
        <GridWrapper colSize='2'>         
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
            <FormControl variant='standard' size='small' fullWidth required>
              <InputLabel id='condition'>Condition</InputLabel>
              <Select
                label='Condition'
                labelId='condition'
                onChange={(e: any) => {
                  setNewAsset({ ...newAsset, status: e.target.value });
                  isUpdate && setAssetData((prev: any) => ({
                  ...prev,
                  status: e.target.value,
                }));
                }}
                defaultValue={assetData.status}
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
        </GridWrapper>
        <GridWrapper colSize='2'>
          <div className='col-span-2'>
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

const columns: any = (setConfirmDelete: any, handleEdit:any, handleAssign: any, handleReturn, handleTransfer) => [
  {
    field: 'assetType',
    headerName: 'Asset Type',
    flex: 1,
    renderCell: (params: any) => {
      return params.row?.assetType?.name || params.value;
    },
  },
  {
    field: 'assetName',
    headerName: 'Asset Name',
    flex: 1
  },
  {
    field: 'assetDetails',
    headerName: 'Asset Details',
    flex: 1,
    renderCell: (params: any) => {
      return params.value || null;
    },
  },
  {
    field: 'assetSerialNumber',
    headerName: 'Serial #',
    flex: 1,
    renderCell: (params: any) => {
      return params.value || null;
    },
  },
  {
    field: 'assignedTo',
    headerName: 'Assigned To',
    flex: 1,
    renderCell: (params: any) => {
      return params.value && !params.row.assignedTo.dateReturned ? params.row.assignedTo.name : <Button onClick={() => handleAssign(params.row)}>Assign</Button> ;
    },
  },
  {
    field: 'status',
    headerName: 'Condition',
    flex: 1
  },
  {
    field: 'remarks',
    headerName: 'Remarks',
    flex: 1
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 180,
    renderCell: (params: any) => {
      return <div>
        <Tooltip title="Delete Asset">
          <IconButton size='small' disabled={params.row.assignedTo} onClick={() => setConfirmDelete({ row: params.row, status: true })}>
            <Delete />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit Details">
          <IconButton size='small' disabled={params.row.assignedTo} onClick={() => handleEdit(params.row)}>
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title="Return Asset">
          <IconButton size='small' disabled={!params.row.assignedTo || params.row.assignedTo?.dateReturned} onClick={() => handleReturn(params.row)}>
            <AssignmentReturn />
          </IconButton>
        </Tooltip>
        <Tooltip title="Transfer Asset">
          <IconButton size='small' disabled={!params.row.assignedTo || params.row.assignedTo?.dateReturned} onClick={() => handleTransfer(params.row)}>
            <TransferWithinAStation />
          </IconButton>
        </Tooltip>
      </div>
    },
  },
];

export default CompanyAssets;
