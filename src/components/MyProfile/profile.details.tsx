import { PhotoCameraOutlined } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import { ProfilePhoto } from 'components/Dashboards/Employee/profile.preview';
import CustomCard from 'CustomComponents/CustomCard';
import React from 'react';
import ProfileTabs from './profile.tabs';

type Props = {};

const ProfileDetails = (props: Props) => {
  return (
    <CustomCard className='grid grid-cols-12 pb-0 phone:pb-4 tablet:pb-0 laptop:pb-0 desktop:pb-0'>
      <section className='laptop:col-span-3 desktop:col-span-3 tablet:col-span-3 phone:col-span-12 flex items-center justify-center'>
        <div className='relative pb-5'>
          <Avatar src={ProfilePhoto} className='w-[130px] h-[130px] relative' />
          <div className='cursor-pointer absolute bottom-[16px] right-[10px] z-10 w-[36px] h-[36px] bg-white/75 rounded-full flex items-center justify-center'>
            <PhotoCameraOutlined className='text-gray-500 hover:text-black' />
          </div>
        </div>
      </section>
      <section className='laptop:col-span-9 desktop:col-span-9 tablet:col-span-9 phone:col-span-12 phone:text-xs flex flex-col justify-center phone:text-center tablet:text-left laptop:text-left desktop:text-left'>
        <p className='font-bold text-xl phone:text-sm mb-4'>
          ABNE, MARK JAYVEN LLANERA{' '}
          <span className='ml-1 px-2 py-1 bg-v-red text-white rounded-md text-xs'>
            0122
          </span>
        </p>
        <p className='text-sm '>PLANNING & SCHEDULING MANAGER </p>
        <p className='text-gray-500'>
          Started on April 17, 2019 (3.2 years ago)
        </p>

        <ProfileTabs className='phone:hidden laptop:block desktop:block tablet:hidden ' />
      </section>
    </CustomCard>
  );
};

export default ProfileDetails;
