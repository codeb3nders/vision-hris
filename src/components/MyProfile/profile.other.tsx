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
import React, { useContext } from 'react';
import { ProfileCtx } from './profile.main';

type Props = {
  className?: string;
};

const ProfileOther = ({ className }: Props) => {
  const { employeeDetails } = useContext(ProfileCtx);

  return (
    <CustomCard className={`${className}`}>
      <List className='p-0'>
        <ListItem className='p-0'>
          <ListItemIcon className='min-w-[35px]'>
            <PhoneTwoTone />
          </ListItemIcon>
          <ListItemText
            primary={
              <span className='text-xs '>
                {employeeDetails?.companyContactNumber}
              </span>
            }
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
                // href='mailto:test@vcdcph.com'
                target='_blank'
                rel='noreferrer'
                className='text-xs text-sky-500'
              >
                {employeeDetails?.companyEmail}
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
            primary={
              <span className='text-xs'>{employeeDetails?.position?.name}</span>
            }
          />
        </ListItem>
        <ListItem className='p-0'>
          <ListItemIcon className='min-w-[35px]'>
            <PlaceTwoTone />
          </ListItemIcon>
          <ListItemText
            primary={employeeDetails?.location?.map((o: any) => (
              <span className='text-xs'>{o.name}</span>
            ))}
          />
        </ListItem>
      </List>
    </CustomCard>
  );
};

export default ProfileOther;
