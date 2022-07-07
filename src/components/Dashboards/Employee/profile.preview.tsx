import React from 'react';
import CustomCard from 'CustomComponents/CustomCard';
import moment from 'moment';

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

const ProfilePreview: React.FC<Props> = () => {
  return (
    <CustomCard className='divide-y basis-1 min-w-max border border-white hover:border hover:border-slate-200'>
      <section className='flex flex-row space-x-2 items-center mb-2'>
        <img
          src='https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80'
          alt=''
          className='inline-block h-10 w-10 rounded-full '
        />
        <div>
          <div className='text-sm'>ABNE, MARK JAYVEN LLANERA</div>
          <div className='text-xs text-slate-500'>
            <small>Email:</small> jayven.abne@vcdcph.com
          </div>
          <div className='text-xs text-slate-500'>
            <small>Employee No:.</small> 0122
          </div>
        </div>
      </section>
      <section className='flex flex-col '>
        {details.map((d) => {
          return ProfileDetails({ title: d.title, value: d.value });
        })}
      </section>
    </CustomCard>
  );
};

const ProfileDetails = ({ title, value }) => {
  return (
    <>
      <div className='text-xs text-slate-500 mt-2'>{title}:</div>
      <div className='text-sm'>{value}</div>
    </>
  );
};

export default ProfilePreview;
