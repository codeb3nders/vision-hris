import React, { useEffect, useRef, useState } from 'react';
import CustomCard from 'CustomComponents/CustomCard';
import { WELCOME } from 'assets';
import {
  Add,
  ChevronLeftOutlined,
  ChevronRightOutlined,
} from '@mui/icons-material';
import SwipeableViews from 'react-swipeable-views';

type Props = {
  className?: string;
  profile: any;
  announcements: any;
};

const Welcome: React.FC<Props> = ({ className, profile, announcements }) => {
  const [index, setIndex] = useState<number>(0);

  const swipeRef: any = useRef(null);

  useEffect(() => {
    console.log({ index });
  }, [index]);

  const handleIndex = (direction: string) => {
    console.log({ swipre_ref: swipeRef.current });

    switch (direction) {
      case 'left':
        if (index > 0) {
          setIndex(index - 1);
        }
        break;
      case 'right':
        console.log(swipeRef?.current?.props.children.length);

        if (index < swipeRef?.current?.props.children.length - 1) {
          setIndex(index + 1);
        }
        break;

      default:
        break;
    }
  };

  return (
    <CustomCard
      className={`relative bg-v-red/100 w-full py-6 tablet:px-20 laptop:px-20 desktop:px-20 phone:px-4 ${className}`}
    >
      <div className='grid grid-cols-3 w-full items-center'>
        <h2 className='col-span-2 text-white font-medium text-2xl relative z-10'>
          Welcome, Kabalikat!
        </h2>
      </div>

      <button className='absolute flex items-center right-[14px] top-[14px] col-span-1 justify-self-end bg-white text-v-red py-1 px-2 rounded-md text-xs'>
        <Add fontSize='small' /> Post New Announcement
      </button>

      <div className='tablet:translate-x-[-24px] laptop:translate-x-[-24px] desktop:translate-x-[-24px] phone:translate-x-0 mt-2 tablet:laptop:max-w-[75%] phone:max-w-[100%] w-full relative z-10 flex flex-row text-white items-stretch justify-center'>
        <button
          onClick={() => handleIndex('left')}
          className={`tablet:translate-x-[-24px] phone:translate-x-0  text-white/70 hover:text-white ease-in duration-200 ${
            index === 0 ? 'hidden' : ''
          }`}
        >
          <ChevronLeftOutlined />
        </button>

        <SwipeableViews index={index} ref={swipeRef}>
          {profile}
          {announcements}
          {/* <ProfilePreview />
          <Announcement /> */}
        </SwipeableViews>

        <button
          onClick={() => handleIndex('right')}
          className={`text-white/70 hover:text-white ease-in duration-200 ${
            index === swipeRef?.current?.props.children.length - 1
              ? 'hidden'
              : ''
          }`}
        >
          <ChevronRightOutlined />
        </button>
      </div>
      <img
        src={WELCOME}
        alt=''
        className='select-none absolute right-0 bottom-0 tablet:h-[50%] laptop:h-[75%] phone:h-[40%] z-0'
      />

      {/* <div className='text-white/80 text-sm mt-4'>
        {moment(new Date()).format('LL')}
      </div> */}
    </CustomCard>
  );
};

export default Welcome;
