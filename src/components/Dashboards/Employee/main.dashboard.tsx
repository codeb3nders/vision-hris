import React from 'react';
import ProfilePreview from './profile.preview';
import Shortcuts from './shortcuts';
import LeaveBalances from './leave.balances';
import OTRequests from './ot.requests';
import LeaveRequests from './leave.requests';
import Welcome from './welcome';
import OffsToday from './offs.today';
import Attendance from './attendance';

const MainDashboard = () => {
  return (
    <main className='grid grid-cols-12 items-start gap-4 mt-4 pb-20'>
      <Welcome className='col-span-9 tablet:col-span-12 laptop:col-span-9  phone:col-span-12  self-stretch' />
      <Shortcuts className='col-span-3 tablet:col-span-4 laptop:col-span-3 phone:col-span-12  self-stretch' />

      <LeaveRequests className='col-span-4 tablet:col-span-8 laptop:col-span-4 phone:col-span-12  self-stretch' />
      <OTRequests className='col-span-4 tablet:col-span-6 laptop:col-span-4 phone:col-span-12  self-stretch' />
      <ProfilePreview className='col-span-4 tablet:col-span-6 laptop:col-span-4 phone:col-span-12 self-stretch' />

      <div className='col-span-4 tablet:col-span-6 laptop:col-span-5 phone:col-span-12 desktop:col-span-4'>
        <LeaveBalances className='mb-4' />
        <Attendance />
      </div>
      <OffsToday className='col-span-4 tablet:col-span-6 laptop:col-span-5 desktop:col-span-4 phone:col-span-12 self-stretch' />
      {/* </section> */}
    </main>
  );
};

export default MainDashboard;
