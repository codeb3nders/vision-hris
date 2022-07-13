import React from 'react';
import Welcome from './../Employee/welcome';
import Shortcuts from './../Employee/shortcuts';
import ProfilePreview from '../Employee/profile.preview';
import Announcement from './../Employee/sample_announcement';
import ColumnWrapper from '../Common/column.wrapper';
import OnLeave from './on.leave';
import OnOT from './on.ot';
import Employees from './employees';
import Workers from './workers';
import OTHours from './ot.hours';
import Birthday from '../Common/birthday';
import Sickleave from './sick.leave';
import EndContract from './end.contract';
import TurnOver from './turn.over';
import RowWrapper from '../Common/row.wrapper';
import AttendancePreview from './attendance.preview';
import Retention from './retention';
import Requests from './requests';
import EmployeeSatisfaction from './employee.satisfaction';

type Props = {};

const HRMainDashboard = (props: Props) => {
  return (
    <main className='grid grid-cols-16 items-start gap-4 mt-4 pb-20 '>
      <div className='col-span-12 tablet:col-span-12 laptop:col-span-12 phone:col-span-12 grid gap-4'>
        <Welcome
          profile={<ProfilePreview />}
          announcements={<Announcement />}
          className='z-0'
        />

        <RowWrapper>
          <Employees className='col-span-4' />
          <Workers className='col-span-4' />
          <OnLeave className='col-span-4' />
          <OTHours className='col-span-4' />
        </RowWrapper>

        <RowWrapper>
          <AttendancePreview className='col-span-6' />
          <ColumnWrapper className='desktop:col-span-6 laptop:col-span-6'>
            <Sickleave />
            <EndContract />
          </ColumnWrapper>

          <ColumnWrapper className='desktop:col-span-4 laptop:col-span-4'>
            <TurnOver />
            <Retention />
          </ColumnWrapper>
        </RowWrapper>

        <RowWrapper>
          <EmployeeSatisfaction className='col-span-6' />
          <Requests className='col-span-6' />
        </RowWrapper>
      </div>

      <div className='col-span-4 tablet:col-span-4 laptop:col-span-4 phone:col-span-12 space-y-4'>
        <Shortcuts />
        <Birthday />
      </div>
    </main>
  );
};

export default HRMainDashboard;
