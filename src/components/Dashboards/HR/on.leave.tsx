import { Path } from 'constants/Path';
import CardWTitle from 'CustomComponents/CardWTitle';
import React from 'react';
import TitleWithLink from '../Common/title.with.link';
import { ArrowRightOutlined } from '@mui/icons-material';
import { List, ListItem } from '@mui/material';
import {
  BusinessIcon,
  OTIcon,
  ServiceIcon,
  SickIcon,
  VacationIcon,
} from './../Common/icons';
import { RequestItem } from '../Employee/requests';
import { OffWorkItem } from '../Employee/offs.today';

type Props = {};

const OnLeave = (props: Props) => {
  return (
    <CardWTitle
      title={
        <TitleWithLink
          title='On Leave Today'
          path={Path.HR.Requests.Leave}
          linkLabel='View All'
          icon={<ArrowRightOutlined fontSize='small' />}
        />
      }
    >
      <List className='max-h-[400px] overflow-auto'>
        <OffWorkItem
          people={{
            id: 123123,
            dept: 'Operations - Project Management',
            icon: <VacationIcon />,
            name: 'AGARRADO, JOEY ALBERT RAPISTA',
          }}
        />
        <OffWorkItem
          people={{
            id: 32132,
            dept: 'Operations - Project Management',
            icon: <ServiceIcon />,
            name: 'AGARRADO, JOEY ALBERT RAPISTA',
          }}
        />
        <OffWorkItem
          people={{
            id: 4553453,
            dept: 'Operations - Project Management',
            icon: <BusinessIcon />,
            name: 'AGARRADO, JOEY ALBERT RAPISTA',
          }}
        />
        <OffWorkItem
          people={{
            id: 123123,
            dept: 'Operations - Project Management',
            icon: <VacationIcon />,
            name: 'AGARRADO, JOEY ALBERT RAPISTA',
          }}
        />
        <OffWorkItem
          people={{
            id: 32132,
            dept: 'Operations - Project Management',
            icon: <ServiceIcon />,
            name: 'AGARRADO, JOEY ALBERT RAPISTA',
          }}
        />
        <OffWorkItem
          people={{
            id: 4553453,
            dept: 'Operations - Project Management',
            icon: <BusinessIcon />,
            name: 'AGARRADO, JOEY ALBERT RAPISTA',
          }}
        />
      </List>
    </CardWTitle>
  );
};

export default OnLeave;
