import CustomCard from 'CustomComponents/CustomCard';
import React from 'react';
import {
  AccountCircleOutlined,
  LanguageOutlined,
  MoreTimeOutlined,
  PunchClockOutlined,
  TimeToLeaveOutlined,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import CardWTitle from 'CustomComponents/CardWTitle';

type Props = {};

const shortcuts = [
  {
    label: 'Request for an OT/WDO',
    url: '/ess/ot-applications',
    in_app: true,
    icon: <MoreTimeOutlined fontSize='small' />,
  },
  {
    label: 'Request for a Leave',
    url: '/ess/leave-applications',
    in_app: true,
    icon: <TimeToLeaveOutlined fontSize='small' />,
  },
  {
    label: 'Vi-You Website',
    url: 'https://www.visionpropertiesdevt.com/',
    in_app: false,
    icon: <LanguageOutlined fontSize='small' />,
  },
  {
    label: 'My Profile',
    url: '/profile',
    in_app: true,
    icon: <AccountCircleOutlined fontSize='small' />,
  },
  {
    label: 'Submit my Timesheet',
    url: '/timesheets',
    in_app: true,
    icon: <PunchClockOutlined fontSize='small' />,
  },
];

const Shortcuts = (props: Props) => {
  return (
    <CardWTitle
      title='Shortcuts'
      className='p-4 flex flex-col space-y-1 basis-1 min-w-max border border-white hover:border hover:border-slate-200'
    >
      {shortcuts.map((s) => {
        return s.in_app ? (
          <Link to={s.url} className='no-underline text-inherit'>
            <div className='group p-2 flex flex-row space-x-2 rounded-md hover:text-v-red ease-in-out hover:bg-red-50'>
              <div className='text-sm text-slate-400 group-hover:text-v-red'>
                {s.icon}
              </div>
              <div className='text-sm'>{s.label}</div>
            </div>
          </Link>
        ) : (
          <a
            href={s.url}
            target='_blank'
            rel='noreferrer'
            className='no-underline text-inherit'
          >
            <div className='group p-2 flex flex-row space-x-2 rounded-md hover:text-v-red ease-in-out hover:bg-red-50'>
              <div className='text-sm text-slate-400 group-hover:text-v-red'>
                {s.icon}
              </div>
              <div className='text-sm'>{s.label}</div>
            </div>
          </a>
        );
      })}
    </CardWTitle>
  );
};

export default Shortcuts;
