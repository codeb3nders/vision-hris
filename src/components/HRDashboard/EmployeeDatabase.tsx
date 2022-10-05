/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Card, Button, Link, Tooltip } from '@mui/material';
import {
  AddCircleOutlineTwoTone,
  KeyTwoTone,
  SupervisedUserCircleTwoTone,
  UploadTwoTone,
} from '@mui/icons-material';
import NewEmployeeProfile from './new.employee.profile';
import {
  getEmployeeItems as _getEmployeeItems,
  getAllEmployeesAction as _getEmployeesAction,
  getEmployeeStatus as _getEmployeeStatus,
  createUserAccess,
  clearHistoryData,
  clearEmployeeDetails,
} from 'slices';
import { EmployeeDBI } from 'slices/interfaces/employeeI';
import ViewEmployeeProfile from './view.employee.profile';
import { useLocation } from 'react-router-dom';
import { MainCtx } from 'components/Main';
import { AppCtx } from 'App';
import Search from './search';
import { searchEmployeeEndpoint } from 'apis/employees';
import EmployeeUploader from './EmployeeUploader/employee.uploader';

type Props = {};

export const EmployeeCtx = createContext<any>({});

const EmployeeDatabase: React.FC<Props> = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { access_token } = useContext(AppCtx);

  // Employees
  const getEmployeeItems = useSelector(_getEmployeeItems);
  // const getEmployeeStatus = useSelector(_getEmployeeStatus);

  const { setIsTable } = useContext(MainCtx);
  const [viewDetails, setViewDetails] = useState<{
    employeeNo: string;
    status: boolean;
  }>({
    employeeNo: '',
    status: false,
  });
  const [loading, setIsLoading] = useState<boolean>(true);
  const [refresh, setRefresh] = useState<boolean>(false);

  const [employees, setEmployees] = useState<EmployeeDBI[]>([]);
  const [tempEmployees, setTempEmployees] = useState<EmployeeDBI[]>([]);
  const [open, setOpen] = useState(false);
  const [sendAccessList, setSendAccessList] = useState<string[]>([]);

  const [searchText, setSearchText] = useState<string>('');
  const [openUploader, setOpenUploader] = useState(false);

  useEffect(() => {
    if (location.pathname === '/people/employees') {
      setIsTable(true);
    } else {
      setIsTable(false);
    }
  }, [location]);

  useEffect(() => {
    if (access_token) {
      dispatch(_getEmployeesAction({ access_token }));
    }
  }, [access_token, refresh]);

  useEffect(() => {
    const employees = getEmployeeItems.map((r: EmployeeDBI) => {
      const mi = r.middleName ? r.middleName.charAt(0) : '';
      const full_name = `${r.lastName}, ${r.firstName} ${mi}`;
      return { ...r, id: r.employeeNo, full_name };
    });

    setEmployees(employees);
    setTempEmployees(employees);

    setIsLoading(false);
  }, [getEmployeeItems]);

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

  const columns = (setViewDetails: any) => [
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
                employeeNo: cell.row.employeeNo,
                status: true,
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
      sortComparator: (v1, v2) => v1.name.localeCompare(v2.name),
      valueGetter: (params) => {
        return params.row.position?.name;
      },
    },
    {
      field: 'rank',
      headerName: 'Rank',
      width: 120,
      renderCell: (cell: any) => cell.row.rank?.name,
      sortComparator: (v1, v2) => v1.name.localeCompare(v2.name),
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
      sortComparator: (v1, v2) => v1.code.localeCompare(v2.code),
      valueGetter: (params) => {
        return params.row.department?.name;
      },
    },
    {
      field: 'location',
      headerName: 'Location',
      width: 140,
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
      renderCell: (cell: any) => cell.row.employmentType?.name,
      sortComparator: (v1, v2) => v1.name.localeCompare(v2.name),
      valueGetter: (params) => {
        return params.row.employmentType?.name;
      },
    },
    {
      field: 'employmentStatus',
      headerName: 'Employment Status',
      width: 140,
      renderCell: (cell: any) => cell.row.employmentStatus.name,
      sortComparator: (v1, v2) => v1.name.localeCompare(v2.name),
      valueGetter: (params) => {
        return params.row.employmentStatus?.name;
      },
    },
    {
      field: 'reportsTo',
      headerName: 'Team Leader',
      width: 140,
      renderCell: (cell) => cell.row.reportsTo?.employeeName || '',
      sortComparator: (v1, v2) =>
        v1.employeeName.localeCompare(v2.employeeName),
      valueGetter: (params) => {
        return params.row.reportsTo?.employeeName || '';
      },
    },
    // {
    //   field: 'withUserCredentials',
    //   headerName: 'Send Access?',
    //   renderCell: (params) => (
    //     <Checkbox
    //       value={params.row.employeeNo}
    //       onChange={(e: any) => handleSendAccess(e.target.value)}
    //     />
    //   ),
    // },
  ];

  const sendCredentials = async () => {
    if (sendAccessList.length > 0) {
      Promise.all(
        sendAccessList.map(async (employeeNo: string) => {
          await dispatch(
            createUserAccess({ body: { employeeNo }, access_token })
          );
        })
      );
    }
  };

  const handleSearch = async (e: any) => {
    e.preventDefault();
    if (e.key === 'Enter') {
      console.log({ searchText });
      try {
        const res = await searchEmployeeEndpoint({
          name: searchText.toUpperCase(),
          access_token,
        });

        if (res.data.length > 0) {
          const employees = res.data.map((r: EmployeeDBI) => {
            const mi = r.middleName ? r.middleName.charAt(0) : '';
            const full_name = `${r.lastName}, ${r.firstName} ${mi}`;
            return { ...r, id: r.employeeNo, full_name };
          });
          setEmployees(employees);
        } else {
          setEmployees([]);
        }
      } catch (error) {
        console.log('handleSearch error:', error);
      }
    }
  };

  return (
    <EmployeeCtx.Provider value={{ setRefresh }}>
      <NewEmployeeProfile open={open} setOpen={setOpen} />
      <ViewEmployeeProfile
        viewDetails={viewDetails}
        setViewDetails={setViewDetails}
      />

      <Card sx={{ mt: 5, p: 2 }}>
        <section className="flex desktop:flex-row laptop:flex-row tablet:flex-col phone:flex-col items-center justify-center">
          <Search setSearchText={setSearchText} handleSearch={handleSearch} />

          <div className="flex-1 mb-[16px] desktop:text-right laptop:text-right tablet:text-left phone:text-left">
            <Button
              onClick={sendCredentials}
              startIcon={<KeyTwoTone />}
              sx={{ mr: 1 }}
            >
              Send Credentials
            </Button>
            <Button
              onClick={sendCredentials}
              startIcon={<SupervisedUserCircleTwoTone />}
              sx={{ mr: 1 }}
            >
              Change Team Leader
            </Button>

            <Button
              startIcon={<UploadTwoTone />}
              sx={{ mr: 1 }}
              onClick={() => setOpenUploader(true)}
            >
              Upload Employee Details
            </Button>

            <Button
              startIcon={<AddCircleOutlineTwoTone />}
              onClick={() => setOpen(true)}
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
          density="compact"
          disableSelectionOnClick
          onSelectionModelChange={(ids: any[]) => {
            setSendAccessList(ids);
          }}
          rows={employees}
          columns={columns(setViewDetails)}
          pageSize={30}
          rowsPerPageOptions={[30]}
          checkboxSelection={true}
          loading={loading}
          getRowId={(row: any) => row.employeeNo}
        />
        {/* </div> */}
      </Card>
    </EmployeeCtx.Provider>
  );
};
export default EmployeeDatabase;
