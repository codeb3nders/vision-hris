/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import CollapseWrapper from '../PersonalProfileTab/collapse.wrapper';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import moment from 'moment';
import { EngineeringTwoTone } from '@mui/icons-material';
import { ProfileCtx } from '../profile.main';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import GridWrapper from 'CustomComponents/GridWrapper';
import {
  EMPLOYMENT_STATUS,
  LOCATIONS,
  POSITIONS,
  RANK,
  USER_GROUP,
} from 'constants/Values';

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
    field: 'division',
    headerName: 'Division',
    width: 120,
    renderCell: (params: any) => {
      return <div className='text-xs p-1'>{params.value}</div>;
    },
  },
  {
    field: 'location',
    headerName: 'Location',
    width: 120,
    renderCell: (params: any) => {
      return <div className='text-xs p-1'>{params.value}</div>;
    },
  },
  {
    field: 'department',
    headerName: 'Department',
    width: 120,
    renderCell: (params: any) => {
      return <div className='text-xs p-1'>{params.value}</div>;
    },
  },
  {
    field: 'rank',
    headerName: 'Rank',
    width: 120,
    renderCell: (params: any) => {
      return <div className='text-xs p-1'>{params.value}</div>;
    },
  },
  {
    field: 'position',
    headerName: 'Position',
    width: 120,
    renderCell: (params: any) => {
      return <div className='text-xs p-1'>{params.value}</div>;
    },
  },
  {
    field: 'reportsTo',
    headerName: 'Reports To',
    width: 120,
    renderCell: (params: any) => {
      return <div className='text-xs p-1'>{params.value}</div>;
    },
  },
  {
    field: 'comment',
    headerName: 'Comment',
    width: 120,
    renderCell: (params: any) => {
      return <div className='text-xs p-1'>{params.value}</div>;
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
  comment: string;
};

const JobInfo = (props: Props) => {
  const [infos, setInfos] = useState<JobInfoI[]>([]);
  const { isNew, employeeDetails } = useContext(ProfileCtx);

  useEffect(() => {
    setInfos([...infos, employeeDetails]);
  }, [employeeDetails]);

  return (
    <CollapseWrapper
      panelTitle='Job Information'
      icon={EngineeringTwoTone}
      contentClassName='p-0'
    >
      {isNew ? (
        <JobInfoFields />
      ) : (
        <div style={{ width: '100%' }}>
          <DataGrid
            getRowId={(data: any) => `${data?.reportsTo}~${data?.dateHired}`}
            rows={isNew ? [] : infos}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            getRowHeight={() => 'auto'}
            autoHeight
            className='border-0'
          />
        </div>
      )}
    </CollapseWrapper>
  );
};

const JobInfoFields = () => {
  const { employeeDetails, setEmployeeDetails } = useContext(ProfileCtx);
  return (
    <GridWrapper colSize={'2'} className='items-center p-2'>
      <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
        <FormControl variant='standard' fullWidth size='small' required>
          <InputLabel id='position'>Position</InputLabel>
          <Select
            labelId='position'
            defaultValue={employeeDetails?.position}
            onChange={(e: any) =>
              setEmployeeDetails({
                ...employeeDetails,
                position: e.target.value,
              })
            }
          >
            {POSITIONS.map((position) => {
              return <MenuItem value={position}>{position}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </div>
      <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
        <FormControl variant='standard' fullWidth size='small' required>
          <InputLabel id='rank'>Rank</InputLabel>
          <Select
            labelId='rank'
            defaultValue={employeeDetails?.rank}
            onChange={(e: any) =>
              setEmployeeDetails({
                ...employeeDetails,
                rank: e.target.value,
              })
            }
          >
            {RANK.map((rank) => {
              return <MenuItem value={rank}>{rank}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </div>
      <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
        <FormControl variant='standard' fullWidth size='small' required>
          <InputLabel id='location'>Location</InputLabel>
          <Select
            labelId='location'
            defaultValue={employeeDetails?.location}
            onChange={(e: any) =>
              setEmployeeDetails({
                ...employeeDetails,
                location: e.target.value,
              })
            }
          >
            {LOCATIONS.map((location) => {
              return <MenuItem value={location}>{location}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </div>
      <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
        <FormControl variant='standard' fullWidth size='small' required>
          <InputLabel id='employement_status'>Employment Status</InputLabel>
          <Select
            labelId='employement_status'
            defaultValue={employeeDetails?.employmentStatus}
            onChange={(e: any) =>
              setEmployeeDetails({
                ...employeeDetails,
                employmentStatus: e.target.value,
              })
            }
          >
            {EMPLOYMENT_STATUS.map((status) => {
              return <MenuItem value={status}>{status}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </div>

      <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
        <FormControl variant='standard' fullWidth size='small' required>
          <InputLabel id='user_group'>User Group</InputLabel>
          <Select
            labelId='user_group'
            defaultValue={employeeDetails?.userGroup}
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
  );
};

export default JobInfo;
