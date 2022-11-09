/* eslint-disable react-hooks/exhaustive-deps */
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { useContext, useEffect, useState } from 'react';
import {
  Alert,
  Autocomplete,
  Badge,
  BadgeProps,
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
  Groups,
  LaptopChromebookTwoTone,
  SaveTwoTone,
  SupervisorAccount,
  TransferWithinAStation,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
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
  enumsData,
  enumsData as getEnumsData, status as getEnumsDataStatus
} from 'slices/enums/enumsSlice'
import {
  createAction as createEmployeeAsset,
  newDataStatus as createEmployeeAssetStatus,
  updateStatus as updateEmployeeAssetStatus,
  updateError as updateEmployeeAssetError,
  newDataError as createEmployeeAssetError,
  reset
} from 'slices/assets';
import {
  getEmployeeItems as _getEmployeeItems,
  getAllEmployeesAction as _getEmployeesAction,
  getEmployeeStatus as _getEmployeeStatus
} from 'slices/employees/getEmployeesSlice';
import ConfirmDelete from 'components/Other/confirm.delete';
import { EmployeeDBI } from 'slices/interfaces/employeeI';
import { ASSET_CONDITIONS } from 'constants/Values';
import { AssetInitialState, AssetModel } from 'components/MyProfile/Assets/assets.table';
import TeamMembers from './members';
import { INCOMPLETE_FORM_MESSAGE } from 'constants/errors';
import { MainCtx } from 'components/Main';
import moment, { Moment } from 'moment';

type Props = {};

export type TeamLeaderModel = {
  id: string;
  employeeNo: string;
  isDelegated: boolean;
  startDate: Moment | Date;
  endDate: Moment | Date;
  remarks: string;
  department?: string;
  location?: string;
  position?: string;
  isActive?: boolean;
};

