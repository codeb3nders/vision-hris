import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightOutlined } from '@mui/icons-material';
import Requests from './requests';

type Props = {
  className?: string;
};

const OTRequests = ({ className }: Props) => {
  const initialValue = [
    {
      date: new Date(),
      time: null,
      status: 'Pending',
    },
    {
      date: new Date(),
      time: null,
      status: 'Disapproved',
    },
    {
      date: new Date(),
      time: null,
      status: 'Approved',
    },
  ];

  const [ots, setOTs] = useState<any[]>(initialValue);

  return (
    <Requests
      title={
        <div>
          My OT/WDO Requests{' '}
          <Link
            to='/ess/ot-applications/new'
            className='float-right pr-0 pl-2 text-slate-500 hover:text-v-red rounded-sm ease-in-out duration-200 hover:translate-x-1'
          >
            Apply <ArrowRightOutlined fontSize='small' />
          </Link>
        </div>
      }
      requests={ots}
      className={className}
    />
  );
};

export default OTRequests;
