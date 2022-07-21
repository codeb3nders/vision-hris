import { CakeTwoTone, CelebrationTwoTone } from '@mui/icons-material';
import {
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import CardWTitle from '../../../CustomComponents/CardWTitle';
import { ProfilePhoto } from '../Employee/profile.preview';

type Props = {
  className?: string;
};

const initialVlaue = [
  {
    id: 12346,
    name: 'ACOBA, KERBY  AGUSTIN',
    dept: 'Procurement and Material Management',
    type: 'Sick Leave (SL)',
    icon: <CakeTwoTone color='warning' className='w-[16px] h-[16px]' />,
  },
  {
    id: 12347,
    name: 'ABRIL. JESEL GLEM CATAAG',
    dept: 'Procurement and Material Management',
    type: 'Vacation Leave (VL)',
    icon: <CelebrationTwoTone color='primary' className='w-[16px] h-[16px]' />,
  },
  {
    id: 12348,
    name: 'ADVINCULA , MARK VINCENT BUENVIAJE',
    dept: 'Operations - Project Management',
    type: 'Official Business (OB)',
    icon: <CakeTwoTone color='warning' className='w-[16px] h-[16px]' />,
  },
];

const CelebrationsToday = ({ className }: Props) => {
  const [bdays, setBdays] = useState<any[]>(initialVlaue);

  useEffect(() => {
    setBdays(initialVlaue);
  }, []);

  return (
    <CardWTitle title='Celebrations Today' className={className}>
      <List>
        {bdays.map((off) => {
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

export default CelebrationsToday;
