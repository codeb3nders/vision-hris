import { TabList } from '@mui/lab';
import { Tab, Box } from '@mui/material';
import React, { useContext } from 'react';
import { ProfileCtx } from './profile.main';

type Props = {
  className?: string;
};

const ProfileTabs = ({ className }: Props) => {
  const { index, setIndex } = useContext(ProfileCtx);
  const a11yProps = (index: string) => {
    return {
      id: `profile-${index}`,
      'aria-controls': `profile-tabpanel-${index}`,
      value: index,
    };
  };

  return (
    <Box className={`mt-6 ${className} phone:mb-4`}>
      <TabList
        value={index}
        onChange={(event: React.SyntheticEvent, newValue: string) =>
          setIndex(newValue)
        }
        className='tab-list [&>div>.MuiTabs-indicator]:!bg-v-red'
        scrollButtons={true}
        variant='scrollable'
      >
        <Tab
          className={`p-1 px-3 text-xs ${index === '1' ? '!text-v-red' : ''}`}
          label='Personal'
          {...a11yProps('1')}
        />
        <Tab
          className={`p-1 px-3 text-xs ${index === '2' ? '!text-v-red' : ''}`}
          label='Employment'
          {...a11yProps('2')}
        />
        <Tab
          className={`p-1 px-3 text-xs ${index === '3' ? '!text-v-red' : ''}`}
          label='Emergency'
          {...a11yProps('3')}
        />
        <Tab
          className={`p-1 px-3 text-xs ${index === '4' ? '!text-v-red' : ''}`}
          label='Leaves'
          {...a11yProps('4')}
        />
        <Tab
          className={`p-1 px-3 text-xs ${index === '5' ? '!text-v-red' : ''}`}
          label='Assets'
          {...a11yProps('5')}
        />
        <Tab
          className={`p-1 px-3 text-xs ${index === '6' ? '!text-v-red' : ''}`}
          label='201 Checklist'
          {...a11yProps('6')}
        />
        <Tab
          className={`p-1 px-3 text-xs ${index === '7' ? '!text-v-red' : ''}`}
          label='Disciplinary Actions'
          {...a11yProps('7')}
        />
      </TabList>
    </Box>
  );
};

export default ProfileTabs;
