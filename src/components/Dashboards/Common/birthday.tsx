import { CakeTwoTone } from '@mui/icons-material';
import {
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import CardWTitle from 'CustomComponents/CardWTitle';
import React from 'react';
import { ProfilePhoto } from './profile.preview';
import TitleWithLink from './title.with.link';

type Props = {
  className?: string;
};

const Birthday = ({ className }: Props) => {
  return (
    <CardWTitle
      className={className}
      title={
        <div className='flex flex-row gap-1 items-center text-v-red'>
          <CakeTwoTone /> Birthday
        </div>
      }
    >
      <List>
        <ListItem className='px-0'>
          <ListItemIcon>
            <Avatar sx={{ width: 35, height: 35 }} src={ProfilePhoto} />
          </ListItemIcon>
          <ListItemText
            className='text-sm'
            primary='ABNE, MARK JAYVEN'
            primaryTypographyProps={{ sx: { fontSize: '0.75rem' } }}
            secondary='Jul 14, 2022'
            secondaryTypographyProps={{ sx: { fontSize: '0.75rem' } }}
          />
        </ListItem>
        <ListItem className='px-0'>
          <ListItemIcon>
            <Avatar sx={{ width: 35, height: 35 }} src={ProfilePhoto} />
          </ListItemIcon>
          <ListItemText
            className='text-sm'
            primary='ABNE, MARK JAYVEN'
            primaryTypographyProps={{ sx: { fontSize: '0.75rem' } }}
            secondary='Jul 14, 2022'
            secondaryTypographyProps={{ sx: { fontSize: '0.75rem' } }}
          />
        </ListItem>
        <ListItem className='px-0'>
          <ListItemIcon>
            <Avatar sx={{ width: 35, height: 35 }} src={ProfilePhoto} />
          </ListItemIcon>
          <ListItemText
            className='text-sm'
            primary='ABNE, MARK JAYVEN'
            primaryTypographyProps={{ sx: { fontSize: '0.75rem' } }}
            secondary='Jul 14, 2022'
            secondaryTypographyProps={{ sx: { fontSize: '0.75rem' } }}
          />
        </ListItem>
      </List>
    </CardWTitle>
  );
};

export default Birthday;
