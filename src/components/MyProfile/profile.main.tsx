/* eslint-disable react-hooks/exhaustive-deps */
import { TabContext } from '@mui/lab';
import { Alert, CircularProgress, Dialog, Snackbar } from '@mui/material';
import { updateEmployeeEndpoint } from 'apis/employees';
import { AppCtx } from 'App';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { EmployeeI } from 'slices/interfaces/employeeI';
import { initialState } from './employee.initialstate';
import ProfileDetails from './profile.details';
import ProfileOther from './profile.other';
import ProfileTabContent from './profile.tabcontent';
import ProfileTeam from './profile.team';
import { EmployeeCtx } from 'components/HRDashboard/EmployeeDatabase';
import {
  createEmployee,
  getEmployeeCreateStatus,
} from './../../slices/employees/createEmployeesSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  enumsStore,
  getOneEmployeeAction as _getOneEmployeeAction,
  getEmployeeStatusOne as _getOneEmployeeStatus,
  getEmployeeDetails as _getOneEmployeeDetails,
} from 'slices';

type Props = {
  isNew?: boolean;
  isView?: boolean;
  employeeNo?: string;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  myTeam?: any[];
};

export type ProfileModel = {
  index: string;
  setIndex: React.Dispatch<React.SetStateAction<string>>;
  isNew?: boolean;
  isView?: boolean;
  employeeDetails: EmployeeI;
  setEmployeeDetails: React.Dispatch<React.SetStateAction<EmployeeI>>;
  setDisplayPhoto: React.Dispatch<
    React.SetStateAction<{
      employeeNo: string;
      photo: string;
    }>
  >;
  displayPhoto: { employeeNo: string; photo: string };
  isOwner: boolean;
  enums: any;
  myTeam: any[] | undefined;
};

export const ProfileCtx = createContext<ProfileModel>({
  index: '1',
  setIndex: () => { },
  isNew: false,
  isView: false,
  employeeDetails: initialState,
  setEmployeeDetails: () => { },
  setDisplayPhoto: () => { },
  displayPhoto: {
    employeeNo: '',
    photo: '',
  },
  isOwner: false,
  enums: {},
  myTeam: []
});

