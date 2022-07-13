import { Path } from 'constants/Path';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import IconNumbers from '../Common/icon.numbers';
import { OTIcon } from '../Common/icons';

type Props = {
  className?: string;
};

const OTHours = ({ className }: Props) => {
  const [value, setValue] = useState(0);

  const max = 2.6;

  useEffect(() => {
    let x: any = 0;
    setInterval(() => {
      if (x <= max) {
        const val = 1 * x.toFixed(2);
        setValue(val);
        x = x + 0.1;
      }
    }, 0.5);
  }, []);

  return (
    <div className={className}>
      <Link to={Path.HR.Requests.OT}>
        <IconNumbers
          icon={<OTIcon color='inherit' />}
          title="Worker's Avg. OT hrs. per week"
          number={value}
          color='warning'
          className={`border border-white hover:border-orange-500 ease-in-out duration-150 hover:shadow-lg hover:shadow-orange-100 ${className}`}
        />
      </Link>
    </div>
  );
};

export default OTHours;
