import { Avatar, useTheme } from '@mui/material';
import CustomCard from 'CustomComponents/CustomCard';
import React from 'react';

type Props = {
  className?: string;
  icon: any;
  title: any;
  number: any;
  titleClassName?: string;
  color?:
    | 'primary'
    | 'secondary'
    | 'warning'
    | 'success'
    | 'info'
    | 'error'
    | 'action';
};

const IconNumbers = ({
  className,
  icon,
  title,
  number,
  color,
  titleClassName,
}: Props) => {
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
    <CustomCard className={`phone:col-span-2 ${className}`}>
      <div className='flex flex-col'>
        <div className=''>
          <Avatar
            className='text-md'
            sx={{ background: handleBG(), width: 35, height: 35 }}
          >
            {icon}
          </Avatar>
        </div>
        <div className='col-span-1 text-2xl flex flex-row w-full'>
          <span
            className={`mt-2 min-w-[100px] flex-1 flex justify-start items-end self-stretch h-[45px] text-sm ${titleClassName}`}
          >
            {title}
          </span>
          <strong className='flex items-end w-[60px] text-right justify-end self-end'>
            {number}
          </strong>
        </div>
      </div>
    </CustomCard>
  );
};

export default IconNumbers;
