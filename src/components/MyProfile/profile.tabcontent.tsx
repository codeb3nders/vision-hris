import { TabPanel } from '@mui/lab';
import { Divider } from '@mui/material';
import CustomCard from 'CustomComponents/CustomCard';
import React, { useContext, lazy, Suspense } from 'react';
import ChecklistTable from './201Checklist/checklist.table';
import AssetsTable from './Assets/assets.table';
import EmployementStatus from './EmploymentTab/employement.status';
import History from './Leaves/history';
import LeaveBalances from './Leaves/leave.balances';
import UpcomingLeaves from './Leaves/upcoming.leaves';
import { ProfileCtx } from './profile.main';

const ProfileTabs = lazy(() => import('./profile.tabs'));
const Personal = lazy(() => import('./PersonalProfileTab/personal'));
const Education = lazy(() => import('./PersonalProfileTab/education'));
const EmploymentRecord = lazy(
  () => import('./PersonalProfileTab/employment.record')
);
const Licensure = lazy(() => import('./PersonalProfileTab/licensure'));
const Certificates = lazy(() => import('./PersonalProfileTab/certificates'));
const FamilyBackground = lazy(
  () => import('./PersonalProfileTab/family.background')
);
const Contacts = lazy(() => import('./Emergency/contacts'));
const JobInfo = lazy(() => import('./EmploymentTab/job.info'));
const GovernmentDetails = lazy(
  () => import('./PersonalProfileTab/government.details')
);

const PayrollInformation = lazy(
  () => import('./CompensationAndBenefits/payroll.information')
);
const AllowanceDetails = lazy(
  () => import('./CompensationAndBenefits/allowance.details')
);
const PayrollDetails = lazy(
  () => import('./PersonalProfileTab/payroll.details')
);

type Props = {
  className?: string;
};

const ProfileTabContent = ({ className }: Props) => {
  const { isNew, isView } = useContext(ProfileCtx);
  return (
    <CustomCard
      id='tab-content'
      className={`${
        isNew || isView
          ? 'desktop:max-h-[450px] laptop:max-h-[450px] tablet:max-h-[450px] phone:max-h-[300px] desktop:min-h-[450px] laptop:min-h-[450px] tablet:min-h-[450px] phone:min-h-[300px]'
          : ''
      } overflow-y-auto desktop:p-6 laptop:p-6 phone:p-0 !pb-12 !pt-0 ${className}`}
    >
      <ProfileTabs className='phone:visible laptop:hidden desktop:hidden' />

      <TabPanel value='1' className='p-0 grid' id='Personal'>
        <Suspense fallback={<div>Loading...</div>}>
          <Personal />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <Education />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <EmploymentRecord />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <Licensure />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <Certificates />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <FamilyBackground />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <Contacts />
        </Suspense>
      </TabPanel>

      <Suspense fallback={<div>Loading...</div>}>
        <TabPanel value='2' className='p-0 grid' id='EmploymentStatus'>
          <JobInfo />
          {!isNew && (
            <>
              <EmployementStatus />
              <Divider />
            </>
          )}
        </TabPanel>
      </Suspense>

      <TabPanel value='3' className='p-0 grid' id='CompensationAndBenefits'>
        <Suspense fallback={<div>Loading...</div>}>
          <GovernmentDetails />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <PayrollInformation />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <AllowanceDetails />
        </Suspense>
        {/* <PayrollAccountDetails /> */}
        <Suspense fallback={<div>Loading...</div>}>
          <PayrollDetails />
        </Suspense>
      </TabPanel>

      <TabPanel value='4' className='p-0 grid' id='Leaves'>
        <LeaveBalances />
        <Divider />
        <UpcomingLeaves />
        <Divider />
        <History />
      </TabPanel>

      <TabPanel value='5' className='p-0 grid' id='Assets'>
        <AssetsTable />
      </TabPanel>

      <TabPanel value='6' className='p-0 grid' id='201Checklist'>
        <ChecklistTable />
      </TabPanel>
      <TabPanel value='7' className='p-0 grid' id='DisciplinaryActions'>
        Disciplinary Actions
      </TabPanel>
    </CustomCard>
  );
};

export default ProfileTabContent;
