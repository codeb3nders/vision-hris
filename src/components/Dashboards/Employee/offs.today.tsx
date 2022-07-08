import { TimeToLeaveOutlined, TimeToLeaveTwoTone } from '@mui/icons-material';
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
import CardWTitle from './../../../CustomComponents/CardWTitle';
import { ProfilePhoto } from './profile.preview';

type Props = {
  className?: string;
};

const initialVlaue = [
  {
    id: 12346,
    name: 'ACOBA, KERBY  AGUSTIN',
    dept: 'Procurement and Material Management',
    type: 'Sick Leave (SL)',
  },
  {
    id: 12347,
    name: 'ABRIL. JESEL GLEM CATAAG',
    dept: 'Procurement and Material Management',
    type: 'Vacation Leave (VL)',
  },
  {
    id: 12348,
    name: 'ADVINCULA , MARK VINCENT BUENVIAJE',
    dept: 'Operations - Project Management',
    type: 'Official Business (OB)',
  },
  {
    id: 12349,
    name: 'AGARRADO, JOEY ALBERT RAPISTA',
    dept: 'Operations - Project Management',
    type: 'Paternity Leave',
  },
  {
    id: 12350,
    name: 'AGARRADO, JOEY ALBERT RAPISTA',
    dept: 'Operations - Project Management',
    type: 'Paternity Leave',
  },
];

const OffsToday = ({ className }: Props) => {
  const [offs, setOffs] = useState<any[]>(initialVlaue);

  useEffect(() => {
    setOffs(initialVlaue);
  }, [initialVlaue]);

  return (
    <CardWTitle title='Who is off today' className={className}>
      <List>
        {offs.map((off) => {
          return (
            <ListItem key={off.id} className='justtify-left'>
              <ListItemIcon>
                <Avatar src={ProfilePhoto} />
              </ListItemIcon>
              <ListItemText
                className='text-sm'
                primary={
                  <>
                    <div>
                      <Chip
                        variant='outlined'
                        color='secondary'
                        size='small'
                        label={off.type}
                        icon={<TimeToLeaveTwoTone fontSize='small' />}
                        className='w-[inherit] ml-0 text-xs mb-1'
                      />
                    </div>
                    <div className='text-xs font-bold'>{off.name}</div>
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

export default OffsToday;