const ProfileMain = ({ isNew, isView, employeeNo, setOpen, myTeam }: Props) => {
  const dispatch = useDispatch();

  const [index, setIndex] = useState<string>('0');
  const { isLoggedIn, userData, access_token } = useContext(AppCtx);
  const { setRefresh } = useContext(EmployeeCtx);
  const [employeeDetails, setEmployeeDetails] =
    useState<EmployeeI>(initialState);
  const [displayPhoto, setDisplayPhoto] = useState<{
    employeeNo: string;
    photo: string;
  }>({
    employeeNo: '',
    photo: '',
  });
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [enums, setEnums] = useState<any>({});
  const [displayPhotos, setDisplayPhotos] = useState<any[]>([]);

  const [openNotif, setOpenNotif] = useState<{
    message: string;
    status: boolean;
    severity: any;
  }>({ message: '', status: false, severity: '' });

  const [loading, setLoading] = useState<{ status: boolean; action: string }>({
    status: false,
    action: '',
  });
  const { enumsData } = useSelector(enumsStore)
  // Employees
  const getEmployeeStatus = useSelector(_getOneEmployeeStatus);
  const employeeData = useSelector(_getOneEmployeeDetails);

  useEffect(() => {
    if (access_token && employeeNo) {
      dispatch(_getOneEmployeeAction({ access_token, params: { employeeNo } }))
    }
  }, [access_token, employeeNo]);

  useEffect(() => {
    handleGetDisplayPhoto();
    setIndex('1');
    if (!isNew && isView) {
      setEmployeeDetails({ ...initialState, ...employeeData });
      if (employeeData?.employeeNo === userData.employeeNo) {
        setIsOwner(true);
      }
    } else if (!isNew && !isView) {
      setEmployeeDetails(userData || initialState);
    } else {
      setEmployeeDetails(initialState);
    }
  }, [employeeData, isLoggedIn, isNew, isView]);

  const handleEmployee = async () => {
    if (!employeeDetails.employeeNo && isNew) {
      saveEmployee();
    } else {
      updateEmployee();
    }
  };

  useEffect(() => {
    var positions: any = [], departments: any = [], ranks: any = [], civil_status: any = [], citizenship: any = [], religions: any = [], employment_status: any = [], locations: any = [], assets: any = [], file201: any = [], allowance_types: any = [], disciplinary_actions: any = [], employment_types: any = [];
    enumsData.forEach((o: any) => {
      switch (o.type.toLocaleLowerCase()) {
        case "position":
          positions.push(o);
          break;
        case "civil_status":
          civil_status.push(o);
          break;
        case "citizenship":
          citizenship.push(o);
          break;
        case "religion":
          religions.push(o);
          break;
        case "employment_status":
          employment_status.push(o);
          break;
        case "location":
          locations.push(o);
          break;
        case "department":
          departments.push(o);
          break;
        case "rank":
          ranks.push(o);
          break;
        case "asset":
          assets.push(o);
          break;
        case "201_file_types":
          file201.push(o);
          break;
        case "allowance_type":
          allowance_types.push(o);
          break;
        case "disciplinary_action":
          disciplinary_actions.push(o);
          break;
        case "employmentType":
          employment_types.push(o);
          break;
      }
    })
    setEnums({ positions, departments, ranks, civil_status, citizenship, religions, employment_status, locations, assets, file201, allowance_types, disciplinary_actions, employment_types })
  }, [enumsData])

  useEffect(() => {
    handleCompanyEmail();
    if (employeeDetails.employeeNo && displayPhotos?.length > 0) {
      const employee_dp = displayPhotos.filter(
        (dp) => dp.employeeNo === employeeDetails.employeeNo
      )[0];

      setDisplayPhoto(employee_dp);
    }
  }, [displayPhotos, employeeDetails]);

  const handleGetDisplayPhoto = () => {
    const local_dps: any = localStorage.getItem('display_photos');
    const dps = JSON.parse(local_dps);

    setDisplayPhotos(dps);
  };

  const handleCompanyEmail = () => {
    const { firstName, lastName, rank, companyEmail } = employeeDetails;
    if (rank === 'RANK AND FILE' && !companyEmail) {
      const companyEmail =
        `${firstName}${lastName}.vpdcph@gmail.com`.toLowerCase();
      setEmployeeDetails((employeeDetails: EmployeeI) => ({
        ...employeeDetails,
        companyEmail,
      }));
    }
  };

  const handleSaveDisplayPhoto = (employeeNo: string) => {
    localStorage.setItem(
      'display_photos',
      JSON.stringify(
        displayPhotos?.length > 0
          ? [
            {
              employeeNo,
              photo: displayPhoto.photo,
            },
            ...displayPhotos,
          ]
          : [
            {
              employeeNo,
              photo: displayPhoto.photo,
            },
          ]
      )
    );
  };

  const saveEmployee = async () => {
    setLoading({ status: true, action: 'Saving' });
    try {
      const response = await dispatch(createEmployee(employeeDetails));

      if (response.meta.requestStatus === 'fulfilled') {
        handleSaveDisplayPhoto(response.payload.employeeNo);
        setLoading({ status: false, action: '' });
        setRefresh(true);
        setOpenNotif({
          message: `${employeeDetails.firstName} ${employeeDetails.lastName} has been successfully added.`,
          status: true,
          severity: 'success',
        });

        setTimeout(() => {
          setRefresh(false);
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
        setDisplayPhoto,
        displayPhoto,
        isOwner,
        enums,
        myTeam
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
          className={`mt-4 grid gap-4 pb-0 w-full ${isNew ? '!pb-0' : ''}`}
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
              className={`laptop:col-span-9 desktop:col-span-9 phone:col-span-12 flex ${isNew
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
