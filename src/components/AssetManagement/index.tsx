/* eslint-disable react-hooks/exhaustive-deps */
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { useContext, useEffect, useState } from 'react';
import {
  Checkbox,
  Dialog,
  FormControl,
  FormControlLabel,
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
import GridWrapper from 'CustomComponents/GridWrapper';
import { AppCtx } from 'App';
import { useDispatch, useSelector } from 'react-redux';
import { INCOMPLETE_FORM_MESSAGE } from 'constants/errors';
import {
  createAction,
  deleteAction,
  getAllDataAction,
  data as _getCompanyAssetsData, dataStatus as _getCompanyAssetsDataStatus,
  deleteStatus as getAssetDeleteStatus,
  updateStatus as getAssetUpdateStatus,
  newDataStatus as getNewAssetStatus,
  updateAction
} from 'slices/companyAssets';
import {
  enumsData,
  enumsData as getEnumsData, status as getEnumsDataStatus
} from 'slices/enums/enumsSlice'
import ConfirmDelete from 'components/Other/confirm.delete';
import { getEmployeeItems as _getEmployeeItems } from 'slices';
import { EmployeeDBI } from 'slices/interfaces/employeeI';
import { ASSET_CONDITIONS } from 'constants/Values';

var moment = require('moment-business-days');
type Props = {};

type CompanyAssetModel = {
  id: string;
  assetName: string;
  assetDetails: string;
  assetType: any;
  assetSerialNumber: string;
  status: string;
};

const initialState = {
  id: "",
  assetName: "",
  assetDetails: "",
  assetType: "",
  assetSerialNumber: "",
  status: ""
};

const AssetManagement = (props: Props) => {
  const [rows, setRows] = useState<CompanyAssetModel[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const enumsData = useSelector(getEnumsData);
  const assetsData = useSelector(_getCompanyAssetsData);
  const assetsDataStatus = useSelector(_getCompanyAssetsDataStatus);
  const employeeUpdateAssetStatus = useSelector(getAssetUpdateStatus);
  const employeeDeleteAssetStatus = useSelector(getAssetDeleteStatus);
  const employeeNewAssetStatus = useSelector(getNewAssetStatus);
  const { access_token } = useContext(AppCtx);
  const [assetData, setAssetData] = useState<CompanyAssetModel>(initialState);
  const [confirmDelete, setConfirmDelete] = useState<{
    row: any;
    status: boolean;
  }>({ row: null, status: false });
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [employees, setEmployees] = useState<EmployeeDBI[]>([]);
  const [assetTypes, setAssetTypes] = useState<any[]>([]);
  const getEmployeeItems = useSelector(_getEmployeeItems);

  const isUpdate = assetData.id;

  useEffect(() => {
    getData();
  }, [])

  useEffect(() => {
    if (assetsDataStatus !== 'idle') {
      setRows(assetsData)
    }
  }, [assetsDataStatus])

  useEffect(() => { 
    setAssetTypes(enumsData.filter((x:any) => x.type == "assetType"))
  }, [enumsData])

  useEffect(() => {
    const employees = [...getEmployeeItems];
    setEmployees(employees.sort((a:any, b:any) => a.lastName.localeCompare(b.lastName)))
  }, [getEmployeeItems])
console.log({assetsData})
  useEffect(() => {
    if (employeeNewAssetStatus === "succeeded" || employeeDeleteAssetStatus === 'succeeded' || employeeUpdateAssetStatus === "succeeded") {
      getData();
    }
  }, [employeeNewAssetStatus, employeeDeleteAssetStatus, employeeUpdateAssetStatus])

  useEffect(() => {
    !open && setAssetData(initialState);
  }, [open]);

  const getData = async () => {
    await dispatch(getAllDataAction({access_token}))
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
console.log({assetData})
  return (
    <div>
      <ConfirmDelete
        open={confirmDelete}
        setOpen={setConfirmDelete}
        handleDelete={handleDelete}
      />
      <AssetDialog setOpen={setOpen} open={open} employees={employees} access_token={access_token} assetData={assetData} isUpdate={isUpdate} isSaving={isSaving} setIsSaving={setIsSaving} />
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

const AssetDialog = ({ open, setOpen, employees, access_token, assetData: data, isUpdate, isSaving, setIsSaving }) => {
  const [newAsset, setNewAsset] = useState<any>(initialState);
  const dispatch = useDispatch();
  const [assetTypes, setAssetTypes] = useState<any[]>([]);
  const [assetData, setAssetData] = useState<any>(initialState);
  const [isAssigned, setIsAssigned] = useState<boolean>(false);
  const enums = useSelector(enumsData)

  useEffect(() => { 
    setAssetTypes(enums.filter((x:any) => x.type.toLocaleLowerCase() === "assettype"))
  }, [enums])

  useEffect(() => {
    setAssetData(data);
  }, [data]);

  useEffect(() => {
    if (!open) {
      setNewAsset(initialState)
    }
  }, [open]);
console.log({isUpdate})
  const handleSave = async () => {
    const validateFields = async () => {
        const dialog: any = document.getElementById("company-assets-dialog");
        const required = dialog.querySelectorAll("[required]");
        let invalidCtr = 0;

        invalidCtr = await Array.from(required)
          .filter((e: any) => !e.value)
          .map((e: any) => e.id).length;

        if (invalidCtr > 0) {
          // return failed(INCOMPLETE_FORM_MESSAGE);
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
      } catch (error: any) {
        console.log(error);
      }
      setOpen(false);
      setNewAsset(initialState);
    }
  };

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
        <GridWrapper colSize='2'>  
          <div className='col-span-2'>
            <FormControlLabel control={<Checkbox onChange={(e:any) => setIsAssigned(e.target.checked)} />} label="Assign to Employee?" />
          </div>
          {isAssigned && <>
          <div className='col-span-2'>
            <FormControl variant='standard' size='small' fullWidth required>
              <InputLabel id='assigned-to'>Assigned To</InputLabel>
              <Select
                label='Assigned To'
                labelId='assigned-to'
                onChange={(e: any) => {
                  // setNewAsset({ ...newAsset, assetType: e.target.value });
                  isUpdate && setAssetData((prev: any) => ({
                  ...prev,
                  assetType: e.target.value,
                }));
                }}
                defaultValue={assetData.assetType}
              >
                {employees.map((employee:EmployeeDBI) => {
                  return (
                    <MenuItem key={employee.employeeNo} value={employee.employeeNo}>
                      {employee.lastName}, {employee.firstName} ({employee.employeeNo})
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
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
                value={assetData.dateAssigned || null}
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
            <FormControl variant='standard' size='small' fullWidth>
              <InputLabel id='condition'>Condition</InputLabel>
              <Select
                label='Condition'
                labelId='condition'
                onChange={(e: any) => {
                //   setNewAsset({ ...newAsset, conditionReturned: e.target.value });
                //   isUpdate && setAssetData((prev: any) => ({
                //   ...prev,
                //   conditionReturned: e.target.value,
                // }));
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
                // setNewAsset({ ...newAsset, remarks: e.target.value });
                isUpdate && setAssetData((prev: any) => ({
                    ...prev,
                    remarks: e.target.value,
                  }));
              }}
              defaultValue={assetData.remarks}
            />
          </div>
            </>
          }
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
    flex: 1,
    // renderCell: (params: any) => {
    //   return `${params.value} - ${params.row.id}`;
    // },
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
    headerName: 'Assigned To',
    flex: 1,
    renderCell: (params: any) => {
      return params.value ? "YES" : "NO";
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

export default AssetManagement;
