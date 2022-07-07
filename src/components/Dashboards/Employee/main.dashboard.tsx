import React from 'react';
import ProfilePreview from './profile.preview';
import Shortcuts from './shortcuts';
import LeaveBalances from './leave.balances';

const MainDashboard = () => {
  return (
    <>
      <section className='flex flex-wrap p-8 pb-4 space-x-4 justify-center '>
        <ProfilePreview />
        <Shortcuts />
      </section>
      <section className='flex flex-wrap space-x-4 justify-center '>
        <LeaveBalances />
      </section>
    </>
  );
};

export default MainDashboard;
