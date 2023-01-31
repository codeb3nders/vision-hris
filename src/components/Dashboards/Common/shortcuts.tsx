import React, { useContext } from 'react';
import {
  AccountCircleOutlined,
  LanguageOutlined,
  LinkTwoTone,
  MenuBookOutlined,
  PermContactCalendarOutlined,
  PunchClockOutlined,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import CardWTitle from 'CustomComponents/CardWTitle';
import { AppCtx } from '../../../App';
import { LeaveIcon, OTIcon } from './icons';

type Props = {
  className?: string;
};

const shortcuts = [
  {
    label: 'OT Requests for Approval',
    url: '/requests/ot-applications',
    in_app: true,
    icon: <OTIcon color='inherit' />,
    type: 'HR',
  },
  {
    label: 'Leave Requests for Approval',
    url: '/requests/leave-applications',
    in_app: true,
    icon: <LeaveIcon color='inherit' />,
    type: 'HR',
  },
  {
    label: 'Employee Handbook',
    url: 'https://drive.google.com/file/d/18jLHFVwoNpWiMM1EMRU1Uvtw6J8ORr99/view',
    in_app: false,
    icon: <MenuBookOutlined fontSize='small' />,
    type: 'ALL',
  },
  {
    label: 'Employee Directory',
    url: '/ess/leave-applications',
    in_app: true,
    icon: <PermContactCalendarOutlined fontSize='small' />,
    type: 'ADMIN',
  },
  {
    label: 'Vi-You Website',
    url: 'https://sites.google.com/view/visionyouniversity/documents/forms?authuser=0',
    in_app: false,
    icon: <LanguageOutlined fontSize='small' />,
    type: 'ALL',
  },
  {
    label: 'My Profile',
    url: '/profile',
    in_app: true,
    icon: <AccountCircleOutlined fontSize='small' />,
    type: 'EMPLOYEE',
  },
  {
    label: 'My Employee Portal',
    url: '/profile',
    in_app: true,
    icon: <AccountCircleOutlined fontSize='small' />,
    type: 'HR',
  },
  {
    label: 'Verify my Attendance',
    url: '/timesheets',
    in_app: true,
    icon: <PunchClockOutlined fontSize='small' />,
    type: 'EMPLOYEE',
  },
];

const Shortcuts: React.FC<Props> = ({ className }) => {
  const { userGroup } = useContext(AppCtx);
  return (
    <CardWTitle
      title={
        <div className='flex flex-row gap-1 items-center text-v-red'>
          <LinkTwoTone /> Shortcuts
        </div>
      }
      className={`p-4 flex flex-col space-y-1 basis-1 min-w-max ${className}`}
    >
      {shortcuts
        .filter((s) => s.type === userGroup || s.type === 'ALL')
        .map((s) => {
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
