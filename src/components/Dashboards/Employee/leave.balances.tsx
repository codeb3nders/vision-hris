import React from 'react';
import CardWTitle from 'CustomComponents/CardWTitle';
import { HouseboatTwoTone, SickTwoTone } from '@mui/icons-material';

type Props = {
  className?: string;
};

const LeaveBalances: React.FC<Props> = ({ className }) => {
  return (
    <CardWTitle title='My Leave balances' className={`mt-0 ${className}`}>
      <div className='flex flex-row justify-center items-center gap-2'>
        <div className='flex flex-row p-2 bg-slate-100 rounded-md'>
          <HouseboatTwoTone color='primary' />
          <span className='text-lg font-bold ml-2'>7.5</span>
        </div>
        <div className='flex flex-row p-2 bg-slate-100 rounded-md'>
          <SickTwoTone color='warning' />
          <span className='text-lg font-bold ml-2'>3.75</span>
        </div>
      </div>
    </CardWTitle>
  );
};

export default LeaveBalances;
