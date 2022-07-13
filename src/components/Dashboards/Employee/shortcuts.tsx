import CustomCard from 'CustomComponents/CustomCard';
import React from 'react';
import {
  AccountCircleOutlined,
  LanguageOutlined,
  MenuBookOutlined,
  MoreTimeOutlined,
  PermContactCalendarOutlined,
  PunchClockOutlined,
  TimeToLeaveOutlined,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import CardWTitle from 'CustomComponents/CardWTitle';

type Props = {
  className?: string;
};

const shortcuts = [
  {
    label: 'Employee Handbook',
    url: 'https://drive.google.com/file/d/18jLHFVwoNpWiMM1EMRU1Uvtw6J8ORr99/view',
    in_app: false,
    icon: <MenuBookOutlined fontSize='small' />,
  },
  {
    label: 'Employee Directory',
    url: '/ess/leave-applications',
    in_app: true,
    icon: <PermContactCalendarOutlined fontSize='small' />,
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
    label: 'Submit my Attendance',
    url: '/timesheets',
    in_app: true,
    icon: <PunchClockOutlined fontSize='small' />,
  },
];

const Shortcuts: React.FC<Props> = ({ className }) => {
  return (
    <CardWTitle
      title='Shortcuts'
      className={`p-4 flex flex-col space-y-1 basis-1 min-w-max ${className}`}
    >
      {shortcuts.map((s) => {
        return s.in_app ? (
          <Link to={s.url} className='no-underline text-inherit'>
            <div className='group p-2 flex flex-row space-x-2 rounded-md hover:text-v-red ease-in-out duration-150 hover:bg-red-50 '>
              <div className='text-sm text-slate-400 group-hover:text-v-red ease-in-out duration-150'>
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
            <div className='group p-2 flex flex-row space-x-2 rounded-md hover:text-v-red ease-in-out duration-150 hover:bg-red-50'>
              <div className='text-sm text-slate-400 group-hover:text-v-red ease-in-out duration-150'>
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
