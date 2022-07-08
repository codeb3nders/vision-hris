import React, { useContext } from 'react';
import CustomCard from 'CustomComponents/CustomCard';
import { AppCtx } from './../../../App';
import moment from 'moment';
import { WELCOME } from 'assets';
import Announcement from './sample_announcement';
import { ChevronLeftOutlined, ChevronRightOutlined } from '@mui/icons-material';

type Props = {
  className?: string;
};

const Welcome: React.FC<Props> = ({ className }) => {
  const { isLoggedIn } = useContext(AppCtx);
  return (
    <CustomCard
      className={`bg-v-red/100 w-full py-6 tablet:px-20 laptop:px-20 desktop:px-20 phone:px-4 ${className}`}
    >
      <img
        src={WELCOME}
        alt=''
        className='select-none absolute right-0 bottom-0 tablet:h-[60%] laptop:h-[98%] phone:h-[40%] z-0'
      />
      <h2 className='text-white font-medium text-2xl relative z-10'>
        Welcome, Kabalikat!
      </h2>

      <div className='tablet:translate-x-[-24px] laptop:translate-x-[-24px] desktop:translate-x-[-24px] phone:translate-x-0 mt-2 tablet:laptop:max-w-[75%] phone:max-w-[100%] w-full relative z-10 flex flex-row text-white items-stretch justify-center'>
        <button className='tablet:translate-x-[-24px] phone:translate-x-0  text-white/70 hover:text-white ease-in duration-200'>
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
