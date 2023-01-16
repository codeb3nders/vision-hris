/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Card, Button, Link, Tooltip, Checkbox, Avatar, Badge, Snackbar } from '@mui/material';
import {
  AddCircleOutlineTwoTone,
  AdminPanelSettings,
  KeyTwoTone,
  Person,
  SupervisedUserCircleTwoTone,
  SupervisorAccount,
  UploadTwoTone,
  GppGoodOutlined,
} from '@mui/icons-material';
import NewEmployeeProfile from './new.employee.profile';
import {
  getEmployeeItems as _getEmployeeItems,
  getAllEmployeesAction as _getEmployeesAction,
  getEmployeeStatus as _getEmployeeStatus,
  createUserAccess,
  clearHistoryData,
  clearEmployeeDetails,
  userAccess,
} from 'slices';
import { EmployeeDBI } from 'slices/interfaces/employeeI';
import ViewEmployeeProfile from './view.employee.profile';
import { useLocation } from 'react-router-dom';
import { MainCtx } from 'components/Main';
import { AppCtx } from 'App';
import Search from './search';
import EmployeeUploader from './EmployeeUploader/employee.uploader';
import { LoadingButton } from '@mui/lab';
import { URL_USER_CREDENTIALS } from 'constants/EndpointPath';
import { getByParamsEndpoint } from 'apis';
import { getAvatar } from 'utils/functions';
import { VISION_RED } from 'constants/Colors';
import { createCredentialsEndpoint } from 'apis/userAccess';
import { initialState } from 'components/MyProfile/employee.initialstate';
import { getAllDataAction } from 'slices/teamLeader';

type Props = {};

export const EmployeeCtx = createContext<any>({
  // index: '1',
  // setIndex: () => { },
  isNew: false,
  setIsNew: () => { },
});

const EmployeeDatabase: React.FC<Props> = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { access_token } = useContext(AppCtx);
  // const [index, setIndex] = useState<string>('1');
  const [isNew, setIsNew] = useState<boolean>(false);

  // Employees
  const getEmployeeItems = useSelector(_getEmployeeItems);
  const getEmployeeStatus = useSelector(_getEmployeeStatus);

  const { setIsTable } = useContext(MainCtx);
  const [viewDetails, setViewDetails] = useState<{
    employeeDetails: EmployeeDBI;
    status: boolean;
  }>({
    employeeDetails: initialState,
    status: false,
  });
  const [loading, setIsLoading] = useState<boolean>(true);
  const [refresh, setRefresh] = useState<boolean>(true);

  const [employees, setEmployees] = useState<EmployeeDBI[]>([]);
  const [tempEmployees, setTempEmployees] = useState<EmployeeDBI[]>([]);
  const [open, setOpen] = useState(false);
  const [sendAccessList, setSendAccessList] = useState<string[]>([]);

  const [searchText, setSearchText] = useState<string>('');
  const [openUploader, setOpenUploader] = useState(false);
  const [sending, setSending] = useState(false);
  const [userCredentials, setUserCredentials] = useState<any[]>([]);
  const [credentialsCreated, setCredentialsCreated] = useState<boolean>(false);

  useEffect(() => { getUserCredentials() }, [])

  useEffect(() => { 
    if (!open) {
      setIsNew(false);
    }
  }, [open])

  useEffect(() => { 
    if (getEmployeeStatus === "succeeded") {
      const employees = getEmployeeItems.map((r: EmployeeDBI) => {
        const mi = r.middleName ? r.middleName.charAt(0) : '';
        const full_name = `${r.lastName}, ${r.firstName} ${mi}`;
        const withUserCredentials = userCredentials.filter((x: any) => x.employeeNo === r.employeeNo).length > 0;
        return { ...r, id: r.employeeNo, full_name, withUserCredentials };
      });
      // console.log({employees})
      setEmployees(employees);
      setTempEmployees(employees);
      setIsLoading(false);
      setRefresh(false);
    }
  }, [getEmployeeStatus])

  useEffect(() => {
    if (location.pathname === '/people/employees') {
      setIsTable(true);
    } else {
      setIsTable(false);
    }
  }, [location]);

  useEffect(() => {
    if (access_token) {
      getEmployees();
    }
  }, [access_token])

  useEffect(() => {
    if (refresh) {
      getEmployees();
    }
  }, [refresh]);

  const getEmployees = async() => {
    await dispatch(_getEmployeesAction({ access_token, params: { isActive: true } }));
  }

  const getUserCredentials = async () => {
    const config = {
      headers: { Authorization: `Bearer ${access_token}` },
    };
    const { status, data } = await getByParamsEndpoint(URL_USER_CREDENTIALS, config, {});
    if (status === 200) {
      setUserCredentials(data);
    }
  }

  useEffect(() => {
    if (searchText.length <= 0) {
      setEmployees(tempEmployees);
    }
  }, [searchText]);

  useEffect(() => {
    if (!viewDetails.status) {
      dispatch(clearEmployeeDetails());
      dispatch(clearHistoryData());
    }
  }, [viewDetails]);

  const handleSendAccess = async (isChecked:boolean, data:any) => {
    // console.log(data, "vvv")
    if (isChecked) {
      setSendAccessList([...sendAccessList, data])
    } else {
      setSendAccessList(sendAccessList.filter((x:any) => x.employeeNo !== data.employeeNo))
    }
  }
