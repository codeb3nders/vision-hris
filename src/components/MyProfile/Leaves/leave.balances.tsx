import { ChurchTwoTone } from '@mui/icons-material';
import IconNumbers from 'components/Dashboards/Common/icon.numbers';
import {
  LeaveIcon,
  ServiceIcon,
  SickIcon,
  VacationIcon,
} from 'components/Dashboards/Common/icons';
import React from 'react';
import CollapseWrapper from '../PersonalProfileTab/collapse.wrapper';

type Props = {};

const LeaveBalances = (props: Props) => {
  return (
    <CollapseWrapper panelTitle='Leave Balances' icon={LeaveIcon} open>
      <div className='grid grid-cols-4 gap-4 space-y-0'>
        <IconNumbers
          title='Bereavement'
          icon={<ChurchTwoTone />}
          number={2}
          color='secondary'
          className='tablet:col-span-2 laptop:col-span-1 desktop:col-span-1'
        />
        <IconNumbers
          title='Vacation'
          icon={<VacationIcon className='text-white' />}
          number={5}
          color='success'
          className='tablet:col-span-2 laptop:col-span-1 desktop:col-span-1'
        />
        <IconNumbers
          title='Sick'
          icon={<SickIcon className='text-white' />}
          number={3}
          color='warning'
          className='tablet:col-span-2 laptop:col-span-1 desktop:col-span-1'
        />
        <IconNumbers
          title='Service Incentive'
          icon={<ServiceIcon className='text-white' />}
          number={1}
          color='primary'
          className='tablet:col-span-2 laptop:col-span-1 desktop:col-span-1'
        />
      </div>
    </CollapseWrapper>
  );
};

export default LeaveBalances;
