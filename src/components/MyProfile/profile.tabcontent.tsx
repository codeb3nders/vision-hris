import { TabPanel } from '@mui/lab';
import { Divider } from '@mui/material';
import LeaveManagement from 'components/EmployeeDashboard/Management/LeaveManagement';
import { EmployeeCtx } from 'components/HRDashboard/EmployeeDatabase';
import CustomCard from 'CustomComponents/CustomCard';
import React, { useContext, lazy, Suspense } from 'react';
import ChecklistTable from './201Checklist/checklist.table';
import AssetsTable from './Assets/assets.table';
import DisciplinaryCases from './Disciplinary Cases/offenses.table';
import EmployementStatus from './EmploymentTab/employement.status';
import Leaves from './Leaves';
import History from './Leaves/history';
import LeaveBalances from './Leaves/leave.balances';
import UpcomingLeaves from './Leaves/pending.leaves';
import OB from './OfficialBusiness';
import OT from './Overtime';
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
const UserGroupAccess = lazy(() => import('./EmploymentTab/userAccessGroup'));
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

const SpecialTrainingsAttended = lazy(
  () => import('./LearningAndDevelopment/special.trainings.attended')
);

const EmployeeBenefits = lazy(
  () => import('./CompensationAndBenefits/employee.benefits')
);

type Props = {
  className?: string;
};

const ProfileTabContent = ({ className }: Props) => {
  const { isView, handleUpdateEmployee, updatedDetails, index, employeeDetails } = useContext(ProfileCtx);
  const { isNew } = useContext(EmployeeCtx);
  const employeesTabs = ["1", "3"]

  return (
    <CustomCard
      id='tab-content'
      className={`desktop:p-6 laptop:p-6 phone:p-0 !pt-0 w-full ${className}`}
    >
      <ProfileTabs className='phone:visible laptop:hidden desktop:hidden'/>

      {employeesTabs.indexOf(index) >= 0 && !isNew &&
        <div className='mb-2 flex flex-row justify-end'>
          <button
            disabled={!updatedDetails}
            onClick={handleUpdateEmployee}
            className='px-4 py-1 bg-green-500 hover:bg-green-400 transition-all duration-200 text-white disabled:bg-gray-300 disabled:cursor-not-allowed rounded-sm'
          >
            Save Changes
          </button>
        </div>
      }
      <div
        // className={
        //   isNew // || isView
        //     ? 'overflow-y-auto desktop:max-h-[450px] laptop:max-h-[450px] tablet:max-h-[450px] phone:max-h-[300px] desktop:min-h-[450px] laptop:min-h-[450px] tablet:min-h-[450px] phone:min-h-[300px]'
        //     : ''
        // }
      >
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
            {!isNew && <EmployementStatus />}
            {!isNew && <UserGroupAccess />}
          </TabPanel>
        </Suspense>

        <TabPanel value='3' className='p-0 grid' id='CompensationAndBenefits'>
          <Suspense fallback={<div>Loading...</div>}>
            <GovernmentDetails />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <EmployeeBenefits />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <PayrollInformation />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <AllowanceDetails />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <PayrollDetails />
          </Suspense>
        </TabPanel>

        <TabPanel value='4' className='p-0 grid' id='LearningAndDevelopment'>
          <Suspense fallback={<div>Loading...</div>}>
            <SpecialTrainingsAttended type='Attended' />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <SpecialTrainingsAttended type='Taught' />
          </Suspense>
        </TabPanel>

        <TabPanel value='5' className='p-0 grid' id='201File'>
          <ChecklistTable />
        </TabPanel>

        <TabPanel value='6' className='p-0 grid' id='Assets'>
          <AssetsTable />
        </TabPanel>

        <TabPanel value='7' className='p-0 grid' id='Leaves'>
          <LeaveManagement />
        </TabPanel>
        <TabPanel value='8' className='p-0 grid' id='OfficialBusiness'>
          <OB employeeNo={employeeDetails.employeeNo} isHRview />
        </TabPanel>
        <TabPanel value='9' className='p-0 grid' id='Overtime'>
          <OT employeeNo={employeeDetails.employeeNo} isHRview  />
        </TabPanel>
        <TabPanel value='10' className='p-0 grid' id='DisciplinaryCases'>
          <DisciplinaryCases />
        </TabPanel>
      </div>
    </CustomCard>
  );
};

export default ProfileTabContent;
