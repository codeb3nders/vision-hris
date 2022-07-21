import {
  EmailTwoTone,
  PhoneTwoTone,
  GroupTwoTone,
  PlaceTwoTone,
} from '@mui/icons-material';
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import CustomCard from 'CustomComponents/CustomCard';
import React from 'react';

type Props = {
  className?: string;
};

const ProfileOther = ({ className }: Props) => {
  return (
    <CustomCard className={`${className}`}>
      <List className='p-0'>
        <ListItem className='p-0'>
          <ListItemIcon className='min-w-[35px]'>
            <PhoneTwoTone />
          </ListItemIcon>
          <ListItemText
            primary={<span className='text-sm '>801-722-8299</span>}
            primaryTypographyProps={{ sx: { fontSize: '.85rem' } }}
          />
        </ListItem>

        <ListItem className='p-0'>
          <ListItemIcon className='min-w-[35px]'>
            <EmailTwoTone />
          </ListItemIcon>
          <ListItemText
            primary={
              <a
                href='mailto:jayven.abne@vcdcph.com'
                target='_blank'
                rel='noreferrer'
                className='text-sm text-sky-500'
              >
                jayven.abne@vcdcph.com
              </a>
            }
          />
        </ListItem>

        <Divider className='my-2' />

        <ListItem className='p-0'>
          <ListItemIcon className='min-w-[35px]'>
            <GroupTwoTone />
          </ListItemIcon>
          <ListItemText
            primary={<span className='text-sm'>Product Development</span>}
          />
        </ListItem>
        <ListItem className='p-0'>
          <ListItemIcon className='min-w-[35px]'>
            <PlaceTwoTone />
          </ListItemIcon>
          <ListItemText
            primary={<span className='text-sm'>Head Office</span>}
          />
        </ListItem>
      </List>
    </CustomCard>
  );
};

export default ProfileOther;
