import React from 'react';
import CardWTitle from '../../../CustomComponents/CardWTitle';
import {
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
} from '@mui/material';
var moment = require('moment-business-days');

type Props = {
  requests: any[];
  title: any;
  isLeave?: boolean;
  className?: string;
};

const Requests: React.FC<Props> = ({ requests, title, isLeave, className }) => {
  return (
    <CardWTitle title={title} className={`relative pb-12 ${className}`}>
      <List>
        {requests.map((request, idx) => {
          return <RequestItem request={request} />;
        })}
      </List>
      <button className='absolute bottom-[24px] left-[50%] translate-x-[-50%] bg-slate-100 text-slate-800 hover:bg-slate-200 hover:text-slate-900  ease-in duration-150 p-2 w-[calc(100%-48px)] rounded-md text-xs'>
        Show All Requests
      </button>
    </CardWTitle>
  );
};

type RequestItemProps = {
  request: {
    date: string;
    type: string;
    status: string;
  };
};

export const RequestItem: React.FC<RequestItemProps> = ({ request }) => {
  const theme = useTheme();

  const handleColor: any = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'warning';
      case 'SL':
        return theme.palette.error.main;
      case 'Approved':
        return 'success';
      case 'VL':
        return theme.palette.success.main;
      case 'Disapproved':
        return 'error';
      case 'OB':
        return theme.palette.primary.main;

      default:
        return 'warning';
    }
  };
  return (
    <ListItem disablePadding key={request.date}>
      <ListItemButton className='rounded-md hover:bg-v-red/10'>
        <ListItemText
          primary={
            <div className='text-sm flex flex-row items-center'>
              <div>
                <p className='font-medium flex flex-row gap-2 items-center'>
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
                  {moment(request.date).format('dddd, ll')}
                </p>
              </div>
              <Chip
                size='small'
                label={request.status}
                color={handleColor(request.status)}
                className='ml-auto w-[100px]'
                variant='outlined'
              />
            </div>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};

export default Requests;
