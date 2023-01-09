/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import CollapseWrapper from '../PersonalProfileTab/collapse.wrapper';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import moment, { Moment } from 'moment';
import {
  EditTwoTone,
  EngineeringTwoTone,
  PersonTwoTone,
  SaveTwoTone,
} from '@mui/icons-material';
import { ProfileCtx } from '../profile.main';
import {
  Button,
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import GridWrapper from 'CustomComponents/GridWrapper';
import { JOB_HISTORY_TYPE, USER_GROUP } from 'constants/Values';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import {
  getEmployeeItems as _getEmployeeItems,
  getEmployeeUpdateStatus as _getEmployeeUpdateStatus,
  getEmployeeUpdateError as _getEmployeeUpdateError,
  getOneEmployeeAction as _getOneEmployeeAction,
  resetUpdate, updateEmployee, filteredEmployeeStore
} from 'slices';
import { useDispatch, useSelector } from 'react-redux';
import { EmployeeDBI, EmployeeI } from 'slices/interfaces/employeeI';
import { AppCtx, consoler } from 'App';
import { INCOMPLETE_FORM_MESSAGE } from 'constants/errors';
import { generateCompanyEmail, getContractEndDate, getProbationaryEndDate } from 'utils/functions';
import { EmployeeCtx } from 'components/HRDashboard/EmployeeDatabase';
import { dataStatus as _getTLDataStatus, data as _getTLData } from 'slices/teamLeader';
import { TeamLeaderModel } from 'components/TeamLeaders';

type Props = {};

type JobInfoI = {
  jobLastUpdate: Date | Moment;
  location: string;
  department: string;
  rank: string;
  position: string;
  reportsTo: string;
  remarks?: string;
};

const JobInfo = (props: Props) => {
  const {
    // isNew,
    setIndex,
    employeeDetails,
    setEmployeeDetails,
    enums,
    isView,
    setUpdatedDetails, failed
  } = useContext(ProfileCtx);
  const {isNew} = useContext(EmployeeCtx)
  const { access_token } = useContext(AppCtx)
  const dispatch = useDispatch();
  const getEmployeeItems = useSelector(_getEmployeeItems);
  const [infos, setInfos] = useState<JobInfoI[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  const [positions, setPositions] = useState<any[]>([]);
  const [teamLeaders, setTeamLeaders] = useState<any[]>([]);
  const [ranks, setRanks] = useState<any[]>([]);
  const [editJob, setEditJob] = useState<any>(null);
  const [jobUpdate, setJobUpdate] = useState<any>(null);
  const [employmentStatus, setEmploymentStatus] = useState<any[]>([]);
  const [employmentTypes, setEmploymentTypes] = useState<any[]>([]);

  // Team Leaders
  const TLdataStatus = useSelector(_getTLDataStatus);
  const TLdata = useSelector(_getTLData);

  useEffect(() => { 
    if (TLdataStatus === 'succeeded') {
      setTeamLeaders(TLdata
        .map((o: TeamLeaderModel) => {
            return {
              fullName: o.employeeDetails ? `${o.employeeDetails.firstName} ${o.employeeDetails.lastName}` : "",
              department_code: o.employeeDetails ? o.employeeDetails.department : "",
              employeeNo: o.employeeNo
            }
      }));
    }
  }, [TLdataStatus])
      console.log({teamLeaders})

  useEffect(() => {
    setDepartments(enums.departments);
    setLocations(enums.locations);
    setPositions(enums.positions);
    setRanks(enums.ranks);
    setEmploymentStatus(enums.employment_status);
    setEmploymentTypes(enums.employment_types);
  }, [enums]);

  const values = {
    employeeDetails,
    setEmployeeDetails,
    departments,
    locations,
    positions,
    ranks,
    employmentStatus,
    employmentTypes,
    isView,
    setUpdatedDetails,
    teamLeaders
  };

  useEffect(() => {
    getData();
  }, [employeeDetails]);

  const getData = async () => {
    //latest data from employees
    let data: any[] = [], prev_remarks = "";
    //updated employee job info..
    
    if (employeeDetails.job_history && employeeDetails.job_history.length > 0) {
      const o:any = employeeDetails.job_history;
      for (var i = 0; i < o.length; i++){
        const history_data = {
          location: employeeDetails.location,
          department: employeeDetails.department,
          rank: employeeDetails.rank,
          position: employeeDetails.position,
          reportsTo: employeeDetails.reportsTo,
          effectiveDate: new Date(),
          jobLastUpdate: o[i]?.effectiveDate,
          remarks: prev_remarks,
          ...o[i].details,
          index: i
        };
        prev_remarks = o[i]?.remarks || "";
        data.push(history_data);
      }
    }
    data.push({
      index: data.length,
      jobLastUpdate: employeeDetails.jobLastUpdate,
      effectiveDate: new Date(),
      location: employeeDetails.location,
      department: employeeDetails.department,
      rank: employeeDetails.rank,
      position: employeeDetails.position,
      reportsTo: employeeDetails.reportsTo,
      remarks: prev_remarks
    })
    data.sort((a: any, b: any) => b.index - a.index);
    setInfos(data);
  }

  const getName = (type: any[], code: string) => {
    const data: any = type.find((x: any) => x.code === code);
    return data ? data.name : code;
  }

  const getEmployeeName = (employeeNo: string) => {
    // console.log({employeeNo}, {getEmployeeItems})
    const data: any = getEmployeeItems.find((x: any) => x.employeeNo === employeeNo);
    return data ? `${data.firstName} ${data.lastName}` : employeeNo;
  }

  const columns: GridColDef[] = [
    {
      field: 'jobLastUpdate',
      headerName: 'Effective Date',
      flex: 1,
      renderCell: (params: any) => {
        return (
          <div className='text-xs p-1'>{moment(params.value).format('LL')}</div>
        );
      },
    },
    {
      field: 'location',
      headerName: 'Location',
      flex: 1,
      renderCell: (params: any) => {
        return (
          <div className='text-xs p-1'>
            {params.row.location.map((o: any) => o.name || getName(locations, o)).join(', ')}
          </div>
        );
      },
    },
    {
      field: 'department',
      headerName: 'Department',
      flex: 1,
      renderCell: (params: any) => {
        return <div className='text-xs p-1'>{params.row.department?.name || getName(departments, params.row.department)}</div>;
      },
    },
    {
      field: 'rank',
      headerName: 'Rank',
      flex: 1,
      renderCell: (params: any) => {
        return <div className='text-xs p-1'>{params.row.rank?.name || getName(ranks, params.row.rank)}</div>;
      },
    },
    {
      field: 'position',
      headerName: 'Position',
      flex: 1,
      renderCell: (params: any) => {
        return <div className='text-xs p-1'>{params.row.position?.name || getName(positions, params.row.position)}</div>;
      },
    },
    {
      field: 'reportsTo',
      headerName: 'Reports To',
      flex: 1,
      renderCell: (params: any) => {
        return <div className='text-xs p-1'>{params.row.reportsTo?.employeeName || getEmployeeName(params.row.reportsTo)}</div>;
      },
    },
    {
      field: 'remarks',
      headerName: 'Remarks',
      flex: 1,
    },
    {
      field: 'action',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params: any) => {
        if (params.row.index === infos.length - 1) {
          return (
            <Button
              variant='outlined'
              size='small'
              onClick={() => setEditJob({
                location: params.row.location.map((o:any) => o.code),
                department: params.row.department.code,
                rank: params.row.rank.code,
                position: params.row.position.code,
                reportsTo: params.row.reportsTo?.employeeNo,
              })}
              startIcon={<EditTwoTone />}
            >
              Edit
            </Button>
          );
        }
        return '';
      },
    },
  ];

  const getDialog = () => {
    const handleSaveChanges = async () => {

      const update = async () => {
        try {
          editJob.type = JOB_HISTORY_TYPE;
          editJob.effectiveDate = employeeDetails.jobLastUpdate;
          editJob.jobLastUpdate = moment(editJob.jobLastUpdate).endOf("day")
          
          consoler(editJob, 'blue', 'updateEmployment');
          await dispatch(updateEmployee(
            {
              params: { ...editJob, employeeNo: employeeDetails.employeeNo },
              access_token
            }))
          setEditJob(null);
          await dispatch(
            _getOneEmployeeAction({
              access_token,
              params: { employeeNo: employeeDetails.employeeNo },
            })
          );
          setIndex("2")
        } catch (error: any) {
          console.log(error);
        }
      };

      const validateFields = async () => {
        const dialog: any = document.getElementById("dialog-job");
        const required = dialog.querySelectorAll("[required]");
        let invalidCtr = 0;

        invalidCtr = await Array.from(required)
          .filter((e: any) => !e.value)
          .map((e: any) => e.id).length;

        const employmentType = jobUpdate?.employmentType || employeeDetails.employmentType.code;
        const endOfProbationary = jobUpdate?.endOfProbationary || employeeDetails.endOfProbationary;
        const contractEndDate = jobUpdate?.contractEndDate || employeeDetails.contractEndDate;
        if (employmentType.toLowerCase() == "probationary" && !endOfProbationary) {
          invalidCtr++;
        } else if (employmentType.toLowerCase() == "project" && !contractEndDate) {
          invalidCtr++;
        }
        if (invalidCtr > 0) {
          return failed(INCOMPLETE_FORM_MESSAGE);
        }
        return true;
      }
      //check inputs...
      await validateFields();
      await update();
    }
    console.log({jobUpdate}, {editJob})
    return <Dialog open={editJob !== null} id="dialog-job" onClose={() => setEditJob(null)}>
      <div className='p-6 flex flex-col gap-4 w-[350px]'>
        <p className='text-md font-bold '>
          <PersonTwoTone /> Job Update
        </p>
        <FormControl variant='standard' fullWidth size='small' required>
          <InputLabel id='loc'>Locations</InputLabel>
          <Select
            id='jobinfo-location-update'
            multiple
            labelId='loc'
            value={editJob?.location}
            onChange={(e: any, option: any) => {
              setJobUpdate((prev: any) => ({
                ...prev,
                location: e.target.value,
              }));
              setEditJob((prev: any) => ({
                ...prev,
                location: [...prev.location, e.target.value],
              }));
            }}
          >
            {locations.map((location) => {
              return (
                <MenuItem
                  id={location._id}
                  key={location._id}
                  value={location.code}
                  data-obj={location}
                >
                  {location.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl variant='standard' fullWidth size='small' required>
          <InputLabel id='dept'>Department</InputLabel>
          <Select
            id='jobinfo-department-update'
            labelId='dept'
            value={editJob?.department}
            onChange={(e: any, option: any) => {
              setJobUpdate((prev: any) => ({
                ...prev,
                department: e.target.value,
              }));
              setEditJob((prev: any) => ({
                ...prev,
                department: e.target.value
              }))
            }}
          >
            {departments.map((department: any, i: number) => {
              return (
                <MenuItem key={i} value={department.code} data-obj={department}>{department.name}</MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl variant='standard' fullWidth size='small' required>
          <InputLabel id='rankLbl'>Employment Rank</InputLabel>
          <Select
            labelId='rankLbl'
            id="rank-update"
            value={editJob?.rank}
            onChange={(e: any, option: any) => {
              setJobUpdate((prev: any) => ({
                ...prev,
                rank: e.target.value,
              }));
              setEditJob((prev: any) => ({
                ...prev,
                rank: e.target.value
              }))
            }}
          >
            {ranks.map((rank: any, i: number) => {
              return <MenuItem key={i} value={rank.code} data-obj={rank}>{rank.name}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <FormControl variant='standard' fullWidth size='small' required>
          <InputLabel id='positionLbl'>Position</InputLabel>
          <Select
            id='jobinfo-position-update'
            labelId='positionLbl'
            value={editJob?.position}
            onChange={(e: any, option: any) => {
              setJobUpdate((prev: any) => ({
                ...prev,
                position: e.target.value,
              }));
              setEditJob((prev: any) => ({
                ...prev,
                position: e.target.value
              }))
            }}
          >
            {positions.map((position) => {
              return (
                <MenuItem id={position._id} key={position._id} value={position.code} data-obj={position}>
                  {position.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl variant='standard' fullWidth size='small'>
          <InputLabel id='tl'>Team Leader</InputLabel>
          <Select
            id='jobinfo-teamleader-update'
            labelId='tl'
            value={editJob?.reportsTo}
            onChange={(e: any, option: any) => {
              setJobUpdate((prev: any) => ({
                ...prev,
                reportsTo: e.target.value,
              }));
              setEditJob((prev: any) => ({
                ...prev,
                reportsTo: e.target.value
              }))
            }}
          >
            {teamLeaders
              .filter(
                (x: any) =>
                  x.department_code === (jobUpdate?.department || editJob.department)
                && employeeDetails.employeeNo !== x.employeeNo
            ).sort((a: any, b: any) => {
                return a.fullName?.localeCompare(b.fullName)
              })
              .map((employee) => {
                return (
                  <MenuItem
                    id={employee.employeeNo}
                    key={employee.employeeNo}
                    value={employee.employeeNo}
                    data-obj={employee}
                  >
                    {employee.fullName}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            label='Effective Date'
            onChange={(value) => {
              setJobUpdate({
                ...jobUpdate,
                jobLastUpdate: value
              });
              setEditJob((prev: any) => ({
                ...prev,
                effectiveDate: value
              }))
            }}
            value={editJob.effectiveDate}
            renderInput={(params) => (
              <TextField {...params} fullWidth required variant='standard' />
            )}
          />
        </LocalizationProvider>
        <TextField
          fullWidth
          variant='standard'
          size='small'
          label='Remarks'
          multiline
          onChange={(e: any) =>
            setJobUpdate({ ...jobUpdate, remarks: e.target.value })
          }
        />

        <div className='grid grid-cols-5'>
          <button
            onClick={handleSaveChanges}
            className='col-span-3 px-2 py-1 bg-green-500 text-white rounded-md w-full flex items-center justify-center hover:bg-green-400 transition duration-150 disabled:bg-slate-300 disabled:text-slate-400 disabled:cursor-not-allowed'
          >
            <SaveTwoTone fontSize='small' className='mr-2' />
            Save Changes
          </button>
          <button
            className='col-span-2 px-2 py-1 text-slate-400 hover:text-slate-800'
            onClick={() => {
              setEditJob(null);
              dispatch(resetUpdate())
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </Dialog>
  }

  return (
    <CollapseWrapper
      panelTitle={isNew ? 'Personnel Information' : 'Job Information'}
      icon={EngineeringTwoTone}
      contentClassName='p-0'
      open
    >
      {isNew ? (
        <JobInfoFields {...values} />
      ) : (
        <div style={{ width: '100%' }}>
          {editJob && getDialog()}
          <DataGrid
            getRowId={(data: any) => data.index}
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
  locations,
  positions,
  ranks,
  departments,
  employmentStatus,
  employmentTypes,
  isView,
  setUpdatedDetails, teamLeaders
}) => {
  const getEmployeeItems = useSelector(_getEmployeeItems);
  const [isProjectEmployee, setIsProjectEmployee] = useState<boolean>(false);
  const [duplicates, setDuplicates] = useState<any[]>([]);

    // Filtered Employees
  const { employeeExistsStatus, employeeExists: employeesDuplicates } = useSelector(filteredEmployeeStore);

  useEffect(() => {
    if (employeeExistsStatus !== "idle") {
      setDuplicates(employeesDuplicates)
    }
  }, [employeeExistsStatus])

  useEffect(() => {
    if (
      !employeeDetails.employeeNo &&
      employeeDetails.rank &&
      employeeDetails.firstName &&
      employeeDetails.lastName
    ) {
      setEmployeeDetails((prev: EmployeeI) => ({
        ...prev,
        companyEmail:
          generateCompanyEmail(employeeDetails.firstName, employeeDetails.lastName, employeeDetails.rank)
      }));
    }
  }, [employeeDetails.rank]);

  useEffect(() => {
    if (employeeDetails.dateHired && employeeDetails.employmentType) {
      const employment_type = employmentTypes.find(
        (x: any) =>
          x.code.toLowerCase() == employeeDetails.employmentType.toLowerCase()
      );

      if (employment_type && employment_type.code.toLowerCase() == 'project') {
        setIsProjectEmployee(true);
        setEmployeeDetails((prev: EmployeeI) => ({
          ...prev,
          contractEndDate: getContractEndDate(employeeDetails.dateHired),
          endOfProbationary: null,
        }));
      } else {
        setIsProjectEmployee(false);
        setEmployeeDetails((prev: EmployeeI) => ({
          ...prev,
          endOfProbationary: getProbationaryEndDate(employeeDetails.dateHired),
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
            {positions.map((position: any, i: number) => {
              return (
                <MenuItem id={position._id} key={position._id} value={position.code}>
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
                <MenuItem value={department.code} key={department.code}>{department.name}</MenuItem>
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
          <FormControl variant='standard' fullWidth size='small'>
            <InputLabel id='teamleader'>Team Leader</InputLabel>
            <Select
              id='jobinfo-teamleader'
              labelId='teamleader'
              value={employeeDetails?.reportsTo}
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
              {teamLeaders
                .filter(
                  (x: any) => x.department_code === employeeDetails.department && employeeDetails.employeeNo !== x.employeeNo
              )
                .sort((a:any, b:any) => a.fullName.localeCompare(b.fullName))
                .map((employee) => {
                  return (
                    <MenuItem
                      id={employee.employeeNo}
                      key={employee.employeeNo}
                      value={employee.employeeNo}
                    >
                      {employee.fullName}
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
                return <MenuItem value={rank.code} key={rank.code}>{rank.name}</MenuItem>;
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
                return <MenuItem value={status.code} key={status.code}>{status.name}</MenuItem>;
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
                return <MenuItem value={status.code} key={status.code}>{status.name}</MenuItem>;
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

      <GridWrapper colSize='4' className='col-span-2'>
        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
          <TextField
            required
            id='companyContactNumber'
            variant='standard'
            label='Company Contact Number'
            fullWidth
            value={employeeDetails.companyContactNumber}
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
            id='companyEmail'
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
                return <MenuItem value={group} key={group}>{group}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </div>
        
        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
          <FormControl variant='standard' fullWidth size='small' required={duplicates.length > 0}>
            <InputLabel id='oldEmployeeNoLbl'>Old Employee# (For Rehire ONLY)</InputLabel>
            <Select
              id="oldEmployeeNo"
              labelId='oldEmployeeNoLbl'
              onChange={(e: any) =>
                setEmployeeDetails({
                  ...employeeDetails,
                  oldEmployeeNo: e.target.value,
                })
              }
            >
              {duplicates.map((e:EmployeeDBI, i:number) => {
                return <MenuItem value={e.employeeNo} key={i}>{e.employeeNo}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </div>

      </GridWrapper>
    </GridWrapper>
  );
};

export default React.memo(JobInfo);
