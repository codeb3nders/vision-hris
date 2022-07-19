import {
  BusinessCenterTwoTone,
  HouseboatTwoTone,
  SickTwoTone,
  TimeToLeaveOutlined,
  TimeToLeaveTwoTone,
} from '@mui/icons-material';
import {
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  BusinessIcon,
  EmergencyIcon,
  PaidIcon,
  ServiceIcon,
  UnpaidIcon,
  VacationIcon,
} from './icons';
import CardWTitle from '../../../CustomComponents/CardWTitle';
import { ProfilePhoto } from '../Employee/profile.preview';
import { HomeIcon, SickIcon } from './icons';

type Props = {
  className?: string;
};

const initialVlaue = [
  {
    id: 12346,
    name: 'ACOBA, KERBY  AGUSTIN',
    dept: 'Procurement and Material Management',
    type: 'Sick Leave (SL)',
    icon: <SickIcon className='w-[16px] h-[16px]' />,
  },
  {
    id: 12347,
    name: 'ABRIL. JESEL GLEM CATAAG',
    dept: 'Procurement and Material Management',
    type: 'Vacation Leave (VL)',
    icon: <VacationIcon className='w-[16px] h-[16px]' />,
  },
  {
    id: 12348,
    name: 'ADVINCULA , MARK VINCENT BUENVIAJE',
    dept: 'Operations - Project Management',
    type: 'Official Business (OB)',
    icon: <BusinessIcon className='w-[16px] h-[16px]' />,
  },
  {
    id: 12349,
    name: 'AGARRADO, JOEY ALBERT RAPISTA',
    dept: 'Operations - Project Management',
    type: 'Paternity Leave',
    icon: <HouseboatTwoTone color='primary' className='w-[16px] h-[16px]' />,
  },
];

const OffsToday = ({ className }: Props) => {
  const [offs, setOffs] = useState<any[]>(initialVlaue);

  useEffect(() => {
    setOffs(initialVlaue);
  }, [initialVlaue]);

  return (
    <CardWTitle title='Who is off today' className={` ${className}`}>
      <List className='max-h-[400px] overflow-auto'>
        {offs.map((off) => {
          return (
            <ListItem key={off.id} className='justtify-left px-0'>
              <ListItemIcon className='flex items-center gap-4'>
                {off.icon}{' '}
                <Avatar src={ProfilePhoto} className='mr-2 w-[28px] h-[28px]' />
              </ListItemIcon>
              <ListItemText
                className='text-sm'
                primary={
                  <>
                    <div>
                      {/* <Chip
                        variant='outlined'
                        color='secondary'
                        size='small'
                        label={off.type}
                        icon={<TimeToLeaveTwoTone fontSize='small' />}
                        className='w-[inherit] ml-0 text-xs mb-1'
                      /> */}
                    </div>
                    <div className='text-xs'>{off.name}</div>
                  </>
                }
                secondary={
                  <div className='text-xs flex flex-col'>{off.dept}</div>
                }
              />
            </ListItem>
          );
        })}
      </List>
    </CardWTitle>
  );
};

type OffWorkItemProps = {
  people: {
    id: any;
    icon: any;
    name: string;
    dept: string;
  };
};

export const OffWorkItem: React.FC<OffWorkItemProps> = ({ people }) => {
  return (
    <ListItem key={people.id} className='justtify-left '>
      <ListItemIcon className='flex items-center gap-4'>
        {people.icon} <Avatar src={ProfilePhoto} className='mr-2' />
      </ListItemIcon>
      <ListItemText
        className='text-sm'
        primary={<div className='text-xs font-bold'>{people.name}</div>}
        secondary={<div className='text-xs flex flex-col'>{people.dept}</div>}
      />
    </ListItem>
  );
};

export default OffsToday;
