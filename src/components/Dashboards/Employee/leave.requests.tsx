import React, { useState } from 'react';
import Requests from './requests';
import { Link } from 'react-router-dom';
import { BusinessCenterTwoTone, MoreTimeTwoTone } from '@mui/icons-material';
import { Chip } from '@mui/material';
import { Path } from 'constants/Path';

type Props = {
  className?: string;
};

const LeaveRequests = ({ className }: Props) => {
  const initialValue = [
    {
      date: new Date(),
      status: 'Pending',
      type: 'SL',
    },
    {
      date: new Date(),
      status: 'Approved',
      type: 'VL',
    },
    {
      date: new Date(),
      status: 'Disapproved',
      type: 'OB',
    },
  ];

  const [leaves, setLeaves] = useState<any[]>(initialValue);

  return (
    <Requests
      title={
        <div className='grid grid-cols-2  w-full'>
          My Requests
          <div className='flex flex-row justify-self-end'>
            <Link
              to={Path.Employee.ESS.OTNew}
              className='group  pr-0 pl-2 rounded-sm ease-in-out duration-200'
            >
              <Chip
                icon={
                  <MoreTimeTwoTone
                    color='secondary'
                    fontSize='small'
                    className='group-hover:text-white'
                  />
                }
                label='Apply for OT'
                size='small'
                className='text-xs hover:bg-v-red hover:text-white cursor-pointer'
              />
            </Link>
            <Link
              to={Path.Employee.ESS.LeaveNew}
              className='group  pr-0 pl-2 rounded-sm ease-in-out duration-200'
            >
              <Chip
                icon={
                  <BusinessCenterTwoTone
                    color='primary'
                    fontSize='small'
                    className='group-hover:text-white'
                  />
                }
                label='Apply for Leave'
                size='small'
                className='text-xs hover:bg-v-red hover:text-white cursor-pointer'
              />
            </Link>
          </div>
        </div>
      }
      requests={leaves}
      isLeave
      className={className}
    />
  );
};

export default LeaveRequests;
