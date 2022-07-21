import React, { useEffect, useState } from 'react';
import CardWTitle from 'CustomComponents/CardWTitle';
import { LinearProgress } from '@mui/material';
import { ExpandMoreTwoTone } from '@mui/icons-material';

type Props = {
  className?: string;
};

const Sickleave = ({ className }: Props) => {
  const [values, setValues] = useState({ last: 0, this: 0 });

  useEffect(() => {
    const last_max = 75;
    const this_max = 35;

    let x = 0;
    setInterval(() => {
      if (x <= this_max) {
        setValues({ last: x, this: x });
        x++;
      } else if (x <= last_max) {
        setValues({ this: this_max, last: x });
        x++;
      }
    }, 0.5);
  }, []);

  const percentage: any = (100 * values.this) / values.last;

  return (
    <CardWTitle title='Sick Leave' className={className}>
      <label className='text-sm'>Last month</label>
      <div className='flex flex-row gap-2 items-center'>
        <div className='w-full'>
          <LinearProgress
            variant='determinate'
            value={values.last}
            color='error'
          />
        </div>{' '}
        <strong className='text-xs'>{values.last}</strong>
      </div>

      <label className='text-sm'>This month</label>
      <div className='flex flex-row gap-2 items-center'>
        <div className='w-full'>
          <LinearProgress variant='determinate' value={values.this} />
        </div>{' '}
        <strong className='text-xs'>{values.this}</strong>
      </div>

      <div className='text-green-700 text-xs bg-green-100 mt-2 p-1'>
        <ExpandMoreTwoTone fontSize='small' /> {1 * percentage.toFixed(1)}%
        fewer sick leave
      </div>
    </CardWTitle>
  );
};

export default Sickleave;
