import { ArrowRightOutlined } from '@mui/icons-material';
import { Chip, List, ListItem, ListItemButton } from '@mui/material';
import { Path } from 'constants/Path';
import CardWTitle from 'CustomComponents/CardWTitle';
import React from 'react';
import { Link } from 'react-router-dom';

var moment = require('moment-business-days');
type Props = {
  className?: string;
};

const Attendance = ({ className }: Props) => {
  return (
    <CardWTitle
      className={`${className}`}
      title={
        <div>
          Attendance{' '}
          <Link
            to={Path.Employee.Attendance}
            className='float-right pr-0 pl-2 text-slate-500 hover:text-v-red rounded-sm ease-in-out duration-200 hover:translate-x-1'
          >
            View All <ArrowRightOutlined fontSize='small' />
          </Link>
        </div>
      }
    >
      <section className='text-sm mt-4'>
        <List>
          <AttendanceWrapper
            date={{ from: '7/15/2022', to: '7/30/2022' }}
            status='Pending'
          />
          <AttendanceWrapper
            date={{ from: '7/1/2022', to: '7/15/2022' }}
            status='Verified'
          />
          <AttendanceWrapper
            date={{ from: '6/15/2022', to: '6/30/2022' }}
            status='Verified'
          />
          <AttendanceWrapper
            date={{ from: '6/1/2022', to: '6/15/2022' }}
            status='Verified'
          />
        </List>
      </section>
    </CardWTitle>
  );
};

const AttendanceWrapper: React.FC<{
  date: { from: string; to: string };
  status: string;
}> = ({ date, status }) => {
  return (
    <ListItem className='p-0'>
      <ListItemButton className='grid grid-cols-6 items-center w-full rounded-md hover:bg-v-red/10'>
        {/* <div className=''> */}
        <div className='col-span-4'>
          {moment(date.from).format('L')} - {moment(date.to).format('L')}
        </div>

        <div className='col-span-2 justify-self-end'>
          <Chip
            label={status}
            variant='outlined'
            size='small'
            color={status === 'Pending' ? 'warning' : 'primary'}
          />
        </div>
        {/* </div> */}
      </ListItemButton>
    </ListItem>
  );
};

export default Attendance;
