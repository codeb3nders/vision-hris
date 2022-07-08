import React from 'react';
import CustomCard from 'CustomComponents/CustomCard';
import moment from 'moment';
import { VISION_LOGO, VISION_LOGO_THICK } from 'assets';

type Props = {};

const details = [
  {
    title: 'Position',
    value: 'PLANNING & SCHEDULING MANAGER',
  },
  {
    title: 'Designation',
    value: 'HEAD OFFICE',
  },
  {
    title: 'Manager/Supervisor',
    value: 'Test Supervisor',
  },
  {
    title: `Today's Date`,
    value: moment(new Date()).format('LL'),
  },
];

export const ProfilePhoto =
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80';

const ProfilePreview: React.FC<Props> = () => {
  return (
    <CustomCard className='basis-1 min-w-max overflow-hidden group'>
      <>
        {/* <img
          src={VISION_LOGO_THICK}
          alt=''
          className='absolute top-[-55px] right-[-35%] w-[300px] z-0 opacity-20 group-hover:opacity-40 ease-in-out duration-500'
        /> */}
        <section className='flex flex-row space-x-2 items-center mb-2 relative z-10'>
          <img
            src={ProfilePhoto}
            alt=''
            className='inline-block h-12 w-12 rounded-full'
          />
          <div>
            <div className='text-sm  font-medium'>
              ABNE, MARK JAYVEN LLANERA
            </div>
            <div className='text-xs '>
              <small>Email:</small> jayven.abne@vcdcph.com
            </div>
            <div className='text-xs '>
              <small>Employee No:.</small> 0122
            </div>
          </div>
        </section>
        <section className='flex flex-col relative z-10'>
          {details.map((d) => {
            return ProfileDetails({ title: d.title, value: d.value });
          })}

          <button className='ease-in duration-150 w-full bg-v-red/10 text-v-red text-center text-xs rounded-md py-2 mt-4 hover:bg-v-red hover:text-white '>
            Go to My Profile
          </button>
        </section>
      </>
    </CustomCard>
  );
};

const ProfileDetails = ({ title, value }) => {
  return (
    <>
      <div className='text-xs  mt-2'>{title}:</div>
      <div className='text-sm  font-medium'>{value}</div>
    </>
  );
};

export default ProfilePreview;
