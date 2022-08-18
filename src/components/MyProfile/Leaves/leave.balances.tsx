import { ChurchTwoTone } from '@mui/icons-material';
import IconNumbers from 'components/Dashboards/Common/icon.numbers';
import {
  LeaveIcon,
  ServiceIcon,
  SickIcon,
  VacationIcon,
} from 'components/Dashboards/Common/icons';
import React, { useContext } from 'react';
import CollapseWrapper from '../PersonalProfileTab/collapse.wrapper';
import { ProfileCtx } from '../profile.main';

type Props = {};

const LeaveBalances = (props: Props) => {
  const { employeeDetails } = useContext(ProfileCtx);

  const balances = {
    bereavement: 0,
    vacation: 0,
    sick: 0,
    serviceIncentive: 0,
  };

  return (
    <CollapseWrapper panelTitle='Leave Balances' icon={LeaveIcon} open>
      <div className='grid grid-cols-4 gap-4 space-y-0'>
        <IconNumbers
          title='Bereavement'
          icon={<ChurchTwoTone />}
          number={balances.bereavement}
          color={balances.bereavement === 0 ? 'action' : 'secondary'}
          className='tablet:col-span-2 laptop:col-span-1 desktop:col-span-1'
        />
        <IconNumbers
          title='Vacation'
          icon={<VacationIcon className='text-white' />}
          number={balances.vacation}
          color={balances.vacation === 0 ? 'action' : 'success'}
          className='tablet:col-span-2 laptop:col-span-1 desktop:col-span-1'
        />
        <IconNumbers
          title='Sick'
          icon={<SickIcon className='text-white' />}
          number={balances.sick}
          color={balances.sick === 0 ? 'action' : 'warning'}
          className='tablet:col-span-2 laptop:col-span-1 desktop:col-span-1'
        />
        <IconNumbers
          title='Service Incentive'
          icon={<ServiceIcon className='text-white' />}
          number={balances.serviceIncentive}
          color={balances.serviceIncentive === 0 ? 'action' : 'primary'}
          className='tablet:col-span-2 laptop:col-span-1 desktop:col-span-1'
        />
      </div>
    </CollapseWrapper>
  );
};

export default LeaveBalances;
