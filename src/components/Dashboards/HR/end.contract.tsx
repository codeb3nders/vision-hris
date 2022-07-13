import CardWTitle from 'CustomComponents/CardWTitle';
import React, { useEffect, useState } from 'react';
import { Add, ExpandMoreTwoTone } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Path } from './../../../constants/Path';

type Props = {
  className?: string;
};

const EndContract = ({ className }: Props) => {
  const [value, setValue] = useState(0);

  const max = 12;

  useEffect(() => {
    let x = 0;
    setInterval(() => {
      if (x <= max) {
        setValue(x);
        x++;
      }
    }, 1);
  }, []);

  return (
    <CardWTitle
      title='End-Contract Soon'
      className={`flex flex-col ${className}`}
    >
      <strong className='text-3xl'>{value}</strong>
      <div className=' mt-2  h-[100%] grid grid-cols-5 gap-2 items-end '>
        <div className='col-span-3 p-1 text-green-700 text-xs bg-green-100 self-end w-full rounded-sm'>
          + 3 new end-contracts
        </div>
        <div className='col-span-2 '>
          <Link to={Path.HR.Dashboard}>
            <div className='p-1 bg-sky-600 hover:bg-sky-700 text-white text-xs w-full text-center rounded-sm'>
              See members
            </div>
          </Link>
        </div>
      </div>
    </CardWTitle>
  );
};

export default EndContract;
