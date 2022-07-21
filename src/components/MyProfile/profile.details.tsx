import { PhotoCameraOutlined } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import { ProfilePhoto } from 'components/Dashboards/Employee/profile.preview';
import CustomCard from 'CustomComponents/CustomCard';
import React from 'react';
import ProfileTabs from './profile.tabs';

type Props = {};

const ProfileDetails = (props: Props) => {
  return (
    <CustomCard className='grid grid-cols-12 pb-0'>
      <section className='col-span-3 flex items-center justify-center pb-6'>
        <div className='relative'>
          <Avatar src={ProfilePhoto} className='w-[130px] h-[130px] relative' />
          <div className='cursor-pointer absolute bottom-[0px] right-[0px] z-10 w-[36px] h-[36px] bg-white/75 rounded-full flex items-center justify-center'>
            <PhotoCameraOutlined className='text-gray-500 hover:text-black' />
          </div>
        </div>
      </section>
      <section className='col-span-9'>
        <p className='font-bold text-xl mb-4'>
          ABNE, MARK JAYVEN LLANERA{' '}
          <span className='ml-1 px-2 py-1 bg-v-red text-white rounded-md text-xs'>
            0122
          </span>
        </p>
        <p className='text-sm'>PLANNING & SCHEDULING MANAGER </p>
        <p className='text-gray-500'>
          Started on April 17, 2019 (3.2 years ago)
        </p>

        <ProfileTabs />
      </section>
    </CustomCard>
  );
};

export default ProfileDetails;
