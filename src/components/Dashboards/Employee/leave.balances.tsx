import React from 'react';
import CardWTitle from 'CustomComponents/CardWTitle';
import { Link } from 'react-router-dom';
import { LinkOutlined } from '@mui/icons-material';

type Props = {};

const LeaveBalances = (props: Props) => {
  return (
    <CardWTitle
      title='My Leave balances'
      className='basis-2 min-w-max border border-white hover:border hover:border-slate-200'
    >
      <div className='flex flex-col space-y-4 text-center mt-4'>
        <div className='bg-slate-100 p-4 rounded-lg border border-white hover:border-slate-300 ease-in-out'>
          <div className='text-slate-500 text-sm text-left font-bold'>
            <Link
              to='/ess/leave-applications/new?type=sl'
              className='hover:underline'
            >
              Sick Leave{' '}
              <LinkOutlined fontSize='small' className='text-slate-300' />
            </Link>
          </div>
          <div className='flex flex-row space-x-1 divide-x'>
            <div>
              <div className='text-xs text-slate-400 mr-2'>
                Allowance <i className='text-[10px]'>(Annual)</i>
              </div>
              <div className='text-5xl font-medium'>16</div>
            </div>

            <div>
              <div className='text-xs text-slate-400 mx-2 m'>
                Balance <i className='text-[10px]'>(Accrued)</i>
              </div>
              <div className='text-5xl font-medium'>9</div>
            </div>

            <div>
              <div className='text-xs text-slate-400 ml-2'>Used</div>
              <div className='text-5xl font-medium ml-2 '>7</div>
            </div>
          </div>
        </div>

        <div className='bg-slate-100 p-4 rounded-lg border border-white hover:border-slate-300 ease-in-out'>
          <div className='text-slate-500 text-sm text-left font-bold'>
            <Link
              to='/ess/leave-applications/new?type=vl'
              className='hover:underline'
            >
              Vacation Leave
              <LinkOutlined fontSize='small' className='text-slate-300' />
            </Link>
          </div>
          <div className='flex flex-row space-x-1 divide-x'>
            <div>
              <div className='text-xs text-slate-400 mr-2'>
                Allowance <i className='text-[10px]'>(Annual)</i>
              </div>
              <div className='text-5xl font-medium'>24</div>
            </div>
            <div>
              <div className='text-xs text-slate-400 mx-2 m'>
                Balance <i className='text-[10px]'>(Accrued)</i>
              </div>
              <div className='text-5xl font-medium'>17</div>
            </div>
            <div>
              <div className='text-xs text-slate-400 ml-2'>Used</div>
              <div className='text-5xl font-medium ml-2'>8</div>
            </div>
          </div>
        </div>
      </div>
    </CardWTitle>
  );
};

export default LeaveBalances;
