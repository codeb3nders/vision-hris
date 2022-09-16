/* eslint-disable react-hooks/exhaustive-deps */
import { TabList } from '@mui/lab';
import { Tab, Box } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { ProfileCtx } from './profile.main';

type Props = {
  className?: string;
};

const ProfileTabs = ({ className }: Props) => {
  const { index, setIndex, isNew } = useContext(ProfileCtx);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window.addEventListener('resize', (e: any) => {
      if (e.target.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    });
  }, [window]);

  return isNew ? (
    <HRTabs
      className={className}
      index={index}
      setIndex={setIndex}
      isMobile={isMobile}
    />
  ) : (
    <EmployeeTabs
      className={className}
      index={index}
      setIndex={setIndex}
      isMobile={isMobile}
    />
  );
};

const HRTabs = ({ className, index, setIndex, isMobile }) => {
  const a11yProps = (index: string) => {
    return {
      id: `profile-${index}`,
      'aria-controls': `profile-tabpanel-${index}`,
      value: index,
    };
  };

  return (
    <Box
      className={`${className} phone:mb-4 tablet:mb-4 laptop:mb-0 desktop:mb-0`}
    >
      <TabList
        value={index}
        onChange={(event: React.SyntheticEvent, newValue: string) =>
          setIndex(newValue)
        }
        className={`tab-list [&>div>.MuiTabs-indicator]:!bg-v-red ${
          isMobile ? 'border-b border-gray-200' : ''
        }`}
        scrollButtons={true}
        // scrollButtons={isMobile}
        // variant={'scrollable'}
        variant={isMobile ? 'scrollable' : 'fullWidth'}
      >
        <Tab
          className={`p-1 px-0 tablet:text-[0.55rem] phone:text-[0.55rem] laptop:text-[.65rem] desktop:text-[.65rem] flex-1 ${
            index === '1' ? '!text-v-red' : ''
          }`}
          label='Personal'
          {...a11yProps('1')}
          id='personal-tab'
          key='personal-tab'
          itemID='personal-tab'
        />
        <Tab
          className={`employment-tab p-1 px-0 tablet:text-[0.55rem] phone:text-[0.55rem] laptop:text-[.65rem] desktop:text-[.65rem] flex-1 ${
            index === '2' ? '!text-v-red' : ''
          }`}
          label='Employment'
          {...a11yProps('2')}
          id='employment-tab'
          key='employment-tab'
          itemID='employment-tab'
        />
        <Tab
          className={`p-1 px-0 tablet:text-[0.55rem] phone:text-[0.55rem] laptop:text-[.65rem] desktop:text-[.65rem] flex-1 ${
            index === '3' ? '!text-v-red' : ''
          }`}
          label='Compensation and Benefits'
          {...a11yProps('3')}
          id='compensation-tab'
          key='compensation-tab'
          itemID='compensation-tab'
        />
      </TabList>
    </Box>
  );
};

const EmployeeTabs = ({ className, index, setIndex, isMobile }) => {
  const a11yProps = (index: string) => {
    return {
      id: `profile-${index}`,
      'aria-controls': `profile-tabpanel-${index}`,
      value: index,
    };
  };

  return (
    <Box
      className={`${className} phone:mb-4 tablet:mb-4 laptop:mb-0 desktop:mb-0`}
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
          label='Compensation and Benefits'
          {...a11yProps('3')}
        />
        <Tab
          className={`p-1 px-0 tablet:text-[0.55rem] phone:text-[0.55rem] laptop:text-[.65rem] desktop:text-[.65rem] ${
            index === '4' ? '!text-v-red' : ''
          }`}
          label='Learning and Development'
          {...a11yProps('4')}
        />
        <Tab
          className={`p-1 px-0 tablet:text-[0.55rem] phone:text-[0.55rem] laptop:text-[.65rem] desktop:text-[.65rem] ${
            index === '5' ? '!text-v-red' : ''
          }`}
          label='201 File'
          {...a11yProps('5')}
        />
        <Tab
          className={`p-1 px-0 tablet:text-[0.55rem] phone:text-[0.55rem] laptop:text-[.65rem] desktop:text-[.65rem] ${
            index === '6' ? '!text-v-red' : ''
          }`}
          label='Asset Management'
          {...a11yProps('6')}
        />
        <Tab
          className={`p-1 px-0 tablet:text-[0.55rem] phone:text-[0.55rem] laptop:text-[.65rem] desktop:text-[.65rem] ${
            index === '7' ? '!text-v-red' : ''
          }`}
          label='Leaves'
          {...a11yProps('7')}
        />
        <Tab
          className={`p-1 px-0 tablet:text-[0.55rem] phone:text-[0.55rem] laptop:text-[.65rem] desktop:text-[.65rem] ${
            index === '8' ? '!text-v-red' : ''
          }`}
          label='Official Business'
          {...a11yProps('8')}
        />
        <Tab
          className={`p-1 px-0 tablet:text-[0.55rem] phone:text-[0.55rem] laptop:text-[.65rem] desktop:text-[.65rem] ${
            index === '9' ? '!text-v-red' : ''
          }`}
          label='Overtime'
          {...a11yProps('9')}
        />
        <Tab
          className={`p-1 px-0 tablet:text-[0.55rem] phone:text-[0.55rem] laptop:text-[.65rem] desktop:text-[.65rem] ${
            index === '10' ? '!text-v-red' : ''
          }`}
          label='Disciplinary Cases'
          {...a11yProps('10')}
        />
      </TabList>
    </Box>
  );
};

export default ProfileTabs;
