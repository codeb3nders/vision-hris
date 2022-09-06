import Welcome from './../Employee/welcome';
import Shortcuts from './../Employee/shortcuts';
import ProfilePreview from '../Employee/profile.preview';
import Announcement from './../Employee/sample_announcement';
import ColumnWrapper from '../Common/column.wrapper';
import OnLeave from './on.leave';
import Employees from './employees';
import Workers from './workers';
import OTHours from './ot.hours';
import Sickleave from './sick.leave';
import EndContract from './end.contract';
import TurnOver from './turn.over';
import RowWrapper from '../Common/row.wrapper';
import AttendancePreview from './attendance.preview';
import Retention from './retention';
import Requests from './requests';
import EmployeeSatisfaction from './employee.satisfaction';
import CelebrationsToday from '../Common/celebrations.today';
import OffsToday from '../Common/offs.today';
import AttendanceStatus from './attendance.status';
import HeadCount from './head.count';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppCtx } from 'App';
import { EmployeeDBI, EmployeeI } from 'slices/interfaces/employeeI';
import moment from 'moment';

type Props = {
  activeEmployeesCount: number;
  countContract: number;
  countProbation: number;
  headCount: any[];
  celebrations: number;
};

const HRMainDashboard = (props: Props) => {
  const { activeEmployeesCount, countContract, countProbation, headCount, celebrations } = props;

  return (
    <main className='grid grid-cols-12 items-start gap-4 mt-4 pb-20 '>
      <div className='desktop:col-span-9 tablet:col-span-12 laptop:col-span-8 phone:col-span-12 grid gap-4 grid-cols-12'>
        <Welcome
          profile={<ProfilePreview />}
          announcements={<Announcement />}
          className='z-0 phone:col-span-12 tablet:col-span-12'
        />

        <RowWrapper className='justify-items-stretch'>
          <Employees
            count={activeEmployeesCount}
            className='desktop:col-span-3 phone:col-span-6 laptop:col-span-3'
          />
          <Workers className='desktop:col-span-3 phone:col-span-6 laptop:col-span-3 h-[100%]' />
          <OnLeave className='desktop:col-span-3 phone:col-span-6 laptop:col-span-3' />
          <OTHours className='desktop:col-span-3 phone:col-span-6 laptop:col-span-3' />
        </RowWrapper>

        <RowWrapper>
          <AttendancePreview className='laptop:col-span-4 phone:col-span-12 tablet:col-span-6' />
          <ColumnWrapper className='desktop:col-span-4 laptop:col-span-4'>
            <Sickleave />
            <EndContract
              countContract={countContract}
              countProbation={countProbation}
            />
          </ColumnWrapper>

          <ColumnWrapper className='desktop:col-span-4 laptop:col-span-4 tablet:col-span-12 grid grid-cols-2 space-y-0 gap-4'>
            <TurnOver className='tablet:col-span-1 phone:col-span-1 laptop:col-span-2' />
            <Retention className='tablet:col-span-1 phone:col-span-1 laptop:col-span-2' />
          </ColumnWrapper>
        </RowWrapper>

        <RowWrapper>
          <EmployeeSatisfaction className='col-span-4 phone:col-span-12 tablet:col-span-6 laptop:col-span-4' />
          <HeadCount
            data={headCount}
            className='col-span-4 phone:col-span-12 tablet:col-span-6 laptop:col-span-4'
          />
          <ColumnWrapper className='desktop:col-span-4 laptop:col-span-4 tablet:col-span-12 grid grid-cols-2 gap-4 space-y-0'>
            <Requests className='tablet:col-span-1 laptop:col-span-2  ' />
            <AttendanceStatus className='tablet:col-span-1 laptop:col-span-2  ' />
          </ColumnWrapper>
        </RowWrapper>
      </div>

      <div className='desktop:col-span-3 tablet:col-span-12 laptop:col-span-4 phone:col-span-12 space-y-4'>
        <Shortcuts />
        <CelebrationsToday celebrations={celebrations} />
        <OffsToday />
      </div>
    </main>
  );
};

export default HRMainDashboard;
