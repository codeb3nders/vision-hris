import { CakeTwoTone, CelebrationTwoTone } from '@mui/icons-material';
import {
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getAvatar } from 'utils/functions';
import CardWTitle from '../../../CustomComponents/CardWTitle';

type Props = {
  className?: string;
  celebrations?: any;
};

const birthdayIcon = <CakeTwoTone color='warning' className='w-[16px] h-[16px]' />,
  anniversaryIcon = <CelebrationTwoTone color='primary' className='w-[16px] h-[16px]' />;

const CelebrationsToday = ({ className, celebrations }: Props) => {
  const [bdays, setBdays] = useState<any[]>([]);

  useEffect(() => {
    setBdays(celebrations);
  }, [celebrations]);

  return (
    <CardWTitle title='Celebrations Today' className={className}>
      <List>
        {bdays.map((off) => {
          return (
            <ListItem key={off.id} className='justtify-left px-0'>
              <ListItemIcon className='flex items-center gap-4'>
                {off.isBirthday ? birthdayIcon : anniversaryIcon}{' '}
                <Avatar src={getAvatar(off.gender)} className='mr-2 w-[28px] h-[28px]' />
              </ListItemIcon>
              <ListItemText
                className='text-sm'
                primary={
                  <>
                    <span>
                    </span>
                    <span className='text-xs'>{off.lastName}, {off.firstName}</span>
                  </>
                }
                secondary={
                  <div className='text-xs flex flex-col'>{off.department.name}</div>
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
