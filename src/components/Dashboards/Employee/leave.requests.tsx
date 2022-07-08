import React, { useState } from 'react';
import Requests from './requests';
import { Link } from 'react-router-dom';
import { ArrowRightOutlined } from '@mui/icons-material';

type Props = {};

const LeaveRequests = (props: Props) => {
  const initialValue = [
    {
      date: new Date(),
      status: 'Pending',
      type: 'Sick Leave (SL)',
    },
    {
      date: new Date(),
      status: 'Approved',
      type: 'Vacation Leave (SL)',
    },
    {
      date: new Date(),
      status: 'Disapproved',
      type: 'Official Business (OB)',
    },
  ];

  const [leaves, setLeaves] = useState<any[]>(initialValue);
  return (
    <Requests
      title={
        <div>
          My Leave Requests{' '}
          <Link
            to='/ess/leave-applications/new'
            className='float-right pr-0 pl-2 text-slate-500 hover:text-v-red rounded-sm ease-in-out duration-200 hover:translate-x-1'
          >
            Apply <ArrowRightOutlined fontSize='small' />
          </Link>
        </div>
      }
      requests={leaves}
      isLeave
    />
  );
};

export default LeaveRequests;
