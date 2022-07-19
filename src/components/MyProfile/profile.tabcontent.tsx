import { TabPanel } from '@mui/lab';
import CustomCard from 'CustomComponents/CustomCard';
import React from 'react';

type Props = {
  className?: string;
};

const ProfileTabContent = ({ className }: Props) => {
  return (
    <CustomCard className={`${className}`}>
      <TabPanel value='1'>Personal</TabPanel>
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
