import {} from '@mui/icons-material';
import {
  List,
  ListItemIcon,
  ListItemText,
  Avatar,
  ListItemButton,
} from '@mui/material';
import { ProfilePhoto } from 'components/Dashboards/Employee/profile.preview';
import CustomCard from 'CustomComponents/CustomCard';
import React from 'react';

type Props = {
  className?: string;
};

const ProfileTeam = ({ className }: Props) => {
  return (
    <CustomCard className={`${className}`}>
      <List className='p-0'>
        {/* <p className='text-xs font-bold text-gray-500'>MANAGER</p>
        <ListItemButton className='p-0 px-1'>
          <ListItemIcon>
            <Avatar src={ProfilePhoto} />
          </ListItemIcon>
          <ListItemText
            primary={<span className='text-sm font-bold'>Amber Valencia</span>}
            secondary={<span className='text-xs '>Director of Design</span>}
          />
        </ListItemButton> */}

        <p className='text-xs font-bold text-gray-500 mt-2'>REPORTS TO</p>
        <ListItemButton className='p-0 px-1'>
          <ListItemIcon>
            <Avatar src={ProfilePhoto} />
          </ListItemIcon>
          <ListItemText
            primary={<span className='text-sm font-bold'>Alex Steinbrook</span>}
            secondary={<span className='text-xs '>Global Director</span>}
          />
        </ListItemButton>

        <p className='text-xs font-bold text-gray-500 mt-2'>MY TEAM</p>
        <ListItemButton className='p-0 px-1'>
          <ListItemIcon>
            <Avatar src={ProfilePhoto} />
          </ListItemIcon>
          <ListItemText
            primary={<span className='text-sm font-bold'>Alex Steinbrook</span>}
            secondary={<span className='text-xs '>Global Director</span>}
          />
        </ListItemButton>
        <ListItemButton className='p-0 px-1'>
          <ListItemIcon>
            <Avatar src={ProfilePhoto} />
          </ListItemIcon>
          <ListItemText
            primary={<span className='text-sm font-bold'>Alex Steinbrook</span>}
            secondary={<span className='text-xs '>Global Director</span>}
          />
        </ListItemButton>
      </List>
    </CustomCard>
  );
};

export default ProfileTeam;
