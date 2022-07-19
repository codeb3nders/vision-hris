import CardWTitle from 'CustomComponents/CardWTitle';
import React from 'react';
import { Divider } from '@mui/material';

type Props = {
  className?: string;
};

const Requests = ({ className }: Props) => {
  return (
    <CardWTitle title='Requests' className={`self-start ${className}`}>
      <div className='grid grid-cols-3 text-sm'>
        <span className='col-span-2'>Leave Requests</span>{' '}
        <span className='text-right font-bold'>4</span>
      </div>
      <Divider className='my-2' />
      <div className='grid grid-cols-3 text-sm'>
        <span className='col-span-2'>OT Requests</span>{' '}
        <span className='text-right font-bold'>13</span>
      </div>
      <Divider className='my-2' />
      <div className='grid grid-cols-3 text-sm'>
        <span className='col-span-2'>Other Requests</span>{' '}
        <span className='text-right font-bold'>8</span>
      </div>
    </CardWTitle>
  );
};

export default Requests;
