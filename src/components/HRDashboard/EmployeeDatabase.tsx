/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Card,
  Button,
  Avatar,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Chip,
} from '@mui/material';
import {
  AddCircleOutlineTwoTone,
  Close,
  EmailTwoTone,
  PhoneIphoneTwoTone,
  Search,
  UploadTwoTone,
} from '@mui/icons-material';
import NewEmployeeProfile from './new.employee.profile';
import { getEmployeesEndpoint } from 'apis/employees';
import { EmployeeI } from 'slices/interfaces/employeeI';
import ViewEmployeeProfile from './view.employee.profile';
import { useLocation } from 'react-router-dom';
import { MainCtx } from 'components/Main';

type Props = {};

export const EmployeeCtx = createContext<any>({});

type DisplayPhotosI = { employeeNo: string; photo: string };

const EmployeeDatabase: React.FC<Props> = () => {
  const location = useLocation();
  const { setIsTable } = useContext(MainCtx);
  const [viewDetails, setViewDetails] = useState<{
    details: any;
    status: boolean;
  }>({
    details: {},
    status: false,
  });

  const [refresh, setRefresh] = useState<boolean>(false);

  const [employees, setEmployees] = useState<EmployeeI[]>([]);
  const [tempEmployees, setTempEmployees] = useState<EmployeeI[]>([]);
  const [open, setOpen] = useState(false);
  const [displayPhotos, setDisplayPhotos] = useState<DisplayPhotosI[]>([]);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    handleGetDisplayPhoto();
    if (location.pathname === '/people/employees') {
      setIsTable(true);
    } else {
      setIsTable(false);
    }
  }, [location]);

  useEffect(() => {
    employees && employees?.length <= 0 && !searchText && getEmployees();
  }, [employees]);

  useEffect(() => {
    if (refresh) {
      setEmployees([]);
      getEmployees();
    }
  }, [refresh]);

  const handleGetDisplayPhoto = () => {
    const local_dps: any = localStorage.getItem('display_photos');
    const dps = JSON.parse(local_dps);

    setDisplayPhotos(dps);
  };

  const getEmployees = async () => {
    try {
      const res = await getEmployeesEndpoint();
      const employees = res.data?.map((r: any) => {
        return { ...r, id: r.employeeNo };
      });
      setTempEmployees(employees);
      setEmployees(employees);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleSearch = () => {
    if (searchText) {
      const search_result = tempEmployees.filter((employee: EmployeeI) => {
        const active = employee.isActive ? 'Active' : 'Inactive';
        const text = searchText?.toLowerCase();
        const employeeNo = employee?.employeeNo?.toLowerCase();
        const email = employee?.personalEmail?.toLowerCase();
        const phone = employee?.personalContactNumber?.toLowerCase();
        const lastName = employee?.lastName?.toLowerCase();
        const firstName = employee?.firstName?.toLowerCase();
        const position = employee?.position?.toLowerCase();
        const rank = employee?.rank?.toLowerCase();
        const department = employee?.department?.toLowerCase();
        // const location = employee?.locations?.toLowerCase();
        const employmentStatus = employee?.employmentStatus?.toLowerCase();
        const reportsTo = employee?.reportsTo?.toLowerCase();
        const isActive = active?.toString()?.toLowerCase();

        return (
          employeeNo?.includes(text) ||
          email?.includes(text) ||
          phone?.includes(text) ||
          lastName?.includes(text) ||
          firstName?.includes(text) ||
          position?.includes(text) ||
          rank?.includes(text) ||
          department?.includes(text) ||
          employmentStatus?.includes(text) ||
          reportsTo?.includes(text) ||
          isActive?.includes(text)
          // location?.includes(text)
        );
      });

      setEmployees(search_result);
    } else {
      setEmployees(tempEmployees);
    }
  };

  const handleSearchOnEnter = (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  useEffect(() => {
    if (!searchText) {
      setEmployees(tempEmployees);
    }
  }, [searchText]);

  return (
    <EmployeeCtx.Provider value={{ setRefresh, employees: tempEmployees }}>
      <NewEmployeeProfile open={open} setOpen={setOpen} />
      <ViewEmployeeProfile
        viewDetails={viewDetails}
        setViewDetails={setViewDetails}
      />

      <Card sx={{ mt: 5, p: 2 }}>
        <section className='flex flex-row mb-4 items-center'>
          <div className='w-1/2'>
            <FormControl variant='outlined' fullWidth size='small'>
              <InputLabel htmlFor='search-employee'>Search Employee</InputLabel>
              <OutlinedInput
                fullWidth
                value={searchText}
                onKeyUp={handleSearchOnEnter}
                id='search-employee'
                onChange={(e: any) => setSearchText(e.target.value)}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      className={searchText ? 'flex' : 'hidden'}
                      aria-label='search employee'
                      edge='end'
                      onClick={() => {
                        setEmployees(tempEmployees);
                        setSearchText('');
                      }}
                    >
                      <Close fontSize='small' />
                    </IconButton>
                    <IconButton
                      aria-label='search employee'
                      edge='end'
                      onClick={handleSearch}
                    >
                      <Search fontSize='small' />
                    </IconButton>
                  </InputAdornment>
                }
                label='Search Employee'
              />
            </FormControl>
          </div>
          <div className='w-1/2 flex flex-row gap-2 items-center justify-end'>
            <Button startIcon={<UploadTwoTone />} sx={{ mr: 1 }}>
              Upload Employee Details
            </Button>
            <Button
              startIcon={<AddCircleOutlineTwoTone />}
              onClick={() => setOpen(true)}
            >
              Add New Employee
            </Button>
          </div>
        </section>

        <section style={{ height: 400, width: '100%' }}>
          <DataGrid
            disableSelectionOnClick
            rows={employees || []}
            columns={columns(setViewDetails, displayPhotos)}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            loading={employees?.length <= 0 && !searchText}
            autoHeight
          />
        </section>
      </Card>
    </EmployeeCtx.Provider>
  );
};

const columns = (setViewDetails: any, displayPhotos: DisplayPhotosI[]) => [
  {
    field: 'personalEmail',
    headerName: 'Email & Viber Number',
    width: 270,
    renderCell: (cell: any) => {
      const employee_dp = displayPhotos.filter(
        (dp) => dp.employeeNo === cell.row.employeeNo
      )[0];

      return (
        <button
          className='p-1 border-0 outline-none m-0 hover:bg-gray-200 w-full rounded-sm'
          onClick={() => setViewDetails({ details: cell.row, status: true })}
        >
          <div className='flex flex-row gap-2 items-center justify-start'>
            <div>
              <Avatar
                src={employee_dp?.photo}
                alt={`${cell.row.firstName} ${cell.row.lastName}`}
                className='w-[36px] h-[36px]'
              />
            </div>
            <div className='whitespace-normal w-full text-start'>
              <div className='text-sky-500'>
                <EmailTwoTone fontSize='small' className='text-[12px] mr-1' />
                {cell.value}
              </div>
              <div className='text-xs text-gray-600'>
                <PhoneIphoneTwoTone
                  fontSize='small'
                  className='text-[12px] mr-1'
                />
                {cell.row.personalContactNumber}
              </div>
            </div>
          </div>
        </button>
      );
    },
  },
  {
    field: 'employeeNo',
    headerName: 'Employee No.',
    width: 100,
    renderCell: (cell) => (
      <span title={cell.value} className='MuiDataGrid-cellContent'>
        {cell.value}
      </span>
    ),
  },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 250,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 250,
  },
  { field: 'position', headerName: 'Position', width: 200 },
  {
    field: 'rank',
    headerName: 'Rank',
    width: 140,
  },
  {
    field: 'department',
    headerName: 'Department',
    width: 250,
    //   renderCell: (cell) => cell,
  },
  {
    field: 'location',
    headerName: 'Location',
    width: 140,
    //   renderCell: (cell) => cell,
  },
  {
    field: 'employmentStatus',
    headerName: 'Employment Status',
    width: 140,
    //   renderCell: (cell) => cell,
  },
  {
    field: 'reportsTo',
    headerName: 'Reports To',
    width: 140,
    //   renderCell: (cell) => cell,
  },
  {
    field: 'isActive',
    headerName: 'Active',
    width: 140,
    renderCell: (cell) => {
      return (
        <Chip
          label={cell.value ? 'Active' : 'Inactive'}
          color={cell.value ? 'success' : 'default'}
        />
      );
    },
  },
];

export default EmployeeDatabase;
