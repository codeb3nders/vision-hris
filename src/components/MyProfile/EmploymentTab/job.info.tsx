/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useMemo, useState } from 'react';
import CollapseWrapper from '../PersonalProfileTab/collapse.wrapper';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import moment from 'moment';
import { EngineeringTwoTone } from '@mui/icons-material';
import { ProfileCtx } from '../profile.main';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import GridWrapper from 'CustomComponents/GridWrapper';
import { USER_GROUP } from 'constants/Values';
import { EmployeeCtx } from 'components/HRDashboard/EmployeeDatabase';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { getEmployeeItems as _getEmployeeItems } from 'slices';
import { useSelector } from 'react-redux';
import { EmployeeI } from 'slices/interfaces/employeeI';

type Props = {};

const columns: GridColDef[] = [
  {
    field: 'dateHired',
    headerName: 'Effective Date',
    width: 120,
    renderCell: (params: any) => {
      return (
        <div className='text-xs p-1'>{moment(params.value).format('LL')}</div>
      );
    },
  },
  {
    field: 'location',
    headerName: 'Location',
    width: 120,
    renderCell: (params: any) => {
      return (
        <div className='text-xs p-1'>
          {params.row.location.map((o: any) => o.name).join(', ')}
        </div>
      );
    },
  },
  {
    field: 'department',
    headerName: 'Department',
    width: 120,
    renderCell: (params: any) => {
      return <div className='text-xs p-1'>{params.row.department}</div>;
    },
  },
  {
    field: 'rank',
    headerName: 'Rank',
    width: 120,
    renderCell: (params: any) => {
      return <div className='text-xs p-1'>{params.row.rank}</div>;
    },
  },
  {
    field: 'position',
    headerName: 'Position',
    width: 120,
    renderCell: (params: any) => {
      return <div className='text-xs p-1'>{params.row.position}</div>;
    },
  },
  {
    field: 'reportsTo',
    headerName: 'Reports To',
    width: 120,
    renderCell: (params: any) => {
      return (
        <div className='text-xs p-1'>{params.row.reportsTo.employeeName}</div>
      );
    },
  },
];

type JobInfoI = {
  dateHired: string;
  location: string;
  department: string;
  rank: string;
  position: string;
  reportsTo: string;
};

const JobInfo = (props: Props) => {
  const [infos, setInfos] = useState<any[]>([]);
  const {
    isNew,
    employeeDetails,
    setEmployeeDetails,
    enums,
    isView,
    setUpdatedDetails,
  } = useContext(ProfileCtx);
  const values = {
    employeeDetails,
    setEmployeeDetails,
    enums,
    isView,
    setUpdatedDetails,
  };

  useEffect(() => {
    setInfos([...infos, employeeDetails]);
  }, [employeeDetails]);

  return (
    <CollapseWrapper
      panelTitle='Personnel Information'
      icon={EngineeringTwoTone}
      contentClassName='p-0'
      open
    >
      {isNew ? (
        <JobInfoFields {...values} />
      ) : (
        <div style={{ width: '100%' }}>
          <DataGrid
            getRowId={(data: any) => `${data?.reportsTo}~${data?.dateHired}`}
            rows={isNew ? [] : infos}
            columns={columns}
            checkboxSelection={false}
            hideFooter={true}
            getRowHeight={() => 'auto'}
            autoHeight
            className='border-0'
          />
        </div>
      )}
    </CollapseWrapper>
  );
};

