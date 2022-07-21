import {
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import CardWTitle from 'CustomComponents/CardWTitle';
import React from 'react';
import TitleWithLink from '../Common/title.with.link';
import { Path } from './../../../constants/Path';
import { ArrowRightOutlined } from '@mui/icons-material';
import { ProfilePhoto } from '../Employee/profile.preview';

type Props = {};

const dummy = [
  {
    name: '',
    dept: 'Paternity Leave',
  },
];

const OnOT = (props: Props) => {
  return (
    <CardWTitle
      title={
        <TitleWithLink
          title='On Leave Today'
          path={Path.HR.Requests.OT}
          linkLabel='View All'
          icon={<ArrowRightOutlined fontSize='small' />}
        />
      }
    >
      <List>
        {dummy.map((d) => (
          <OnOTItem people={d} />
        ))}
      </List>
    </CardWTitle>
  );
};

type OnOTProps = {
  people: {
    icon?: any;
    name: string;
    dept: string;
  };
};

export const OnOTItem: React.FC<OnOTProps> = ({ people }) => {
  return (
    <ListItem>
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

export default OnOT;
