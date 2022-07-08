import React, { useContext } from 'react';
import CustomCard from 'CustomComponents/CustomCard';
import { AppCtx } from './../../../App';
import moment from 'moment';
import { WELCOME } from 'assets';
import Announcement from './announcement';
import { ChevronLeftOutlined, ChevronRightOutlined } from '@mui/icons-material';

type Props = {};

const Welcome = (props: Props) => {
  const { isLoggedIn } = useContext(AppCtx);
  return (
    <CustomCard className='bg-v-red/100 w-full py-6 px-20 mb-4 '>
      <img
        src={WELCOME}
        alt=''
        className='absolute right-0 bottom-0 h-[98%] md:visible lg:visible xl:visible 2xl:visible sm:invisible sm:opacity-50 md:opacity-100 lg:opacity-100 z-0'
      />
      <h2 className='text-white font-medium text-2xl relative z-10'>
        Welcome, Kabalikat!
      </h2>

      <div className='translate-x-[-24px] mt-2 max-w-[75%] relative z-10 flex flex-row text-white items-stretch justify-center'>
        <button className='translate-x-[-24px] text-white/70 hover:text-white ease-in duration-200'>
          <ChevronLeftOutlined />
        </button>
        <Announcement />
        <button className='text-white/70 hover:text-white ease-in duration-200'>
          <ChevronRightOutlined />
        </button>
      </div>
    </CustomCard>
  );
};

export default Welcome;
