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

const MainDashboard = () => {
  return (
    <main className='grid grid-cols-12 items-start gap-4 mt-4 pb-20 '>
      <Welcome
        profile={<ProfilePreview />}
        announcements={<Announcement />}
        className='col-span-9 tablet:col-span-12 laptop:col-span-9  phone:col-span-12  self-stretch'
      />
      <Shortcuts className='col-span-3 tablet:col-span-4 laptop:col-span-3 phone:col-span-12  self-stretch' />

      <div className='col-span-4 tablet:col-span-6 laptop:col-span-5 phone:col-span-12 desktop:col-span-4 grid space-y-4'>
        <LeaveRequests />
        <LeaveBalances className='mb-4' />
        <WorkStatus />
      </div>

      <div className='col-span-4 tablet:col-span-6 laptop:col-span-5 phone:col-span-12 desktop:col-span-4 grid space-y-4'>
        <Attendance />
      </div>

      <div className='col-span-4 tablet:col-span-6 laptop:col-span-5 phone:col-span-12 desktop:col-span-4 grid space-y-4'>
        <CelebrationsToday className='col-span-4 tablet:col-span-6 laptop:col-span-5 desktop:col-span-4 phone:col-span-12 self-stretch' />
        <OffsToday className='col-span-4 tablet:col-span-6 laptop:col-span-5 desktop:col-span-4 phone:col-span-12 self-stretch' />
      </div>
    </main>
  );
};

export default MainDashboard;
