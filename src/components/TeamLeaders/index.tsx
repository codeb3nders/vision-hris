/* eslint-disable react-hooks/exhaustive-deps */
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { useContext, useEffect, useState } from 'react';
import {
  Alert,
  Autocomplete,
  Badge,
  BadgeProps,
  Card,
  Checkbox,
  FormControlLabel,
  IconButton,
  Snackbar,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import {
  Close,
  Edit,
  Groups,
  SaveTwoTone,
  SupervisorAccount,
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
  data as _getData, dataStatus as _getDataStatus,
  deleteStatus as _getDeleteStatus,
  updateStatus as _getUpdateStatus,
  newDataStatus as _getNewStatus,
  updateAction,
  reset as _getReset
} from 'slices/teamLeader';
import {
  getEmployeeItems as _getEmployeeItems,
  getAllEmployeesAction as _getEmployeesAction,
  getEmployeeStatus as _getEmployeeStatus
} from 'slices/employees/getEmployeesSlice';
import {updateEmployee} from 'slices'
import ConfirmDelete from 'components/Other/confirm.delete';
import { EmployeeDBI, EmployeeI } from 'slices/interfaces/employeeI';
import TeamMembers from './members';
import { INCOMPLETE_FORM_MESSAGE } from 'constants/errors';
import { MainCtx } from 'components/Main';
import moment, { Moment } from 'moment';
import DialogModal from 'CustomComponents/DialogModal';
import { MANAGER, EMPLOYEE, VHO } from 'constants/Values';

type Props = {};

export type TeamLeaderModel = {
  id: string;
  employeeNo: string;
  isDelegated: boolean;
  startDate: Moment | Date;
  remarks?: string;
  fullName?: string;
  department?: string;
  location?: string;
  position?: string;
  isActive: boolean;
  employeeCnt?: number;
  employeeDetails?: any;
};

export const TeamLeaderInitialState = {
  id: "",
  employeeNo: "",
  isDelegated: false,
  startDate: new Date(),
  remarks: "",
  fullName: "",
  department: "",
  location: "",
  position: "",
  isActive: true,
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

const TeamLeaders = (props: Props) => {
  const [rows, setRows] = useState<TeamLeaderModel[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [openMembers, setOpenMembers] = useState<boolean>(false);
  const dispatch = useDispatch();
  const data = useSelector(_getData);
  const dataStatus = useSelector(_getDataStatus);
  const updateStatus = useSelector(_getUpdateStatus);
  const deleteStatus = useSelector(_getDeleteStatus);
  const newStatus = useSelector(_getNewStatus);
  const { access_token } = useContext(AppCtx);
  const [TLdata, setTLdata] = useState<TeamLeaderModel>(TeamLeaderInitialState);
  const [confirmDelete, setConfirmDelete] = useState<{
    row: any;
    status: boolean;
  }>({ row: null, status: false });
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [openNotif, setOpenNotif] = useState<{
    message: string;
    status: boolean;
    severity: any;
  }>({ message: '', status: false, severity: '' });
  const [employees, setEmployees] = useState<EmployeeDBI[]>([])
  const [members, setMembers] = useState<EmployeeDBI[]>([])
  const [TLinfo, setTLinfo] = useState<TeamLeaderModel>(TeamLeaderInitialState);

  const { setIsTable } = useContext(MainCtx);
  const isUpdate = TLdata.id !== "";

  // Employees
  const getEmployeeItems = useSelector(_getEmployeeItems);
  const getEmployeeStatus = useSelector(_getEmployeeStatus);

  useEffect(() => {
    setIsTable(true);
  }, []);

  useEffect(() => {
    if (access_token) {
      dispatch(_getEmployeesAction({ access_token }));
    }
    getData();
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
    if (dataStatus === 'succeeded' && employees.length > 0) {
      setRows(() => {
        return data.map((o: TeamLeaderModel) => {
          const employeeInfo: any = employees.find((e: EmployeeI) => e.employeeNo === o.employeeNo);
          // console.log({employeeInfo})
          const members = employees.filter((e: EmployeeI) => {
            // console.log({o}, {e})
            return e.reportsTo?.employeeNo === o.employeeNo && e.department.name.toLowerCase() === employeeInfo?.department.name.toLowerCase() && JSON.stringify(e.location).toLocaleLowerCase() === JSON.stringify(employeeInfo?.location).toLocaleLowerCase()
          });
          // console.log({employees})
          const employeeCnt = members.length;
          return {
            ...o,
            fullName: employeeInfo ? `${employeeInfo.firstName} ${employeeInfo.lastName}` : "",
            department: employeeInfo ? employeeInfo.department.name : "",
            location: employeeInfo ? employeeInfo.location.map((l:any) => l.name).join(", ") : "",
            position: employeeInfo ? employeeInfo.position.name : "",
            isActive: employeeInfo && employeeInfo.employmentStatus.name,
            employeeCnt: employeeCnt
          }
        })
      });
    }
  }, [dataStatus, employees])

  useEffect(() => {
    if (newStatus === "succeeded" || deleteStatus === 'succeeded' || updateStatus === "succeeded") {
      const message = newStatus === "succeeded" ? "New team leader was successfully registered." : (
        deleteStatus === 'succeeded' ? "Record was successfully deleted." :
          updateStatus === "succeeded" ? "Team Leader was successfully updated." : ""
      )
      success(_getReset(), message)
    }
  }, [newStatus, deleteStatus, updateStatus])
      // console.log({rows})

  useEffect(() => {
    !open && setTLdata(TeamLeaderInitialState);
  }, [open]);

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
  
  const handleView = async (row: TeamLeaderModel) => { 
    // console.log({ row });
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
      <TLDialog setOpen={setOpen} open={open} access_token={access_token} data={TLdata} isUpdate={isUpdate} isSaving={isSaving} setIsSaving={setIsSaving} failed={failed} allData={rows} />
      {openMembers && <TeamMembers setOpen={setOpenMembers} open={openMembers} access_token={access_token} data={members} failed={failed} teamLeader={TLinfo} />}
      
      <Card className="phone:mt-0 desktop:mt-5 desktop:p-2 laptop:mt-5 laptop:p-2">
        <section className="flex desktop:flex-row laptop:flex-row tablet:flex-col phone:flex-col items-center justify-center">
          <div className="flex-1 desktop:text-left laptop:text-left">
            <Typography variant="h5">Team Leaders</Typography>
          </div>
          <div className="flex-1 mb-[16px] desktop:text-right laptop:text-right tablet:text-left phone:text-left">
            <AddButton text='Add Record' cb={() => setOpen(true)} />
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

const TLDialog = ({ open, setOpen, access_token, data, isUpdate, isSaving, setIsSaving, failed, allData }) => {
  const [newData, setNewData] = useState<any>(TeamLeaderInitialState);
  const dispatch = useDispatch();
  const getEmployeeItems = useSelector(_getEmployeeItems);
  const [TLData, setTLData] = useState<any>(TeamLeaderInitialState);
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
    setTLData(data);
  }, [data]);

  useEffect(() => {
    if (!open) {
      setTLData(TeamLeaderInitialState)
    }
  }, [open]);

  const handleSave = async () => {
    const updateEmployees = async(reportsTo) => {
      if (TLData.location.includes(VHO)) {
        await dispatch(
          updateEmployee({
            where: { department: TLData.employeeDetails.department },
            params: {reportsTo },
            access_token,
          })
        );
      } else {
        await dispatch(
          updateEmployee({
            where: {
              department: TLData.employeeDetails.department,
              location: TLData.employeeDetails.department
            },
            params: {reportsTo },
            access_token,
          })
        );
      }
    }
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
    
    // const noConflict = async () => {
    //   //check if an active team leader does not conflict
    //   allData.filter((x:TeamLeaderModel) => x.department?.toLocaleLowerCase() === TLData.department.toLocaleLowerCase() && JSON.stringify(x.location).toLocaleLowerCase() === )
    // }
      //check inputs...
    if (await validateFields() ) {
      setIsSaving(true);
      let userGroup = EMPLOYEE;
      let reportsTo = "";
      if (!TLData.isDelegated && TLData.isActive) {
        userGroup = MANAGER;
        reportsTo = TLData.employeeNo;
      }
      try {
        if (isUpdate) {
          const {id, timestamp, lastModifiedDate, ...rest } = TLData;
          await dispatch(
            updateAction({
              params: {
                id: TLData.id,
                startDate: TLData.startDate,
                isActive: TLData.isActive,
                isDelegated: TLData.isDelegated
              },
              access_token,
            })
          );
          //update employee userGroup
          await dispatch(
            updateEmployee({
              params: { userGroup },
              access_token,
            })
          );
          //update employees with same department and/or location
          updateEmployees(reportsTo);
        } else {
          await dispatch(
            createAction({
              body: { 
                employeeNo: TLData.employeeNo,
                startDate: TLData.startDate,
                isActive: TLData.isActive,
                isDelegated: TLData.isDelegated,
              },
              access_token,
            })
          );
          //update employee userGroup
          await dispatch(
            updateEmployee({
              params: { userGroup: MANAGER },
              access_token,
            })
          );
          //update employees with same department and/or location
          updateEmployees(reportsTo);
        }
      } catch (error: any) {
        console.log(error);
      }
      setOpen(false);
      setNewData(TeamLeaderInitialState);
    }
  };
  
  const TLForm = <div className='px-6 flex flex-col gap-4 min-h-[50vh]'>
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
            label='Effective Date'
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
    </GridWrapper>
    <GridWrapper colSize='2'>
      <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
        <FormControlLabel control={<Checkbox defaultChecked onChange={(e:any) => setTLData({
                ...TLData,
                isActive: e.target.checked
              })} />} label="Is Active" />
      </div>
      <div>
        <FormControlLabel control={<Checkbox onChange={(e:any) => setTLData({
                ...TLData,
                isDelegated: e.target.checked
              })} />} label="Is Delegated" />
      </div>
    </GridWrapper>
    <div className='col-span-1 italic text-xs text-justify'>
      Employees under the same department as above will automatically be updated
    </div>
  </div>
  
  return (
    <DialogModal
      titleIcon={<SupervisorAccount className='mr-2 text-sky-500' />}
      open={open}
      onClose={()=>setOpen(false)}
      id="team-leader-dialog"
      className='w-[500px]'
      title={`${isUpdate ? 'Update' : 'Add'} Team Leader`}
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
              type='button'
              className='col-span-2 px-2 py-1 text-slate-400 hover:text-slate-800'
              onClick={() => setOpen(false)}
            >
            Cancel
            </button>
          </div>
        </div>
      }
      >
      {TLForm}
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
    headerName: 'Status',
    width: 50
  },
  {
    field: 'startDate',
    headerName: 'Start Date',
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
