import { TabPanel } from '@mui/lab';
import { Divider } from '@mui/material';
import CustomCard from 'CustomComponents/CustomCard';
import React, { useContext } from 'react';
import ChecklistTable from './201Checklist/checklist.table';
import AssetsTable from './Assets/assets.table';
import Contacts from './Emergency/contacts';
import EmployementStatus from './EmploymentTab/employement.status';
import General from './EmploymentTab/general';
import JobInfo from './EmploymentTab/job.info';
import History from './Leaves/history';
import LeaveBalances from './Leaves/leave.balances';
import UpcomingLeaves from './Leaves/upcoming.leaves';
import ContactDetails from './PersonalProfileTab/contact.details';
import GovernmentDetails from './PersonalProfileTab/government.details';
import PayrollDetails from './PersonalProfileTab/payroll.details';
import Personal from './PersonalProfileTab/personal';
import { ProfileCtx } from './profile.main';
import ProfileTabs from './profile.tabs';

type Props = {
  className?: string;
};

const ProfileTabContent = ({ className }: Props) => {
  const { isNew } = useContext(ProfileCtx);
  return (
    <CustomCard
      id='tab-content'
      className={`${
        isNew
          ? 'desktop:max-h-[450px] laptop:max-h-[450px] tablet:max-h-[450px] phone:max-h-[300px] desktop:min-h-[450px] laptop:min-h-[450px] tablet:min-h-[450px] phone:min-h-[300px]'
          : ''
      } overflow-y-auto desktop:p-6 laptop:p-6 phone:p-0 ${className}`}
    >
      <ProfileTabs className='phone:visible laptop:hidden desktop:hidden' />

      <TabPanel value='1' className='p-0 grid' id='Personal'>
        <Personal />
        <Divider />
        <ContactDetails />
        <Divider />
        <GovernmentDetails />
        <Divider />
        <PayrollDetails />
      </TabPanel>

      <TabPanel value='2' className='p-0 grid' id='EmploymentStatus'>
        <General />
        <Divider />
        <EmployementStatus />
        <Divider />
        <JobInfo />
      </TabPanel>

      <TabPanel value='3' className='p-0 grid' id='Emergency'>
        <Contacts />
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
