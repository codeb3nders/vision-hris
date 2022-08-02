/* eslint-disable react-hooks/exhaustive-deps */
import { TabList } from '@mui/lab';
import { Tab, Box } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { ProfileCtx } from './profile.main';

type Props = {
  className?: string;
};

const ProfileTabs = ({ className }: Props) => {
  const { index, setIndex } = useContext(ProfileCtx);
  const [isMobile, setIsMobile] = useState(false);

  const a11yProps = (index: string) => {
    return {
      id: `profile-${index}`,
      'aria-controls': `profile-tabpanel-${index}`,
      value: index,
    };
  };

  useEffect(() => {
    window.addEventListener('resize', (e: any) => {
      console.log(e.target.innerWidth);
      if (e.target.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    });
  }, [window]);

  useEffect(() => {
    console.log({ isMobile });
  }, [isMobile]);

  return (
    <Box
      className={`mt-8 ${className} phone:mb-4 tablet:mb-4 laptop:mb-0 desktop:mb-0`}
    >
      <TabList
        value={index}
        onChange={(event: React.SyntheticEvent, newValue: string) =>
          setIndex(newValue)
        }
        className={`tab-list [&>div>.MuiTabs-indicator]:!bg-v-red ${
          isMobile ? 'border-b border-gray-200' : ''
        }`}
        scrollButtons={isMobile}
        variant={isMobile ? 'scrollable' : 'fullWidth'}
      >
        <Tab
          className={`p-1 px-0 tablet:text-[0.55rem] phone:text-[0.55rem] laptop:text-[.65rem] desktop:text-[.65rem] ${
            index === '1' ? '!text-v-red' : ''
          }`}
          label='Personal'
          {...a11yProps('1')}
        />
        <Tab
          className={`p-1 px-0 tablet:text-[0.55rem] phone:text-[0.55rem] laptop:text-[.65rem] desktop:text-[.65rem] ${
            index === '2' ? '!text-v-red' : ''
          }`}
          label='Employment'
          {...a11yProps('2')}
        />
        <Tab
          className={`p-1 px-0 tablet:text-[0.55rem] phone:text-[0.55rem] laptop:text-[.65rem] desktop:text-[.65rem] ${
            index === '3' ? '!text-v-red' : ''
          }`}
          label='Emergency'
          {...a11yProps('3')}
        />
        <Tab
          className={`p-1 px-0 tablet:text-[0.55rem] phone:text-[0.55rem] laptop:text-[.65rem] desktop:text-[.65rem] ${
            index === '4' ? '!text-v-red' : ''
          }`}
          label='Leaves'
          {...a11yProps('4')}
        />
        <Tab
          className={`p-1 px-0 tablet:text-[0.55rem] phone:text-[0.55rem] laptop:text-[.65rem] desktop:text-[.65rem] ${
            index === '5' ? '!text-v-red' : ''
          }`}
          label='Assets'
          {...a11yProps('5')}
        />
        <Tab
          className={`p-1 px-0 tablet:text-[0.55rem] phone:text-[0.55rem] laptop:text-[.65rem] desktop:text-[.65rem] ${
            index === '6' ? '!text-v-red' : ''
          }`}
          label='201 Checklist'
          {...a11yProps('6')}
        />
        <Tab
          className={`p-1 px-0 tablet:text-[0.55rem] phone:text-[0.55rem] laptop:text-[.65rem] desktop:text-[.65rem] ${
            index === '7' ? '!text-v-red' : ''
          }`}
          label='Disciplinary Actions'
          disabled
          {...a11yProps('7')}
        />
      </TabList>
    </Box>
  );
};

export default ProfileTabs;
