import { TabPanel } from '@mui/lab';
import { Divider } from '@mui/material';
import CustomCard from 'CustomComponents/CustomCard';
import { useContext } from 'react';
import ChecklistTable from './201Checklist/checklist.table';
import AssetsTable from './Assets/assets.table';
import AllowanceDetails from './CompensationAndBenefits/allowance.details';
import PayrollInformation from './CompensationAndBenefits/payroll.information';
import Contacts from './Emergency/contacts';
import EmployementStatus from './EmploymentTab/employement.status';
import JobInfo from './EmploymentTab/job.info';
import History from './Leaves/history';
import LeaveBalances from './Leaves/leave.balances';
import UpcomingLeaves from './Leaves/upcoming.leaves';
import Certificates from './PersonalProfileTab/certificates';
import Education from './PersonalProfileTab/education';
import EmployementRecord from './PersonalProfileTab/employement.record';
import FamilyBackground from './PersonalProfileTab/family.background';
import GovernmentDetails from './PersonalProfileTab/government.details';
import Licensure from './PersonalProfileTab/licensure';
import PayrollDetails from './PersonalProfileTab/payroll.details';
import Personal from './PersonalProfileTab/personal';
import { ProfileCtx } from './profile.main';
import ProfileTabs from './profile.tabs';

type Props = {
  className?: string;
};

const ProfileTabContent = ({ className }: Props) => {
  const { isNew, isView } = useContext(ProfileCtx);
  return (
    <CustomCard
      id='tab-content'
      className={`${isNew || isView
        ? 'desktop:max-h-[450px] laptop:max-h-[450px] tablet:max-h-[450px] phone:max-h-[300px] desktop:min-h-[450px] laptop:min-h-[450px] tablet:min-h-[450px] phone:min-h-[300px]'
        : ''
        } overflow-y-auto desktop:p-6 laptop:p-6 phone:p-0 !pb-12 !pt-0 ${className}`}
    >
      <ProfileTabs className='phone:visible laptop:hidden desktop:hidden' />

      <TabPanel value='1' className='p-0 grid' id='Personal'>
        <Personal />
        <Education />
        <EmployementRecord />
        <Licensure />
        <Certificates />
        <FamilyBackground />
        <Contacts />
      </TabPanel>

      <TabPanel value='2' className='p-0 grid' id='EmploymentStatus'>
        <JobInfo />
        {!isNew && (
          <>
            <EmployementStatus />
            <Divider />
          </>
        )}
      </TabPanel>

      <TabPanel value='3' className='p-0 grid' id='CompensationAndBenefits'>
        <GovernmentDetails />
        <PayrollInformation />
        <AllowanceDetails />
        <PayrollDetails />
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
