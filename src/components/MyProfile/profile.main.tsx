import { TabContext } from '@mui/lab';
import { Alert, CircularProgress, Dialog, Snackbar } from '@mui/material';
import { createEmployeeEndpoint, updateEmployeeEndpoint } from 'apis/employees';
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
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
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

const ProfileMain = ({ isNew, isView, userDetails, setOpen }: Props) => {
  const [index, setIndex] = useState<string>('0');
  const { isLoggedIn } = useContext(AppCtx);
  const [employeeDetails, setEmployeeDetails] =
    useState<EmployeeI>(initialState);

  const [openNotif, setOpenNotif] = useState<{
    message: string;
    status: boolean;
    severity: any;
  }>({ message: '', status: false, severity: '' });

  const [loading, setLoading] = useState<{ status: boolean; action: string }>({
    status: false,
    action: '',
  });

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

  const handleEmployee = async () => {
    if (!employeeDetails.employeeNo && isNew) {
      saveEmployee();
    } else {
      updateEmployee();
    }
  };

  const saveEmployee = async () => {
    setLoading({ status: true, action: 'Saving' });
    try {
      const response = await createEmployeeEndpoint(employeeDetails);

      if (response.status === 201) {
        setLoading({ status: false, action: '' });
        // setRefresh(true);
        setOpenNotif({
          message: `${employeeDetails.firstName} ${employeeDetails.lastName} has been successfully added.`,
          status: true,
          severity: 'success',
        });

        setTimeout(() => {
          // setRefresh(false);
          setOpenNotif({
            message: '',
            status: false,
            severity: 'success',
          });
          setOpen && setOpen(false);
        }, 2000);
      } else {
        setLoading({ status: false, action: '' });
        setOpenNotif({
          message: `Something's wrong.`,
          status: true,
          severity: 'error',
        });
      }
      console.log({ response });
    } catch (error: any) {
      setLoading({ status: false, action: '' });
      console.log(error);
    }
  };

  const updateEmployee = async () => {
    try {
      const response = await updateEmployeeEndpoint(
        employeeDetails,
        employeeDetails.employeeNo
      );
      console.log({ response });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProfileCtx.Provider
      value={{
        index,
        setIndex,
        isNew,
        setEmployeeDetails,
        employeeDetails,
        isView,
      }}
    >
      <Dialog open={loading.status}>
        <div className='p-4 pt-6 flex flex-col items-center justify-center'>
          <CircularProgress />
          <p className='mt-2'>{loading.action} Employee Details.</p>
        </div>
      </Dialog>

      <Snackbar
        autoHideDuration={2000}
        open={openNotif.status}
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
      >
        <Alert severity={openNotif.severity}>{openNotif.message}</Alert>
      </Snackbar>

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
        </section>
        {(isNew || isView) && (
          <button
            className='px-4 py-2 bg-green-500 text-white w-full absolute bottom-0 left-0 z-10'
            onClick={handleEmployee}
          >
            {isNew ? 'Save' : 'Update'} Employee Profile
          </button>
        )}
      </TabContext>
    </ProfileCtx.Provider>
  );
};

export default ProfileMain;
