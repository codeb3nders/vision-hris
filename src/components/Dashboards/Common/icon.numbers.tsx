import { GroupTwoTone } from '@mui/icons-material';
import { Avatar, useTheme } from '@mui/material';
import CustomCard from 'CustomComponents/CustomCard';
import React from 'react';

type Props = {
  className?: string;
  icon: any;
  title: any;
  number: any;
  color?:
    | 'primary'
    | 'secondary'
    | 'warning'
    | 'success'
    | 'info'
    | 'error'
    | 'action';
};

const IconNumbers = ({ className, icon, title, number, color }: Props) => {
  const theme = useTheme();

  const handleBG = () => {
    switch (color) {
      case 'primary':
        return theme.palette.primary.main;
      case 'secondary':
        return theme.palette.secondary.main;
      case 'warning':
        return theme.palette.warning.main;
      case 'success':
        return theme.palette.success.main;
      case 'error':
        return theme.palette.error.main;
      case 'info':
        return theme.palette.info.main;
      case 'action':
        return theme.palette.action.active;

      default:
        break;
    }
  };

  return (
    <CustomCard className={`${className}`}>
      {/* <div className='text-3xl'>{icon}</div> */}

      <div className='grid grid-cols-3 items-center'>
        <div className='col-span-2 flex flex-col'>
          <Avatar
            className='text-md'
            sx={{ background: handleBG(), width: 35, height: 35 }}
          >
            {icon}
          </Avatar>
          <span className='text-xs mt-2'>{title}</span>
        </div>
        <strong className='col-span-1 text-3xl self-end text-right '>
          {number}
        </strong>
      </div>
    </CustomCard>
  );
};

export default IconNumbers;
