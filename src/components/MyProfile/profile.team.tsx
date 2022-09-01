import { } from '@mui/icons-material';
import {
  List,
  ListItemIcon,
  ListItemText,
  Avatar,
  ListItemButton,
} from '@mui/material';
import { ProfilePhoto } from 'components/Dashboards/Employee/profile.preview';
import CustomCard from 'CustomComponents/CustomCard';
import React, { useContext, useEffect, useState } from 'react';
import { ProfileCtx } from './profile.main';

type Props = {
  className?: string;
};

const ProfileTeam = ({ className }: Props) => {
  const { employeeDetails, myTeam } = useContext(ProfileCtx);
  const [myTeammates, setMyTeammates] = useState<any[]>([])
  console.log({ myTeam }, { myTeammates })

  useEffect(() => {
    if (myTeam) {
      setMyTeammates(myTeam || [])
    } else {
      //get employees where reportsTo = employeeDetails.reportsTo
    }
  }, [myTeam])

  const getMyTeamMates = () => {
    return myTeammates.map((o: any, i: number) => {
      return <ListItemButton key={i} className='p-0 px-1'>
        <ListItemIcon>
          <Avatar src={ProfilePhoto} />
        </ListItemIcon>
        <ListItemText
          primary={<span className='text-sm font-bold'>{o.full_name}</span>}
          secondary={<span className='text-xs '>{o.position}</span>}
        />
      </ListItemButton>
    })
  }

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
            primary={<span className='text-sm font-bold'>{employeeDetails.reportsTo.employeeName}</span>}
            secondary={<span className='text-xs '>{employeeDetails.reportsTo.position}</span>}
          />
        </ListItemButton>

        <p className='text-xs font-bold text-gray-500 mt-2'>MY TEAMMATES</p>
        {
          getMyTeamMates()
        }
      </List>
    </CustomCard>
  );
};

export default ProfileTeam;
