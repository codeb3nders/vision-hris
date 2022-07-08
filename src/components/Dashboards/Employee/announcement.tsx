import { ArrowRightAltOutlined } from '@mui/icons-material';
import moment from 'moment';
import React from 'react';

type Props = {};

const Announcement = (props: Props) => {
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
        {/* <p className='mt-2'>
          <i>REMINDER</i>: All concerned staff will be required to sign the
          Memorandum Receipt Form to be disseminated on-site by your respective
          Document Controllers. Failure and/or refusal to{' '}
          <p className='truncate'>
            sign the Memorandum Receipt Form until 5 days from the memorandum’s
            release date will be subject to disciplinary action as prescribed in
            our Company Code of Conduct
          </p>
          
        </p> */}
      </div>
    </div>
  );
};

export default Announcement;
