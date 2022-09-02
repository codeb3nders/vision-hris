import React, { useState, useEffect } from 'react';
import IconNumbers from '../Common/icon.numbers';
import { GroupTwoTone } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Path } from 'constants/Path';

type Props = {
  className?: string;
  count: number;
};

const Employees = ({ className, count }: Props) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let x = 0;
    setInterval(() => {
      if (x <= count) {
        setValue(x);
        x++;
      }
    }, 1);
  }, [count]);

  return (
    <div className={className}>
      <Link to={Path.HR.People.Employees}>
        <IconNumbers
          className={`border border-white hover:border-red-500 ease-in-out duration-150 hover:shadow-lg hover:shadow-red-100 ${className}`}
          icon={<GroupTwoTone />}
          title='Number of Employees'
          number={value}
          color='error'
          titleClassName='phone:!text-sm'
        />
      </Link>
    </div>
  );
};

export default Employees;
