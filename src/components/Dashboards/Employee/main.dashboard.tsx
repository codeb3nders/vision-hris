import React from 'react';
import ProfilePreview from './profile.preview';
import Shortcuts from './shortcuts';
import LeaveBalances from './leave.balances';
import OTRequests from './ot.requests';
import LeaveRequests from './leave.requests';
import Welcome from './welcome';
import OffsToday from './offs.today';

const MainDashboard = () => {
  return (
    <main className='grid grid-cols-12 gap-4 max-w-[1000px] mx-auto items-start mt-4 pb-10'>
      <div className='w-full col-span-9'>
        <Welcome />

        <div>
          <section className='flex flex-wrap flex-row pb-4 gap-4 items-stretch'>
            <ProfilePreview />
            <LeaveBalances />
            <OTRequests />
            <LeaveRequests />
            <OffsToday />
          </section>
        </div>
      </div>

      <div className='col-span=3'>
        <Shortcuts />
      </div>
    </main>
  );
};

export default MainDashboard;
