import { EngineeringTwoTone } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import IconNumbers from '../Common/icon.numbers';
import { Path } from 'constants/Path';

type Props = {
  className?: string;
};

const Workers = ({ className }: Props) => {
  const [value, setValue] = useState(0);

  const max = 228;

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
      <Link to={Path.HR.People.Workers}>
        <IconNumbers
          className={`border border-white hover:border-purple-500 ease-in-out duration-150 hover:shadow-lg hover:shadow-purple-100 ${className}`}
          icon={<EngineeringTwoTone />}
          title='Number of Workers'
          number={value}
          color='secondary'
        />
      </Link>
    </div>
  );
};

export default Workers;
