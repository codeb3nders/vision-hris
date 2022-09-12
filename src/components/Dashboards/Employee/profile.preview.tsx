import { AppCtx } from 'App';
import React, { useContext } from 'react';
import { getAvatar } from 'utils/functions';

export const ProfilePhoto =
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80';

type Props = {
  className?: string;
};

const ProfilePreview: React.FC<Props> = () => {
  const { userData } = useContext(AppCtx);
  console.log({userData})
  return (
    <div className='pl-6'>
      <section className='flex flex-row space-x-2 items-center mb-1 relative z-10 '>
        <img
          src={getAvatar(userData.gender?.code)}
          alt=''
          className='inline-block h-12 w-12 rounded-full'
        />
        <div>
          <div className='text-sm  font-medium'>{userData.firstName} {userData.lastName}</div>
          <div className='text-xs '>
            <small>Email:</small> {userData.companyEmail}
          </div>
          <div className='text-xs '>
            <small>Employee No:.</small> {userData.employeeNo}
          </div>
        </div>
      </section>
      <section className='flex flex-col relative z-10'>
        <div>
          <div className='text-xs  mt-2'>Position:</div>
          <div className='text-sm  font-medium'>
            {userData.position.name}
          </div>
        </div>

        <div className='grid grid-cols-12 gap-4 space-y-0'>
          <div className='phone:col-span-6 tablet:col-span-4'>
            <div className='text-xs  mt-2'>Location:</div>
            <div className='text-sm  font-medium'>{userData.location.map((o:any) => o.name).join(", ")}</div>
          </div>
          <div className='phone:col-span-6 tablet:col-span-4'>
            <div className='text-xs  mt-2'>Reports To:</div>
            <div className='text-sm  font-medium'>{userData.reportsTo?.employeeName}</div>
          </div>
          <button
            type='button'
            className='tablet:col-span-4 phone:col-span-12 ease-in duration-150 w-full bg-white text-v-red text-center self-start text-xs rounded-md py-1 mt-2 hover:bg-white/90 '
          >
            Go to My Profile
          </button>
        </div>
      </section>
    </div>
  );
};

export default ProfilePreview;
