import React from 'react';
import CardWTitle from './../../../CustomComponents/CardWTitle';
import { Link } from 'react-router-dom';
import { ArrowRightOutlined } from '@mui/icons-material';
import {
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
} from '@mui/material';
import moment from 'moment';

type Props = {
  requests: any[];
  title: any;
  isLeave?: boolean;
  className?: string;
};

const Requests: React.FC<Props> = ({ requests, title, isLeave, className }) => {
  const theme = useTheme();

  const handleColor: any = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'warning';
      case 'SL':
        return theme.palette.warning.main;
      case 'Approved':
        return 'success';
      case 'VL':
        return theme.palette.secondary.main;
      case 'Disapproved':
        return 'error';
      case 'OB':
        return theme.palette.primary.main;

      default:
        return 'warning';
    }
  };

  // const handleInitials;

  return (
    <CardWTitle title={title} className={`relative pb-12 ${className}`}>
      <List>
        {requests.map((request, idx) => {
          return (
            <ListItem disablePadding key={request.date + idx}>
              <ListItemButton className='rounded-md hover:bg-v-red/10'>
                <ListItemText
                  primary={
                    <div className='text-sm flex flex-row items-center'>
                      <div>
                        <p className='text-xs flex flex-row gap-2 items-center'>
                          {/* {isLeave
                            ? request.type
                            : moment(request.date).format('LL')} */}
                          {/* {moment(request.date).format(isLeave ? 'LLLL' : 'LT')} */}
                          <Avatar
                            sx={{
                              width: 26,
                              height: 26,
                              backgroundColor: handleColor(request.type),
                            }}
                            className='text-xs rounded-md'
                          >
                            {request.type}
                          </Avatar>{' '}
                          {moment(request.date).format('ddd, ll')}
                        </p>
                        {/* <small className='text-slate-400'>
                          
                        </small> */}
                      </div>
                      <Chip
                        size='small'
                        label={request.status}
                        color={handleColor(request.status)}
                        className='ml-auto w-[95px]'
                        variant='outlined'
                      />
                    </div>
                  }
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <button className='absolute bottom-[24px] left-[50%] translate-x-[-50%] bg-slate-100 text-slate-800 hover:bg-slate-200 hover:text-slate-900  ease-in duration-150 p-2 w-[calc(100%-48px)] rounded-md text-xs'>
        Show All Requests
      </button>
    </CardWTitle>
  );
};

export default Requests;
