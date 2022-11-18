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
  Checkbox,
  Dialog,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import {
  AssignmentReturn,
  Close,
  Delete,
  Edit,
  Groups,
  LaptopChromebookTwoTone,
  SaveTwoTone,
  SupervisorAccount,
  TransferWithinAStation,
} from '@mui/icons-material';
import { styled, useTheme } from '@mui/material/styles';
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
import { EmployeeDBI, EmployeeI } from 'slices/interfaces/employeeI';
import { ASSET_CONDITIONS } from 'constants/Values';
import { AssetInitialState, AssetModel } from 'components/MyProfile/Assets/assets.table';
import TeamMembers from './members';
import { INCOMPLETE_FORM_MESSAGE } from 'constants/errors';
import { MainCtx } from 'components/Main';
import moment, { Moment } from 'moment';
import DialogModal from 'CustomComponents/DialogModal';

type Props = {};

export type TeamLeaderModel = {
  id: string;
  employeeNo: string;
  isDelegated: boolean;
  startDate: Moment | Date;
  endDate: Moment | Date;
  remarks?: string;
  fullName?: string;
  department?: string;
  location?: string;
  position?: string;
  isActive?: string;
  employeeCnt?: number;
};

export const TeamLeaderInitialState = {
  id: "",
  employeeNo: "",
  isDelegated: false,
  startDate: new Date(),
  endDate: moment(new Date()).add(5, 'days'),
  remarks: "",
  fullName: "",
  department: "",
  location: "",
  position: "",
  isActive: "YES",
  employeeCnt: 0
};

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const sampleData: TeamLeaderModel[] = [
  {
    id: "0",
    employeeNo: "0743",
    isDelegated: false,
    startDate: moment("12-09-2019"),
    endDate: moment(new Date()).add(5, 'years')
  },
  {
    id: "1",
    employeeNo: "1213",
    isDelegated: false,
    startDate: moment("05-08-2022"),
    endDate: moment(new Date()).add(5, 'years')
  },
  {
    id: "2",
    employeeNo: "0007",
    isDelegated: false,
    startDate: moment("09-15-2013"),
    endDate: moment(new Date()).add(5, 'years')
  }
]

const TeamLeaders = (props: Props) => {
  const [rows, setRows] = useState<TeamLeaderModel[]>(sampleData);
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
  const [members, setMembers] = useState<EmployeeDBI[]>([])
  const [TLinfo, setTLinfo] = useState<TeamLeaderModel>(TeamLeaderInitialState);

  const assignAssetStatus = useSelector(createEmployeeAssetStatus);
  const assignReturnStatus = useSelector(updateEmployeeAssetStatus);
  const assignAssetError = useSelector(getNewAssetStatus);
  const assignReturnError = useSelector(updateEmployeeAssetError);
  const { setIsTable } = useContext(MainCtx);
  const isUpdate = TLdata.id !== "";

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
        const fullName = `${r.lastName}, ${r.firstName} ${mi}`;
        return { ...r, fullName };
      }))
    }
  }, [getEmployeeStatus])

  useEffect(() => {
    getData();
    setIsTable(true);
  }, [])

  // useEffect(() => {
  //   if (assetsDataStatus !== 'idle') {
  //     setRows(assetsData)
  //   }
  // }, [assetsDataStatus])
