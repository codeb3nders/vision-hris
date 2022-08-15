import { TabContext } from '@mui/lab';
import { createEmployeeEndpoint } from 'apis/employees';
import { AppCtx } from 'App';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { EmployeeI } from 'slices/interfaces/employeeI';
import { initialState } from './employee.initialstate';
import ProfileDetails from './profile.details';
import ProfileOther from './profile.other';
import ProfileTabContent from './profile.tabcontent';
import ProfileTeam from './profile.team';

type Props = {
  isNew?: boolean;
  isView?: boolean;
  userDetails?: EmployeeI;
};

export type ProfileModel = {
  index: string;
  setIndex: React.Dispatch<React.SetStateAction<string>>;
  isNew?: boolean;
  isView?: boolean;
  employeeDetails: any;
  setEmployeeDetails: React.Dispatch<React.SetStateAction<EmployeeI>>;
};

export const ProfileCtx = createContext<ProfileModel>({
  index: '1',
  setIndex: () => {},
  isNew: false,
  isView: false,
  employeeDetails: {},
  setEmployeeDetails: () => {},
});

const ProfileMain = ({ isNew, isView, userDetails }: Props) => {
  const [index, setIndex] = useState<string>('0');
  const { isLoggedIn } = useContext(AppCtx);
  const [employeeDetails, setEmployeeDetails] =
    useState<EmployeeI>(initialState);

  useEffect(() => {
    setIndex('1');
    if (!isNew && isView) {
      setEmployeeDetails(userDetails || initialState);
    } else if (!isNew && !isView) {
      setEmployeeDetails(isLoggedIn.userData || initialState);
    } else {
      setEmployeeDetails(initialState);
    }
  }, [userDetails, isLoggedIn, isNew, isView]);

  const handleSaveEmployeeDetails = async () => {
    try {
      const response = await createEmployeeEndpoint(employeeDetails);
      console.log({ response });
    } catch (error: any) {
      console.log(error.message);
    }
  };

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
            <button
              className='px-4 py-2 bg-green-500 text-white w-full'
              onClick={handleSaveEmployeeDetails}
            >
              Save Employee Profile
            </button>
          )}
        </section>
      </TabContext>
    </ProfileCtx.Provider>
  );
};

export default ProfileMain;
