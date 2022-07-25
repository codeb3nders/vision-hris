import { TabPanel } from '@mui/lab';
import CustomCard from 'CustomComponents/CustomCard';
import React from 'react';
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
      <TabPanel value='1' className='p-0 grid'>
        <Personal />
        <ContactDetails />
        <GovernmentDetails />
        <PayrollDetails />
      </TabPanel>
      <TabPanel value='2'>Employment</TabPanel>
      <TabPanel value='3'>Emergency</TabPanel>
      <TabPanel value='4'>Leaves</TabPanel>
      <TabPanel value='5'>Assets</TabPanel>
      <TabPanel value='6'>201 Checklist</TabPanel>
      <TabPanel value='7'>Disciplinary Actions</TabPanel>
    </CustomCard>
  );
};

export default ProfileTabContent;