console.log({rows}, {employees})
  useEffect(() => { 
    if (employees.length > 0) {
      setRows((prev: TeamLeaderModel[]) => {
        return prev.map((o: TeamLeaderModel) => {
          const employeeInfo = employees.find((e: EmployeeI) => e.employeeNo === o.employeeNo);
          const employeeCnt = employees.filter((e: EmployeeI) => e.reportsTo?.employeeNo === o.employeeNo && e.department.name === o.department && e.location.findIndex((c:any)=> c.name.toLowerCase() === o.location?.toLowerCase()) >= 0).length;
          return {
            ...o,
            fullName: employeeInfo ? `${employeeInfo.firstName} ${employeeInfo.lastName}` : "",
            department: employeeInfo ? employeeInfo.department.name : "",
            location: employeeInfo ? employeeInfo.location.map((l:any) => l.name).join(", ") : "",
            position: employeeInfo ? employeeInfo.position.name : "",
            isActive: employeeInfo && employeeInfo.isActive ? "YES" : "NO",
            employeeCnt: employeeCnt
          }
        })
      });
    }
  }, [employees])


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
    // await dispatch(getAllDataAction({ access_token }));
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
  
  const handleView = async (row: TeamLeaderModel) => { 
    console.log({ row });
    setTLinfo(row);
    setMembers(employees.filter((x: EmployeeDBI) => {
      return x.department.name.toLowerCase() === row.department?.toLowerCase() && x.location.findIndex((c:any)=> c.name.toLowerCase() === row.location?.toLowerCase()) >= 0  && row.employeeNo === x.reportsTo?.employeeNo
    }).sort((a:any, b: any) => a.fullName?.localeCompare(b.fullName)))
    setOpenMembers(true);
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
      {openMembers && <TeamMembers setOpen={setOpenMembers} open={openMembers} access_token={access_token} data={members} failed={failed} teamLeader={TLinfo} />}
      
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
          className="data-grid"
          density='compact'
          autoHeight
          disableSelectionOnClick
          rows={rows}
          columns={columns(handleEdit, handleView)}
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

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const employees = getEmployeeItems
      .filter((x: EmployeeDBI) => x.rank.name.toLocaleLowerCase() !== "rank and file")
      .map((r: EmployeeDBI) => {
        const mi = r.middleName ? r.middleName.charAt(0) : '';
        const fullName = `${r.lastName}, ${r.firstName} ${mi}`;
        return { id: r.employeeNo, label: fullName, department: r.department.name, position: r.position?.name, location: r.location };
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
      setTLData(TeamLeaderInitialState)
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
console.log({TLData})
  return (
    <DialogModal
       className='w-[500px]'
        title={
          <div className='flex items-center content-left'>
            {/* <p className='text-md font-bold '> */}
              <SupervisorAccount /> {isUpdate ? 'Update' : 'Add'}{' '} Team Leader
            {/* </p> */}
            <IconButton
              sx={{ ml: 'auto' }}
              onClick={() => setOpen(false)}
            >
              <Close />
            </IconButton>
          </div>
        }
        open={open}
        actions={
          <div className='mt-4'>
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
        }
      >
      <div className='px-6 flex flex-col gap-4 min-h-[50vh]'>
        <GridWrapper colSize='1'>
          <div className='col-span-1'>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={nonRankAndFileEmployees}
              sx={{ width: "100%" }}
              renderInput={(params) => <TextField {...params} label="Select Employee" variant="standard" />}
              onChange={(e: any, newValue: any) => {
                setTLData({ ...TLData, employeeNo: newValue.id, fullName: newValue.label, department: newValue.department, position: newValue.position, location: newValue.location.map((o:any) => o.name).join(", ") });
              }}
              disabled={isUpdate}
              defaultValue={TLData.fullName}
          />
          </div>
          {TLData.employeeNo && <>
            <div className='col-span-1'>
              <Typography variant="subtitle1" className="text-[11px] text-sky-500">Department</Typography>
              <Typography variant="body2">{TLData.department}</Typography>
              </div>
              <div className='col-span-1'>
              <Typography variant="subtitle1" className="text-[11px] text-sky-500">Location/s</Typography>
              <Typography variant="body2">{TLData.location}</Typography>
            </div>
          </>
          }
        </GridWrapper>
        <GridWrapper colSize='2'>
          <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label='Start Date'
                onChange={(value) => {
                  setTLData({
                    ...TLData,
                    startDate: value
                  })
                }}
                value={TLData.startDate || null}
                renderInput={(params) => (
                  <TextField {...params} fullWidth required variant='standard' />
                )}
              />
            </LocalizationProvider>
          </div>
          <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label='End Date'
                onChange={(value) => {
                  setTLData({
                    ...TLData,
                    endDate: value
                  })
                }}
                value={TLData.endDate || null}
                renderInput={(params) => (
                  <TextField {...params} fullWidth required variant='standard' />
                )}
              />
            </LocalizationProvider>
          </div>
        </GridWrapper>
        <div className='col-span-1'>
          <FormControlLabel control={<Checkbox onChange={(e:any) => setTLData({
                  ...TLData,
                  isDelegated: e.target.checked
                })} />} label="Is Delegated" />
        </div>
        <div className='col-span-1 italic text-xs text-justify'>
          Employees under the same department as above will automatically be updated
        </div>
      </div>
      </DialogModal>
  );
};

const columns: any = (handleEdit:any, handleView:any) => [
  {
    field: 'department',
    headerName: 'Department',
    width: 250
  },
  {
    field: 'location',
    headerName: 'Location',
    width: 200
  },
  {
    field: 'fullName',
    headerName: 'Name',
    width: 200
  },
  {
    field: 'position',
    headerName: 'Position',
    width: 250
  },
  {
    field: 'isDelegated',
    headerName: 'Is Delegated',
    width: 50
  },
  {
    field: 'isActive',
    headerName: 'Is Active',
    width: 50
  },
  {
    field: 'startDate',
    headerName: 'Start Date',
    width: 120,
    renderCell: (params:any)=>moment(params.value).format("L")
  },
  {
    field: 'endDate',
    headerName: 'End Date',
    width: 120,
    renderCell: (params:any)=>moment(params.value).format("L")
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 100,
    renderCell: (params: any) => {
      return <div>
        <Tooltip title="Edit Details">
          <IconButton size='small' disabled={params.row.assignedTo} onClick={() => handleEdit(params.row)}>
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title="Employees">
          <IconButton size='small' onClick={() => handleView(params.row)}>
            <StyledBadge badgeContent={params.row.employeeCnt} color="secondary">
              <Groups />
            </StyledBadge>
          </IconButton>
        </Tooltip>
      </div>
    },
  },
];

export default TeamLeaders;
