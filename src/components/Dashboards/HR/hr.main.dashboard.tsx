import React from 'react';
import Welcome from './../Employee/welcome';
import Shortcuts from './../Employee/shortcuts';
import ProfilePreview from '../Employee/profile.preview';
import Announcement from './../Employee/sample_announcement';
import ColumnWrapper from '../Common/column.wrapper';
import OnLeave from './on.leave';
import OnOT from './on.ot';

type Props = {};

const HRMainDashboard = (props: Props) => {
  return (
    <main className='grid grid-cols-12 items-start gap-4 mt-4 pb-20 '>
      <Welcome
        profile={<ProfilePreview />}
        announcements={<Announcement />}
        className='col-span-9 tablet:col-span-12 laptop:col-span-9  phone:col-span-12  self-stretch'
      />
      <Shortcuts className='col-span-3 tablet:col-span-4 laptop:col-span-3 phone:col-span-12  self-stretch' />

      <ColumnWrapper>
        <OnLeave />
      </ColumnWrapper>

      <ColumnWrapper>
        <OnOT />
      </ColumnWrapper>
    </main>
  );
};

export default HRMainDashboard;
