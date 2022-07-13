import React, { useEffect, useState } from 'react';
import CardWTitle from 'CustomComponents/CardWTitle';
import { Select, MenuItem } from '@mui/material';

type Props = {
  className?: string;
};

const Retention = ({ className }: Props) => {
  const [value, setValue] = useState(0);

  const max = 85;

  useEffect(() => {
    let x = 0;
    setInterval(() => {
      if (x <= max) {
        setValue(x);
        x++;
      }
    }, 1);
  }, []);

  const handleChange = () => {};
  return (
    <CardWTitle title='Employee Retention' className={` ${className}`}>
      <p className='text-xs'>
        Proportion of your workforce who leave during a period of time.
      </p>
      <div className='mt-4 grid grid-cols-4 items-center'>
        <div className='col-span-3'>
          <Select
            onChange={handleChange}
            value='06'
            size='small'
            className='text-xs '
          >
            <MenuItem className='text-xs' value='02'>
              02 2022
            </MenuItem>
            <MenuItem className='text-xs' value='03'>
              03 2022
            </MenuItem>
            <MenuItem className='text-xs' value='04'>
              04 2022
            </MenuItem>
            <MenuItem className='text-xs' value='05'>
              05 2022
            </MenuItem>
            <MenuItem className='text-xs' value='06'>
              06 2022
            </MenuItem>
          </Select>
        </div>

        <div className='text-green-700 col-span-1 text-right text-sm font-bold'>
          {value}%
        </div>
      </div>
    </CardWTitle>
  );
};

export default Retention;