export const TeamLeaderInitialState = {
  id: "",
  employeeNo: "",
  isDelegated: false,
  startDate: new Date(),
  endDate: moment(new Date()).add(5, 'days'),
  remarks: ""
};

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const TeamLeaders = (props: Props) => {
  const [rows, setRows] = useState<TeamLeaderModel[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [openMembers, setOpenMembers] = useState<boolean>(false);
  const dispatch = useDispatch();
  const enumsData = useSelector(getEnumsData);
  const assetsData = useSelector(_getCompanyAssetsData);
  const assetsDataStatus = useSelector(_getCompanyAssetsDataStatus);
  const updateAssetStatus = useSelector(getAssetUpdateStatus);
  const deleteAssetStatus = useSelector(getAssetDeleteStatus);
  const newAssetStatus = useSelector(getNewAssetStatus);
  const { access_token } = useContext(AppCtx);
  const [TLdata, setTLdata] = useState<TeamLeaderModel>(TeamLeaderInitialState);
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
  const [employees, setEmployees] = useState<EmployeeDBI[]>([])

  const assignAssetStatus = useSelector(createEmployeeAssetStatus);
  const assignReturnStatus = useSelector(updateEmployeeAssetStatus);
  const assignAssetError = useSelector(getNewAssetStatus);
  const assignReturnError = useSelector(updateEmployeeAssetError);
  const { setIsTable } = useContext(MainCtx);
  const isUpdate = TLdata.id;

  // Employees
  const getEmployeeItems = useSelector(_getEmployeeItems);
  const getEmployeeStatus = useSelector(_getEmployeeStatus);

  useEffect(() => {
    if (access_token) {
      dispatch(_getEmployeesAction({ access_token, params: { isActive: true } }));
    }
  }, [access_token]);

  useEffect(() => { 
    if (getEmployeeStatus === "succeeded") {
      setEmployees(getEmployeeItems.map((r: EmployeeDBI) => {
        const mi = r.middleName ? r.middleName.charAt(0) : '';
        const full_name = `${r.lastName}, ${r.firstName} ${mi}`;
        return { ...r, full_name };
      }))
    }
  }, [getEmployeeStatus])

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
      console.log('xxxxxxxxxxxxxxxxxxx')
      success(companyAssetsReset(), message)
    }
  }, [newAssetStatus, deleteAssetStatus, updateAssetStatus])

  useEffect(() => {
    !open && setTLdata(TeamLeaderInitialState);
  }, [open]);

  useEffect(() => {
    if (assignAssetStatus !== "idle") {
      if (assignAssetStatus === "succeeded") {
        success(reset(), "Asset was successfully assigned.");
        setOpenMembers(false);
      } else {
        failed(assignAssetError)
      }
    }
  }, [assignAssetStatus])

  const getData = async () => {
    await dispatch(getAllDataAction({ access_token }));
  }

  const handleDelete = async (row: TeamLeaderModel) => {
    await dispatch(deleteAction({code: row.id, access_token}))
    setConfirmDelete({ row: null, status: false });
  };

  const handleEdit = async (row: TeamLeaderModel) => {
    setTLdata(row);
    setOpen(true);
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
  
  const handleView = async () => { 
    
  }

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
      <TLDialog setOpen={setOpen} open={open} access_token={access_token} data={TLdata} isUpdate={isUpdate} isSaving={isSaving} setIsSaving={setIsSaving} failed={failed} />
      {openMembers && <TeamMembers setOpen={setOpenMembers} open={openMembers} access_token={access_token} data={TLdata} failed={failed} />}
      
      <Card className="phone:mt-0 desktop:mt-5 desktop:p-2 laptop:mt-5 laptop:p-2">
        <section className="flex desktop:flex-row laptop:flex-row tablet:flex-col phone:flex-col items-center justify-center">
          <div className="flex-1 desktop:text-left laptop:text-left">
            <Typography variant="h5">Team Leaders</Typography>
          </div>
          <div className="flex-1 mb-[16px] desktop:text-right laptop:text-right tablet:text-left phone:text-left">
            <AddButton setOpen={setOpen} text='Add Record' />
          </div>
        </section>
        <DataGrid
          autoHeight
          disableSelectionOnClick
          rows={rows}
          columns={columns(setConfirmDelete, handleEdit, handleView)}
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

const TLDialog = ({ open, setOpen, access_token, data, isUpdate, isSaving, setIsSaving, failed }) => {
  const [newData, setNewData] = useState<any>(TeamLeaderInitialState);
  const dispatch = useDispatch();
  const getEmployeeItems = useSelector(_getEmployeeItems);
  const [assetTypes, setAssetTypes] = useState<any[]>([]);
  const [TLData, setTLData] = useState<any>(TeamLeaderInitialState);
  const enums = useSelector(enumsData)
  const [nonRankAndFileEmployees, setNonRankAndFileEmployees] = useState<any[]>([]);

  useEffect(() => {
    const employees = getEmployeeItems
      .filter((x: EmployeeDBI) => x.rank.name.toLocaleLowerCase() !== "rank and file")
      .map((r: EmployeeDBI) => {
        const mi = r.middleName ? r.middleName.charAt(0) : '';
        const full_name = `${r.lastName}, ${r.firstName} ${mi}`;
        return { id: r.employeeNo, label: full_name };
      })
    setNonRankAndFileEmployees(employees.sort((a:any, b:any) => a.label.localeCompare(b.label)));
  }, [getEmployeeItems]);

  useEffect(() => { 
    setAssetTypes(enums.filter((x:any) => x.type.toLocaleLowerCase() === "assettype"))
  }, [enums])

  useEffect(() => {
    setTLData(data);
  }, [data]);

  useEffect(() => {
    if (!open) {
      setNewData(TeamLeaderInitialState)
    }
  }, [open]);

  const handleSave = async () => {
    const validateFields = async () => {
        const dialog: any = document.getElementById("team-leader-dialog");
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
          const {id, timestamp, lastModifiedDate, ...rest } = TLData;
          await dispatch(
            updateAction({
              params: {
                id: TLData.id,
                ...rest
              },
              access_token,
            })
          );
        } else {
          const { id, ...rest } = newData;
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
      setNewData(TeamLeaderInitialState);
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} id="team-leader-dialog">
      <div className='p-6 flex flex-col gap-4 w-[550px]'>
        <p className='text-md font-bold '>
          <SupervisorAccount /> {isUpdate ? 'Update' : 'Add'}{' '} Team Leader
        </p>

        <GridWrapper colSize='2'>
          <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
            <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={nonRankAndFileEmployees}
            sx={{ width: "100%" }}
            renderInput={(params) => <TextField {...params} label="Delegated Approver" variant="standard" />}
          />
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
                // setNewAsset({ ...newAsset, assetName: e.target.value });
                // isUpdate && setAssetData((prev: any) => ({
                //   ...prev,
                //   assetName: e.target.value,
                // }));
              }}
              // defaultValue={assetData.assetName}
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
                // setNewAsset({ ...newAsset, assetSerialNumber: e.target.value });
                // isUpdate && setAssetData((prev: any) => ({
                //   ...prev,
                //   assetSerialNumber: e.target.value,
                // }));
              }}
              // defaultValue={assetData.assetSerialNumber}
            />
          </div>
          <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
            <FormControl variant='standard' size='small' fullWidth required>
              <InputLabel id='condition'>Condition</InputLabel>
              <Select
                label='Condition'
                labelId='condition'
                onChange={(e: any) => {
                //   setNewAsset({ ...newAsset, status: e.target.value });
                //   isUpdate && setAssetData((prev: any) => ({
                //   ...prev,
                //   status: e.target.value,
                // }));
                }}
                // defaultValue={assetData.status}
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
                // setNewAsset({ ...newAsset, assetDetails: e.target.value });
                // isUpdate && setAssetData((prev: any) => ({
                //   ...prev,
                //   assetDetails: e.target.value,
                // }));
              }}
              // defaultValue={assetData.assetDetails}
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
    field: 'department',
    headerName: 'Department',
    flex: 1
  },
  {
    field: 'location',
    headerName: 'Location',
    flex: 1,
    // renderCell: (params: any) => {
    //   return params.row?.assetType?.name || params.value;
    // },
  },
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    // renderCell: (params: any) => {
    //   return params.value || null;
    // },
  },
  {
    field: 'position',
    headerName: 'Position',
    flex: 1,
    // renderCell: (params: any) => {
    //   return params.value || null;
    // },
  },
  {
    field: 'isDelegated',
    headerName: 'Is Delegated',
    flex: 1,
    // renderCell: (params: any) => {
    //   return params.value && !params.row.assignedTo.dateReturned ? params.row.assignedTo.name : <Button onClick={() => handleAssign(params.row)}>Assign</Button> ;
    // },
  },
  {
    field: 'isActive',
    headerName: 'Is Active',
    flex: 1,
    // renderCell: (params: any) => {
    //   return params.row.assignedTo && params.row.assignedTo.dateReturned ? params.row.assignedTo.name : "";
    // },
  },
  {
    field: 'startDate',
    headerName: 'Start Date',
    flex: 1
  },
  {
    field: 'endDate',
    headerName: 'End Date',
    flex: 1
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 180,
    renderCell: (params: any) => {
      return <div>
        <Tooltip title="Edit Details">
          <IconButton size='small' disabled={params.row.assignedTo} onClick={() => handleEdit(params.row)}>
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title="Employees">
          <IconButton size='small' onClick={() => handleReturn(params.row)}>
            <StyledBadge badgeContent={4} color="secondary">
              <Groups />
            </StyledBadge>
          </IconButton>
        </Tooltip>
      </div>
    },
  },
];

export default TeamLeaders;
