import React, { useState, useEffect } from 'react';
import IconNumbers from '../Common/icon.numbers';
import { GroupTwoTone } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Path } from 'constants/Path';

type Props = {
  className?: string;
};

const Employees = ({ className }: Props) => {
  const [value, setValue] = useState(0);

  const max = 128;

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
