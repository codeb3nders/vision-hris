import { TabContext } from '@mui/lab';
import React, { createContext, useState } from 'react';
import ProfileDetails from './profile.details';
import ProfileOther from './profile.other';
import ProfileTabContent from './profile.tabcontent';
import ProfileTeam from './profile.team';

type Props = {};

type ProfileModel = {
  index: string;
  setIndex: React.Dispatch<React.SetStateAction<string>>;
};

export const ProfileCtx = createContext<ProfileModel>({
  index: '1',
  setIndex: () => {},
});

const ProfileMain = (props: Props) => {
  const [index, setIndex] = useState<string>('1');

  return (
    <ProfileCtx.Provider value={{ index, setIndex }}>
      <TabContext value={index}>
        <section className='mt-4 grid gap-4'>
          <ProfileDetails />
          <section className='grid grid-cols-12 w-full gap-4'>
            <article className='col-span-3 grid gap-4'>
              <ProfileOther />
              <ProfileTeam />
            </article>

            <article className='col-span-9 flex'>
              <ProfileTabContent className='self-stretch' />
            </article>
          </section>
        </section>
      </TabContext>
    </ProfileCtx.Provider>
  );
};

export default ProfileMain;
