import { Add, ArrowRightAltOutlined } from '@mui/icons-material';
import React, { useContext } from 'react';
import { WelcomeCtx } from './welcome';

var moment = require('moment-business-days');
type Props = {};

const Announcement = (props: Props) => {
  const { index } = useContext(WelcomeCtx);
  return (
    <div className='text-white'>
      <small className='text-xs text-white/60'>{moment().format('L')}</small>
      <h4 className='text-sm font-bold'>MEMORANDUM CIRCULAR</h4>
      <h6 className='text-sm'>ATTENTION TO ALL EMPLOYEES AND WORKERS</h6>

      <div className='text-xs mt-2'>
        <p>
          In observance of Presidential Proclamation No. 2, please be advised
          that <strong>July 9, 2022 - Eid'l Adha, is a Regular Holiday.</strong>
        </p>
        <p className='mt-1'>
          For more information, please see{' '}
          <a
            className='underline font-bold'
            target='_blank'
            rel='noreferrer'
            href='https://drive.google.com/file/d/1x54Lq2HD93U2CbUdxTqV7dVFk0YpKCMX/view?usp=sharing'
          >
            Memorandum Circular VPDC.1.102.2022.009.038.
          </a>
        </p>
        <a href='#' className='font-bold'>
          Read More <ArrowRightAltOutlined />
        </a>
      </div>

      {index === 1 && (
        <button className='tablet:hidden laptop:hidden phone:w-full phone:max-w-full phone:mt-4 tablet:max-w-[175px] desktop:hidden flex items-center phone:block col-span-1 justify-self-end bg-white text-v-red py-1 px-2 rounded-md text-xs'>
          <Add fontSize='small' /> Post New Announcement
        </button>
      )}
    </div>
  );
};

export default Announcement;
