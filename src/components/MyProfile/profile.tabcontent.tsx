import { TabPanel } from '@mui/lab';
import CustomCard from 'CustomComponents/CustomCard';
import React from 'react';
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
import ProfileTabs from './profile.tabs';

type Props = {
  className?: string;
};

const ProfileTabContent = ({ className }: Props) => {
  return (
    <CustomCard className={` ${className}`}>
      <ProfileTabs className='phone:visible laptop:hidden desktop:hidden' />

      <TabPanel value='1' className='p-0 grid' id='Personal'>
        <Personal />
        <ContactDetails />
        <GovernmentDetails />
        <PayrollDetails />
      </TabPanel>

      <TabPanel value='2' className='p-0 grid' id='EmploymentStatus'>
        <General />
        <EmployementStatus />
        <JobInfo />
      </TabPanel>

      <TabPanel value='3' className='p-0 grid' id='Emergency'>
        <Contacts />
      </TabPanel>

      <TabPanel value='4' className='p-0 grid' id='Leaves'>
        <LeaveBalances />
        <UpcomingLeaves />
        <History />
      </TabPanel>

      <TabPanel value='5' className='p-0 grid' id='Assets'>
        Assets
      </TabPanel>

      <TabPanel value='6' className='p-0 grid' id='201Checklist'>
        201 Checklist
      </TabPanel>
      <TabPanel value='7' className='p-0 grid' id='DisciplinaryActions'>
        Disciplinary Actions
      </TabPanel>
    </CustomCard>
  );
};

export default ProfileTabContent;
