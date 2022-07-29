import React from 'react';
import ProfilePreview from './profile.preview';
import Shortcuts from './shortcuts';
import LeaveBalances from './leave.balances';
import Announcement from './sample_announcement';
import LeaveRequests from './leave.requests';
import Welcome from './welcome';
import OffsToday from '../Common/offs.today';
import CelebrationsToday from '../Common/celebrations.today';
import Attendance from './attendance';
import WorkStatus from './work.status';
import RowWrapper from '../Common/row.wrapper';

const MainDashboard = () => {
  return (
    <main className='grid grid-cols-12 items-start gap-4 mt-4 pb-20 '>
      <div className='col-span-9 tablet:col-span-12 laptop:col-span-9  phone:col-span-12 grid gap-4 grid-cols-12'>
        <Welcome
          profile={<ProfilePreview />}
          announcements={<Announcement />}
          className='z-0 phone:col-span-12 tablet:col-span-12'
        />

        <RowWrapper className='justify-items-stretch'>
          <LeaveRequests className='desktop:col-span-6 laptop:col-span-6 tablet:col-span-6 phone:col-span-12' />
          <Attendance className='desktop:col-span-6 laptop:col-span-6 tablet:col-span-6 phone:col-span-12' />
        </RowWrapper>
        <RowWrapper className='justify-items-start'>
          <LeaveBalances className='desktop:col-span-6 laptop:col-span-6 tablet:col-span-6 phone:col-span-12' />
          <WorkStatus className='desktop:col-span-6 laptop:col-span-6 tablet:col-span-6 phone:col-span-12' />
        </RowWrapper>
      </div>

      <div className='desktop:col-span-3 tablet:col-span-12 laptop:col-span-4 phone:col-span-12 space-y-4'>
        <Shortcuts className='col-span-3 tablet:col-span-4 laptop:col-span-3 phone:col-span-12  self-stretch' />
        <CelebrationsToday className='col-span-4 tablet:col-span-6 laptop:col-span-5 desktop:col-span-4 phone:col-span-12 self-stretch' />
        <OffsToday className='col-span-4 tablet:col-span-6 laptop:col-span-5 desktop:col-span-4 phone:col-span-12 self-stretch' />
      </div>
    </main>
  );
};

export default MainDashboard;