// console.log({sendAccessList})
  const columns = (setViewDetails: any) => [
    {
      field: 'userGroup',
      headerName: '',
      width: 35,
      renderCell: (params: any) => {
        if (params.value.code === "APPROVER") {
          return <Tooltip title={params.value.code}>
          <Badge overlap="circular" badgeContent={<SupervisorAccount color="error" />} anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}>
          <Avatar src={getAvatar(params.row.gender.code)} className='w-[30px] h-[30px]' />
        </Badge></Tooltip>
        } else if (params.value.code === "EMPLOYEE") {
          return <Tooltip title={params.value.code}><Avatar src={getAvatar(params.row.gender.code)} className='w-[30px] h-[30px]' /></Tooltip>
        } else {
          return <Tooltip title={params.value.code}><Badge overlap="circular" badgeContent={<AdminPanelSettings color="error" />} anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}>
          <Avatar src={getAvatar(params.row.gender.code)} className='w-[30px] h-[30px]' />
        </Badge></Tooltip>
        }
      }
    },
    {
      field: 'full_name',
      headerName: 'Employee name',
      width: 200,
      renderCell: (cell) => {
        return (
          <Link
            underline="none"
            variant="button"
            style={{ cursor: 'pointer' }}
            onClick={() =>
              setViewDetails({
                employeeDetails: cell.row,
                status: true
              })
            }
          >
            {cell.value}
          </Link>
        );
      },
      sortComparator: (v1, v2) => v1.localeCompare(v2),
    },
    {
      field: 'employeeNo',
      headerName: 'Employee No.',
      width: 80,
    },
    {
      field: 'position',
      headerName: 'Position',
      width: 200,
      renderCell: (cell: any) => cell.row.position?.name,
      sortComparator: (v1, v2) => v1?.localeCompare(v2),
      valueGetter: (params) => {
        return <Tooltip title={params.row.position?.name}>{params.row.position?.name}</Tooltip>
      },
    },
    {
      field: 'rank',
      headerName: 'Rank',
      width: 120,
      renderCell: (cell: any) => cell.row.rank?.name,
      sortComparator: (v1, v2) => v1.localeCompare(v2),
      valueGetter: (params) => {
        return params.row.rank?.name;
      },
    },
    {
      field: 'department',
      headerName: 'Department',
      width: 100,
      renderCell: (cell) => {
        return (
          <Tooltip title={cell.row?.department?.name || 'Department'}>
            <span>{cell.row?.department?.code}</span>
          </Tooltip>
        );
      },
      sortComparator: (v1, v2) => v1.localeCompare(v2),
      valueGetter: (params) => {
        return params.row.department?.code;
      },
    },
    {
      field: 'location',
      headerName: 'Location',
      // width: 140,
      flex: 1,
      renderCell: (cell) =>
        cell.row.location?.map((o: any) => o.name).join(', '),
      sortable: false,
      valueGetter: (params) => {
        return params.row.location?.map((o: any) => o.name).join(', ');
      },
    },
    {
      field: 'employmentType',
      headerName: 'Employment Type',
      width: 140,
      renderCell: (cell: any) => <div style={{ textAlign: "center" }}>{cell.row.employmentType?.name}</div>,
      sortComparator: (v1, v2) => v1.localeCompare(v2),
      valueGetter: (params) => {
        return params.row.employmentType?.name;
      },
    },
    // {
    //   field: 'employmentStatus',
    //   headerName: 'Employment Status',
    //   width: 140,
    //   renderCell: (cell: any) => cell.row.employmentStatus.name,
    //   sortComparator: (v1, v2) => v1.localeCompare(v2),
    //   valueGetter: (params) => {
    //     return params.row.employmentStatus?.name;
    //   },
    // },
    {
      field: 'reportsTo',
      headerName: 'Team Leader',
      // width: 140,
      flex: 1,
      renderCell: (cell) => cell.row.reportsTo?.employeeName || '',
      sortComparator: (v1, v2) => v1.localeCompare(v2),
      valueGetter: (params) => {
        return params.row.reportsTo?.employeeName || '';
      },
    },
    {
      field: 'withUserCredentials',
      headerName: 'With Access',
      renderCell: (params) => {
        console.log({ params })
        if (params.row.withUserCredentials) {
          return <Checkbox checked disabled />  
        }
        return <Checkbox
          onChange={(e: any) => handleSendAccess(e.target.checked, {employeeNo: params.row.employeeNo, accessGroup: params.row.userGroup.code})}
        />
      }
    },
  ];
  // console.log({ viewDetails })
  const sendCredentials = async () => {
    setSending(true);
    if (sendAccessList.length > 0) {
      Promise.all(
        sendAccessList.map(async (o: any) => {
          return await createCredentialsEndpoint(o)
        })
      ).then((values: any) => {
        setSending(false);
        setSendAccessList([]);
        setCredentialsCreated(true);
      })
    }
  };

  return (
    <EmployeeCtx.Provider value={{ setRefresh, isNew }}>
      <NewEmployeeProfile open={open} setOpen={setOpen} setViewDetails={setViewDetails} viewDetails={viewDetails} />
      { viewDetails.status && <ViewEmployeeProfile
        viewDetails={viewDetails}
        setViewDetails={setViewDetails}
      />
      }
      <Card className="phone:mt-0 desktop:mt-5 desktop:p-2 laptop:mt-5 laptop:p-2">
        <Snackbar
          open={credentialsCreated}
          autoHideDuration={6000}
          onClose={() => setCredentialsCreated(false)}
          message="User Credentials were successfully created and sent to the employees' company email address."
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          className="z-10"
        />
        <section className="flex desktop:flex-row laptop:flex-row tablet:flex-col phone:flex-col items-center justify-center">
          <div className='flex-1 w-full desktop:max-w-[400px] laptop:max-w-[400px] tablet:max-w-full phone:max-w-full relative'>
            <Search setSearchText={setSearchText} searchText={searchText} setEmployees={setEmployees} setIsLoading={setIsLoading} isLoading={loading} userCredentials={userCredentials} />
          </div>
          <div className="flex-1 mb-[16px] desktop:text-right laptop:text-right tablet:text-left phone:text-left">
            <LoadingButton
              onClick={sendCredentials}
              startIcon={<KeyTwoTone />}
              sx={{ mr: 1 }}
              disabled={sendAccessList.length === 0}
              loading={sending}
              loadingPosition="start"
            >
              Send Credentials
            </LoadingButton>
            {/* <Button
              onClick={sendCredentials}
              startIcon={<SupervisedUserCircleTwoTone />}
              sx={{ mr: 1 }}
            >
              Change Team Leader
            </Button> */}

            <Button
              startIcon={<UploadTwoTone />}
              sx={{ mr: 1 }}
              onClick={() => setOpenUploader(true)}
            >
              Upload Employee Details
            </Button>

            <Button
              startIcon={<AddCircleOutlineTwoTone />}
              onClick={() => {
                setOpen(true);
                setIsNew(true);
              }}
              id="add-new-employee-btn"
            >
              Add New Employee
            </Button>
          </div>
        </section>

        <EmployeeUploader open={openUploader} setOpen={setOpenUploader} />

        {/* <div style={{ height: 'auto', width: '100%' }}> */}
        <DataGrid
          components={{ Toolbar: GridToolbar }}
          autoHeight
          className='data-grid'
          density="standard"
          disableSelectionOnClick
          rows={employees}
          columns={columns(setViewDetails)}
          pageSize={30}
          rowsPerPageOptions={[30]}
          checkboxSelection={false}
          loading={loading}
          getRowId={(row: any) => row.employeeNo}
        />
        {/* </div> */}
      </Card>
    </EmployeeCtx.Provider>
  );
};
export default EmployeeDatabase;
