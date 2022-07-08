import {
  ArrowRightOutlined,
  ChevronLeft,
  ChevronRight,
} from '@mui/icons-material';
import { IconButton } from '@mui/material';
import CardWTitle from 'CustomComponents/CardWTitle';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';

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
            to='/ess/ot-applications/new'
            className='float-right pr-0 pl-2 text-slate-500 hover:text-v-red rounded-sm ease-in-out duration-200 hover:translate-x-1'
          >
            View All <ArrowRightOutlined fontSize='small' />
          </Link>
        </div>
      }
    >
      <section className='text-sm mt-4'>
        <div className='grid grid-cols-8 items-center'>
          <div className='col-span-6'>
            {moment().format('L')} - {moment().format('L')}
          </div>
          <div className='col-span-2'>
            <IconButton>
              <ChevronLeft fontSize='small' />
            </IconButton>
            <IconButton>
              <ChevronRight fontSize='small' />
            </IconButton>
          </div>
          <div className='col-span-8 grid grid-cols-4 bg-slate-100 p-4 '>
            <div className='col-span-1 text-center'>
              <div className='font-bold text-lg text-green-600'>1</div>
              <div className='text-xs'>Approved</div>
            </div>
            <div className='col-span-1 text-center'>
              <div className='font-bold text-lg'>4</div>
              <div className='text-xs'>Submitted</div>
            </div>
            <div className='col-span-1 text-center'>
              <div className='font-bold text-lg text-red-600'>0</div>
              <div className='text-xs'>Rejected</div>
            </div>
            <div className='col-span-1 text-center'>
              <div className='font-bold text-lg'>0</div>
              <div className='text-xs'>Processed</div>
            </div>
          </div>
        </div>
      </section>
    </CardWTitle>
  );
};

export default Attendance;
