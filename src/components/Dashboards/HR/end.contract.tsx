import { Circle } from '@mui/icons-material';
import CardWTitle from 'CustomComponents/CardWTitle';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Path } from './../../../constants/Path';

type Props = {
  className?: string;
  countContract: number;
  countProbation: number;
};

const EndContract = ({ className, countContract, countProbation }: Props) => {
  const [value, setValue] = useState(0);
  const [value1, setValue1] = useState(0);

  useEffect(() => {
    let x = 0;
    setInterval(() => {
      if (x <= countContract) {
        setValue(x);
        x++;
      }
    }, 1);
  }, [countContract]);

  useEffect(() => {
    let x = 0;
    setInterval(() => {
      if (x <= countProbation) {
        setValue1(x);
        x++;
      }
    }, 1);
  }, [countProbation]);

  return (
    <CardWTitle className={`${className}`} title={'Ending Soon'}>
      <div className='text-xs mb-2'>Less than 1 month</div>
      <div className='grid grid-cols-3 text-sm content-center'>
        <span className='col-span-2 flex flex-row items-center gap-2'>
          <Circle color='success' className='text-[10px]' /> Contracts
        </span>
        <span className='self-end text-right font-bold'>{value}</span>
      </div>
      <div className='grid grid-cols-3 text-sm content-center mt-2'>
        <span className='col-span-2 flex flex-row items-center gap-2'>
          <Circle color='warning' className='text-[10px]' /> Probationary
        </span>
        <span className='self-end text-right font-bold'>{value1}</span>
      </div>
    </CardWTitle>
  );
};

export default EndContract;
