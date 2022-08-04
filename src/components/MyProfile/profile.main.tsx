import { TabContext } from '@mui/lab';
import React, { createContext, useState } from 'react';
import ProfileDetails from './profile.details';
import ProfileOther from './profile.other';
import ProfileTabContent from './profile.tabcontent';
import ProfileTeam from './profile.team';

type Props = {
  isNew?: boolean;
};

export type ProfileModel = {
  index: string;
  setIndex: React.Dispatch<React.SetStateAction<string>>;
  isNew?: boolean;
  employeeDetails: any;
  setEmployeeDetails: React.Dispatch<React.SetStateAction<{}>>;
};

export const ProfileCtx = createContext<ProfileModel>({
  index: '1',
  setIndex: () => {},
  isNew: false,
  employeeDetails: {},
  setEmployeeDetails: () => {},
});

const ProfileMain = ({ isNew }: Props) => {
  const [index, setIndex] = useState<string>('1');
  const [employeeDetails, setEmployeeDetails] = useState({});

  return (
    <ProfileCtx.Provider
      value={{ index, setIndex, isNew, setEmployeeDetails, employeeDetails }}
    >
      <TabContext value={index}>
        <section
          className={`mt-4 grid gap-4 pb-10 w-full ${isNew ? '!pb-0' : ''}`}
        >
          <ProfileDetails />
          <section className='grid grid-cols-12 w-full gap-4'>
            {!isNew && (
              <article className='laptop:col-span-3 desktop:col-span-3 phone:col-span-12 grid gap-4 self-start'>
                <ProfileOther />
                <ProfileTeam />
              </article>
            )}

            <article
              className={`laptop:col-span-9 desktop:col-span-9 phone:col-span-12 flex ${
                isNew
                  ? 'laptop:col-span-12 desktop:col-span-12 phone:col-span-12 desktop:p-4 laptop:p-4 phone:p-0'
                  : ''
              }`}
            >
              <ProfileTabContent className='self-stretch' />
            </article>
          </section>
          {isNew && (
            <button className='px-4 py-2 bg-green-500 text-white w-full'>
              Save Employee Profile
            </button>
          )}
        </section>
      </TabContext>
    </ProfileCtx.Provider>
  );
};

export default ProfileMain;
