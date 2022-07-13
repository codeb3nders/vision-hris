import React from 'react';
import ProfilePreview from './profile.preview';
import Shortcuts from './shortcuts';
import LeaveBalances from './leave.balances';
import OTRequests from './ot.requests';
import LeaveRequests from './leave.requests';
import Welcome from './welcome';
import OffsToday from './offs.today';
import Attendance from './attendance';
import WorkStatus from './work.status';
import Announcement from './sample_announcement';
import ColumnWrapper from '../Common/column.wrapper';

const MainDashboard = () => {
  return (
    <main className='grid grid-cols-12 items-start gap-4 mt-4 pb-20 '>
      <Welcome
        profile={<ProfilePreview />}
        announcements={<Announcement />}
        className='col-span-9 tablet:col-span-12 laptop:col-span-9  phone:col-span-12  self-stretch'
      />
      <Shortcuts className='col-span-3 tablet:col-span-4 laptop:col-span-3 phone:col-span-12  self-stretch' />

      <ColumnWrapper>
        <LeaveRequests />
        <LeaveBalances className='mb-4' />
      </ColumnWrapper>

      <ColumnWrapper>
        <OffsToday className='col-span-4 tablet:col-span-6 laptop:col-span-5 desktop:col-span-4 phone:col-span-12 self-stretch' />
      </ColumnWrapper>
      <ColumnWrapper>
        <Attendance />
        <WorkStatus />
      </ColumnWrapper>
    </main>
  );
};

export default MainDashboard;
