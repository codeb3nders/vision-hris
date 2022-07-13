import CardWTitle from 'CustomComponents/CardWTitle';
import React from 'react';

type Props = {
  className?: string;
};

const Requests = ({ className }: Props) => {
  return (
    <CardWTitle title='Requests' className={className}>
      <div className='grid grid-cols-3 text-sm'>
        <span className='col-span-2'>Leave request</span>{' '}
        <span className='text-right'>13</span>
      </div>
    </CardWTitle>
  );
};

export default Requests;
