import { BusinessIcon } from './../Common/icons';
import IconNumbers from '../Common/icon.numbers';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Path } from 'constants/Path';

type Props = {
  className?: string;
};

const OnLeave = ({ className }: Props) => {
  const [value, setValue] = useState(0);

  const max = 16;

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
      <Link to={Path.HR.Requests.Leave}>
        <IconNumbers
          className={`border border-white hover:border-sky-500 ease-in-out duration-150 hover:shadow-lg hover:shadow-sky-100 ${className}`}
          icon={<BusinessIcon color='inherit' />}
          title='Number on leave today'
          number={value}
          color='primary'
        />
      </Link>
    </div>
  );
};

export default OnLeave;