const JobInfoFields = ({
  employeeDetails,
  setEmployeeDetails,
  enums,
  isView,
  setUpdatedDetails,
}) => {
  const getEmployeeItems = useSelector(_getEmployeeItems);
  const [departments, setDepartments] = useState<any[]>([]);
  const [employmentStatus, setEmploymentStatus] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  const [positions, setPositions] = useState<any[]>([]);
  const [ranks, setRanks] = useState<any[]>([]);
  const [employmentTypes, setEmploymentTypes] = useState<any[]>([]);
  const [isProjectEmployee, setIsProjectEmployee] = useState<boolean>(false);

  useEffect(() => {
    setDepartments(enums.departments);
    setEmploymentStatus(enums.employment_status);
    setLocations(enums.locations);
    setPositions(enums.positions);
    setRanks(enums.ranks);
    setEmploymentTypes(enums.employment_types);
  }, [enums]);

  useEffect(() => {
    if (
      !employeeDetails.employeeNo &&
      employeeDetails.rank &&
      employeeDetails.firstName &&
      employeeDetails.lastName
    ) {
      const firstName = employeeDetails.firstName.split(' ');
      if (employeeDetails.rank.toLowerCase() === 'rank and file') {
        setEmployeeDetails((prev: EmployeeI) => ({
          ...prev,
          companyEmail:
            `${firstName[0]}${employeeDetails.lastName}.vcdcph@gmail.com`.toLowerCase(),
        }));
      } else {
        setEmployeeDetails((prev: EmployeeI) => ({
          ...prev,
          companyEmail:
            `${firstName[0]}.${employeeDetails.lastName}@vcdcph.com`.toLowerCase(),
        }));
      }
    }
  }, [employeeDetails.rank]);
  console.log({ employeeDetails });
  useEffect(() => {
    if (employeeDetails.dateHired && employeeDetails.employmentType) {
      const employement_type = employmentTypes.find(
        (x: any) =>
          x.code.toLowerCase() == employeeDetails.employmentType.toLowerCase()
      );

      if (
        employement_type &&
        employement_type.code.toLowerCase() == 'project'
      ) {
        setIsProjectEmployee(true);
        setEmployeeDetails((prev: EmployeeI) => ({
          ...prev,
          contractEndDate: moment(employeeDetails.dateHired)
            .endOf('day')
            .add(6, 'months')
            .endOf('day'),
          endOfProbationary: null,
        }));
      } else {
        setIsProjectEmployee(false);
        setEmployeeDetails((prev: EmployeeI) => ({
          ...prev,
          endOfProbationary: moment(employeeDetails.dateHired)
            .endOf('day')
            .add(6, 'months')
            .endOf('day'),
          contractEndDate: null,
        }));
      }
    }
  }, [employeeDetails.employmentType, employeeDetails.dateHired]);

  return (
    <GridWrapper colSize='2' className='items-center p-2'>
      <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
        <TextField
          variant='standard'
          label={
            <span>
              Employee Number:{' '}
              <span className='text-xs italic'>
                This is an auto-generated field.
              </span>
            </span>
          }
          disabled
          fullWidth
        />
      </div>
      <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
        <FormControl variant='standard' fullWidth size='small' required>
          <InputLabel id='position'>Position</InputLabel>
          <Select
            id='jobinfo-position'
            labelId='position'
            value={employeeDetails?.position}
            onChange={(e: any) => {
              setEmployeeDetails({
                ...employeeDetails,
                position: e.target.value,
              });
              isView &&
                setUpdatedDetails((prev: any) => ({
                  ...prev,
                  position: e.target.value,
                }));
            }}
          >
            {positions.map((position) => {
              return (
                <MenuItem id={position._id} value={position.code}>
                  {position.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
      <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
        <FormControl variant='standard' fullWidth size='small' required>
          <InputLabel id='department'>Department</InputLabel>
          <Select
            id='jobinfo-department'
            labelId='department'
            value={employeeDetails?.department}
            onChange={(e: any) => {
              setEmployeeDetails({
                ...employeeDetails,
                department: e.target.value,
              });

              isView &&
                setUpdatedDetails((prev: any) => ({
                  ...prev,
                  department: e.target.value,
                }));
            }}
          >
            {departments.map((department) => {
              return (
                <MenuItem value={department.code}>{department.name}</MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>

      <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
        <FormControl variant='standard' fullWidth size='small' required>
          <InputLabel id='location'>Locations</InputLabel>
          <Select
            id='jobinfo-location'
            multiple
            labelId='location'
            value={employeeDetails?.location}
            onChange={(e: any) => {
              setEmployeeDetails({
                ...employeeDetails,
                location: e.target.value,
              });
              isView &&
                setUpdatedDetails((prev: any) => ({
                  ...prev,
                  location: e.target.value,
                }));
            }}
          >
            {locations.map((location) => {
              return (
                <MenuItem
                  id={location._id}
                  key={location._id}
                  value={location.code}
                >
                  {location.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>

      <GridWrapper colSize='4' className='col-span-2'>
        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-3'>
          <FormControl variant='standard' fullWidth size='small' required>
            <InputLabel id='teamleader'>Team Leader</InputLabel>
            <Select
              id='jobinfo-teamleader'
              labelId='teamleader'
              defaultValue={employeeDetails?.reportsTo}
              onChange={(e: any) => {
                setEmployeeDetails({
                  ...employeeDetails,
                  reportsTo: e.target.value,
                });

                isView &&
                  setUpdatedDetails((prev: any) => ({
                    ...prev,
                    reportsTo: e.target.value,
                  }));
              }}
            >
              {getEmployeeItems
                ?.filter(
                  (x: any) =>
                    x.department.code === employeeDetails.department.code
                )
                .map((employee) => {
                  return (
                    <MenuItem
                      id={employee.employeeNo}
                      key={employee.employeeNo}
                      value={employee.employeeNo}
                    >
                      {employee.firstName} {employee.lastName}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </div>

        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-3'>
          <FormControl variant='standard' fullWidth size='small' required>
            <InputLabel id='rank'>Employment Rank</InputLabel>
            <Select
              labelId='rank'
              value={employeeDetails?.rank}
              onChange={(e: any) => {
                setEmployeeDetails({
                  ...employeeDetails,
                  rank: e.target.value,
                });

                isView &&
                  setUpdatedDetails((prev: any) => ({
                    ...prev,
                    rank: e.target.value,
                  }));
              }}
            >
              {ranks.map((rank) => {
                return <MenuItem value={rank.code}>{rank.name}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </div>

        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-3'>
          <FormControl variant='standard' fullWidth size='small' required>
            <InputLabel id='employment_type'>Employment Type</InputLabel>
            <Select
              labelId='employment_type'
              value={employeeDetails?.employmentType}
              onChange={(e: any) => {
                setEmployeeDetails({
                  ...employeeDetails,
                  employmentType: e.target.value,
                });

                isView &&
                  setUpdatedDetails((prev: any) => ({
                    ...prev,
                    employmentType: e.target.value,
                  }));
              }}
            >
              {employmentTypes.map((status) => {
                return <MenuItem value={status.code}>{status.name}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </div>

        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-3'>
          <FormControl variant='standard' fullWidth size='small' required>
            <InputLabel id='employement_status'>Employment Status</InputLabel>
            <Select
              labelId='employement_status'
              value={employeeDetails?.employmentStatus}
              onChange={(e: any) => {
                setEmployeeDetails({
                  ...employeeDetails,
                  employmentStatus: e.target.value,
                });

                isView &&
                  setUpdatedDetails((prev: any) => ({
                    ...prev,
                    employmentStatus: e.target.value,
                  }));
              }}
            >
              {employmentStatus.map((status) => {
                return <MenuItem value={status.code}>{status.name}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </div>
      </GridWrapper>

      <GridWrapper colSize='3' className='col-span-2'>
        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-3'>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label='Date Hired'
              value={employeeDetails?.dateHired || null}
              onChange={(value: any) =>
                setEmployeeDetails((prev: any) => ({
                  ...prev,
                  dateHired: moment(value).format('LL'),
                }))
              }
              renderInput={(params) => (
                <TextField
                  id='date-hired'
                  size='small'
                  {...params}
                  fullWidth
                  required
                  variant='standard'
                />
              )}
            />
          </LocalizationProvider>
        </div>

        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-3'>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label='End of Probation Period'
              value={employeeDetails?.endOfProbationary || null}
              onChange={(value: any) =>
                setEmployeeDetails((prev: any) => ({
                  ...prev,
                  endOfProbationary: moment(value).format('LL'),
                }))
              }
              renderInput={(params) => (
                <TextField
                  id='end-of-probation'
                  size='small'
                  {...params}
                  fullWidth
                  required={!isProjectEmployee}
                  variant='standard'
                />
              )}
            />
          </LocalizationProvider>
        </div>

        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-3'>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label='End of Contract Date (If applicable)'
              value={employeeDetails?.contractEndDate || null}
              onChange={(value: any) =>
                setEmployeeDetails((prev: any) => ({
                  ...prev,
                  contractEndDate: moment(value).format('LL'),
                }))
              }
              renderInput={(params) => (
                <TextField
                  id='end-of-contract'
                  size='small'
                  {...params}
                  fullWidth
                  required={isProjectEmployee}
                  variant='standard'
                />
              )}
            />
          </LocalizationProvider>
        </div>
      </GridWrapper>

      <GridWrapper colSize='3' className='col-span-2'>
        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
          <TextField
            required
            variant='standard'
            label='Company Contact Number'
            fullWidth
            onChange={(e: any) =>
              setEmployeeDetails((prev: EmployeeI) => ({
                ...prev,
                companyContactNumber: e.target.value,
              }))
            }
          />
        </div>

        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
          <TextField
            required
            variant='standard'
            label='Company Email Address'
            fullWidth
            disabled
            value={employeeDetails.companyEmail}
            helperText={
              <span>
                This is an auto-generated email address according to the
                employee's Rank.
              </span>
            }
          />
        </div>

        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
          <FormControl variant='standard' fullWidth size='small' required>
            <InputLabel id='user_group'>User Group</InputLabel>
            <Select
              required
              labelId='user_group'
              value={employeeDetails?.userGroup}
              onChange={(e: any) =>
                setEmployeeDetails({
                  ...employeeDetails,
                  userGroup: e.target.value,
                })
              }
            >
              {USER_GROUP.map((group) => {
                return <MenuItem value={group}>{group}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </div>
      </GridWrapper>
    </GridWrapper>
  );
};

export default React.memo(JobInfo);
