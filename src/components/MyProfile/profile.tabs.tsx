import { TabList } from '@mui/lab';
import { Tab, Box } from '@mui/material';
import React, { useContext } from 'react';
import { ProfileCtx } from './profile.main';

type Props = {};

const ProfileTabs = (props: Props) => {
  const { index, setIndex } = useContext(ProfileCtx);

  const a11yProps = (index: string) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };

  return (
    <Box className='mt-6'>
      <TabList
        value={index}
        onChange={(event: React.SyntheticEvent, newValue: string) =>
          setIndex(newValue)
        }
        aria-label='basic tabs example'
      >
        <Tab
          value='1'
          className='p-1 px-3 text-xs'
          label='Personal'
          {...a11yProps('1')}
        />
        <Tab
          value='2'
          className='p-1 px-3 text-xs'
          label='Employment'
          {...a11yProps('2')}
        />
        <Tab
          value='3'
          className='p-1 px-3 text-xs'
          label='Emergency'
          {...a11yProps('3')}
        />
        <Tab
          value='4'
          className='p-1 px-3 text-xs'
          label='Leaves'
          {...a11yProps('4')}
        />
        <Tab
          value='5'
          className='p-1 px-3 text-xs'
          label='Assets'
          {...a11yProps('5')}
        />
        <Tab
          value='6'
          className='p-1 px-3 text-xs'
          label='201 Checklist'
          {...a11yProps('6')}
        />
        <Tab
          value='7'
          className='p-1 px-3 text-xs'
          label='Disciplinary Actions'
          {...a11yProps('7')}
        />
      </TabList>
    </Box>
  );
};

export default ProfileTabs;
