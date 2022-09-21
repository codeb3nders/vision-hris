/* eslint-disable react-hooks/exhaustive-deps */
import { TabContext } from '@mui/lab';
import {
  Alert,
  Badge,
  CircularProgress,
  Dialog,
  Snackbar,
} from '@mui/material';
import { AppCtx, consoler } from 'App';
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  lazy,
  Suspense,
  useMemo,
  useCallback,
} from 'react';
import { EmployeeI } from 'slices/interfaces/employeeI';
import { compensationBenefitsCols, initialState, payrollInfoCols, personalCols } from './employee.initialstate';
import ProfileOther from './profile.other';
import ProfileTeam from './profile.team';
import { EmployeeCtx } from 'components/HRDashboard/EmployeeDatabase';
import {
  createEmployee,
  getEmployeeCreatedItem,
  getEmployeeCreateError,
  getEmployeeCreateStatus,
  getEmployeeUpdateError,
  resetCreate,
  resetUpdate,
  updateEmployee,
} from './../../slices';
import { useDispatch, useSelector } from 'react-redux';
import {
  enumsStore,
  getOneEmployeeAction as _getOneEmployeeAction,
  getEmployeeStatusOne as _getOneEmployeeStatus,
  getEmployeeDetails as _getOneEmployeeDetails,
  getEmployeeUpdateStatus as _getEmployeeUpdateStatus,
  getEmployeeUpdateError as _getEmployeeUpdateError,
  getEmployeeHistoryAction as _getEmployeeHistoryAction,
  getEmployeeHistoryData as _getEmployeeHistoryData,
  getEmployeeHistoryStatus as _getEmployeeHistoryStatus,
  getEmployeeHistoryError as _getEmployeeHistoryError,
} from 'slices';
import useRequiredChecker from 'hooks/useRequiredChecker';
import { EMPLOYMENT_HISTORY_TYPE, JOB_HISTORY_TYPE } from 'constants/Values';
import { SvgIconComponent } from '@mui/icons-material';

const ProfileDetails = lazy(() => import('./profile.details'));
const ProfileTabContent = lazy(() => import('./profile.tabcontent'));

type Props = {
  isNew?: boolean;
  isView?: boolean;
  employeeNo?: string;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setViewDetails?: React.Dispatch<
    React.SetStateAction<{
      employeeNo: string;
      status: boolean;
    }>
  >;
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
  setUpdatedDetails: React.Dispatch<any>;
  updatedDetails: any;
  handleUpdateEmployee: React.Dispatch<any>;
  getIcon: any;
  failed: any;
  setOpenNotif: React.Dispatch<any>;
};

export const ProfileCtx = createContext<ProfileModel>({
  index: '1',
  setIndex: () => {},
  isNew: false,
  isView: false,
  employeeDetails: initialState,
  setEmployeeDetails: () => {},
  setDisplayPhoto: () => {},
  displayPhoto: {
    employeeNo: '',
    photo: '',
  },
  isOwner: false,
  enums: {},
  setUpdatedDetails: () => {},
  updatedDetails: null,
  handleUpdateEmployee: () => {},
  getIcon: () => {},
  failed: () => {},
  setOpenNotif: () => {},
});

export type EnumI = {
  _id: string;
  type: string;
  code: string;
  name: string;
};

export type EnumsI = {
  positions: EnumI[];
  gender: EnumI[];
  departments: EnumI[];
  ranks: EnumI[];
  civil_status: EnumI[];
  citizenship: EnumI[];
  religions: EnumI[];
  employment_status: EnumI[];
  locations: EnumI[];
  assets: EnumI[];
  file201: EnumI[];
  allowance_types: EnumI[];
  disciplinary_actions: EnumI[];
  employment_types: EnumI[];
};

const enumsInitialState = {
  positions: [],
  gender: [],
  departments: [],
  ranks: [],
  civil_status: [],
  citizenship: [],
  religions: [],
  employment_status: [],
  locations: [],
  assets: [],
  file201: [],
  allowance_types: [],
  disciplinary_actions: [],
  employment_types: [],
};

const ProfileMain = ({
  isNew,
  isView,
  employeeNo,
  setOpen,
  setViewDetails,
}: Props) => {
  const dispatch = useDispatch();

  const [updatedDetails, setUpdatedDetails] = useState<any>(null);
  const [index, setIndex] = useState<string>('1');
  const { isLoggedIn, userData, access_token, userGroup } = useContext(AppCtx);
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
  const [enums, setEnums] = useState<EnumsI>(enumsInitialState);
  const { validated } = useRequiredChecker({ employeeDetails });

  const memoizedEmployeeDetails = useMemo(
    () => employeeDetails,
    [employeeDetails]
  );

  const setEmployeeDetailsCallback = useCallback(
    (data: EmployeeI) => setEmployeeDetails(data),
    []
  );
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
  const { enumsData } = useSelector(enumsStore);
  const newEmployeeStatus = useSelector(getEmployeeCreateStatus);
  const newEmployeeData = useSelector(getEmployeeCreatedItem);
  const newEmployeeError = useSelector(getEmployeeCreateError);

  // Employees
  const employeeData = useSelector(_getOneEmployeeDetails);
  const employeeUpdatedStatus = useSelector(_getEmployeeUpdateStatus);
  const employeeUpdateError = useSelector(_getEmployeeUpdateError);

  // Employee History
  const employeeHistoryData = useSelector(_getEmployeeHistoryData);
  const employeeHistoryStatus = useSelector(_getEmployeeHistoryStatus);
  const employeeHistoryError = useSelector(_getEmployeeHistoryError);

  useEffect(() => {
    console.log({ newEmployeeData }, { newEmployeeStatus });
    if (newEmployeeStatus !== 'idle') {
      if (newEmployeeData && newEmployeeStatus === 'succeeded') {
        // handleSaveDisplayPhoto(newEmployeeData.payload.employeeNo);
        success();
      } else {
        failed(newEmployeeError);
      }
    }
  }, [newEmployeeStatus]);

  useEffect(() => {
    console.log({ employeeHistoryData });
    handleHistory();
  }, [employeeHistoryData]);
  console.log({ employeeUpdatedStatus });
  useEffect(() => {
    if (employeeUpdatedStatus !== 'idle') {
      if (employeeUpdateError) {
        failed(employeeUpdateError);
      } else {
        success();
        const updatedDetailsTmp = updatedDetails;
        clearUpdatedDetails();
        setEmployeeDetails((prev: EmployeeI) => {
          return {
            ...prev,
            ...updatedDetailsTmp,
          };
        });
      }
    }
  }, [employeeUpdatedStatus]);

  useEffect(() => {
    if (access_token && employeeNo) {
      dispatch(
        _getOneEmployeeAction({
          access_token,
          params: { employeeNo },
        })
      );
    }
  }, [access_token, employeeNo]);
console.log({isNew}, {employeeDetails})
  useEffect(() => {
    handleGetDisplayPhoto();
    setIndex(index);
    if (isNew) {
      setEmployeeDetails(initialState);
    } else {
      if (employeeData) {
        getEmployeeHistory();
      } else {
        setIsOwner(true);
      }
    }
  }, [employeeData, isLoggedIn, isNew, isView]);

  const getEmployeeHistory = async () => {
    console.log({ employeeData });
    dispatch(
      _getEmployeeHistoryAction({
        access_token,
        employeeNo: employeeData.employeeNo,
      })
    );
  };

  const clearUpdatedDetails = () => {
    setUpdatedDetails(null);
  };

  const handleHistory = async () => {
    let employmentHistory: any[] = [],
      jobHistory: any[] = [];
    await employeeHistoryData.forEach((o: any) => {
      switch (o.type.toUpperCase()) {
        case EMPLOYMENT_HISTORY_TYPE:
          employmentHistory.push(o);
          break;
        case JOB_HISTORY_TYPE:
          jobHistory.push(o);
          break;
        default:
      }
    });
    setEmployeeDetails(() => {
      return {
        ...initialState,
        ...employeeData,
        employment_history: employmentHistory,
        job_history: jobHistory,
      };
    });
  };

  const success = () => {
    setLoading({ status: false, action: '' });
    setRefresh(true);
    const type = isNew ? 'created' : 'updated';
    if (isNew) {
      setOpenNotif({
        message: `${newEmployeeData.firstName} ${newEmployeeData.lastName} has been successfully ${type}.`,
        status: true,
        severity: 'success',
      });
      dispatch(resetCreate());
    } else {
      setOpenNotif({
        message: `${employeeDetails.firstName} ${employeeDetails.lastName} has been successfully ${type}.`,
        status: true,
        severity: 'success',
      });
      dispatch(resetUpdate());
    }

    setTimeout(() => {
      setRefresh(false);
      setOpenNotif({
        message: '',
        status: false,
        severity: 'success',
      });
      setOpen && setOpen(false);
    }, 2000);
  };

  const failed = (message: string) => {
    setLoading({ status: false, action: '' });
    setOpenNotif({
      message: message,
      status: true,
      severity: 'error',
    });
  };

  useEffect(() => {
    var positions: any = [],
      departments: any = [],
      ranks: any = [],
      civil_status: any = [],
      citizenship: any = [],
      religions: any = [],
      employment_status: any = [],
      locations: any = [],
      assets: any = [],
      file201: any = [],
      allowance_types: any = [],
      disciplinary_actions: any = [],
      employment_types: any = [],
      gender: any = [];

    enumsData.forEach((o: any) => {
      switch (o.type.toLowerCase()) {
        case 'position':
          positions.push(o);
          break;
        case 'civilstatus':
          civil_status.push(o);
          break;
        case 'gender':
          gender.push(o);
          break;
        case 'citizenship':
          citizenship.push(o);
          break;
        case 'religion':
          religions.push(o);
          break;
        case 'employmentstatus':
          employment_status.push(o);
          break;
        case 'location':
          locations.push(o);
          break;
        case 'department':
          departments.push(o);
          break;
        case 'rank':
          ranks.push(o);
          break;
        case 'asset':
          assets.push(o);
          break;
        case '201_file_types':
          file201.push(o);
          break;
        case 'allowance_type':
          allowance_types.push(o);
          break;
        case 'disciplinary_action':
          disciplinary_actions.push(o);
          break;
        case 'employmenttype':
          employment_types.push(o);
          break;
      }
    });
    setEnums({
      positions,
      gender,
      departments,
      ranks,
      civil_status,
      citizenship,
      religions,
      employment_status,
      locations,
      assets,
      file201,
      allowance_types,
      disciplinary_actions,
      employment_types,
    });
  }, [enumsData]);

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
      consoler(employeeDetails, 'blue', 'saveEmployee');
      await dispatch(createEmployee({ body: employeeDetails, access_token }));
    } catch (error: any) {
      setLoading({ status: false, action: '' });
      console.log(error);
    }
  };

  const handleUpdateEmployee = async () => {
    try {
      consoler(updatedDetails, 'orange', 'updateEmployee');
      if (updatedDetails.employeeBenefits) {
        updatedDetails.employeeBenefits = updatedDetails.employeeBenefits.map((o:any) => o.benefit)
      }
      await dispatch(
        updateEmployee({
          params: { ...updatedDetails, employeeNo: employeeDetails.employeeNo },
          access_token,
        })
      );
    } catch (error: any) {
      setLoading({ status: false, action: '' });
      consoler(updatedDetails, 'red', 'Update Employee Error');
    }
  };

  useEffect(() => {
    console.log({ updatedDetails });
  }, [updatedDetails]);

  const getIcon = (icon: SvgIconComponent, col: string) => {
    if (updatedDetails) {
      const checkPersonalChanges = () => {
        return personalCols.some((x: any) => updatedDetails.hasOwnProperty(x));
      };
      const checkComBenChanges = () => {
        return compensationBenefitsCols.some((x: any) => updatedDetails.hasOwnProperty(x)) || 
        payrollInfoCols.some((x: any) => updatedDetails.hasOwnProperty(x))
      };
      if (
        (col && updatedDetails.hasOwnProperty(col)) ||
        (index === "1" && !col && checkPersonalChanges()) ||
        (index === "3" && !col && checkComBenChanges())
      ) {
        return (
          <Badge badgeContent=' ' color='error' variant='dot'>
            {icon}
          </Badge>
        );
      }
    }
    return icon;
  };

  return (
    <ProfileCtx.Provider
      value={{
        index,
        isNew,
        employeeDetails,
        isView,
        displayPhoto,
        isOwner,
        enums,
        setIndex,
        setEmployeeDetails,
        setDisplayPhoto,
        setUpdatedDetails,
        updatedDetails,
        handleUpdateEmployee,
        getIcon,
        failed,
        setOpenNotif,
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
          className={`mt-4 grid gap-4 pb-0 w-full mb-10 px-4 ${
            isNew ? '!pb-0' : ''
          }`}
        >
          <Suspense fallback={<div>Loading...</div>}>
            <ProfileDetails />
          </Suspense>
          <section className='grid grid-cols-12 w-full gap-4'>
            {!isNew && (
              <article className='laptop:col-span-3 desktop:col-span-3 phone:col-span-12 grid gap-4 self-start'>
                <ProfileOther />
                {employeeDetails.reportsTo && (
                  <ProfileTeam setViewDetails={setViewDetails} />
                )}
              </article>
            )}

            <article
              className={`laptop:col-span-9 desktop:col-span-9 phone:col-span-12 flex ${
                isNew
                  ? 'laptop:col-span-12 desktop:col-span-12 phone:col-span-12 desktop:p-4 laptop:p-4 phone:p-0'
                  : ''
              }`}
            >
              <Suspense fallback={<div>Loading...</div>}>
                <ProfileTabContent className='self-stretch' />
              </Suspense>
            </article>
          </section>
        </section>

        {isNew && (
          <button
            disabled={!validated}
            className='px-4 py-2 bg-green-500 text-white w-full absolute bottom-0 left-0 z-10 disabled:bg-gray-300 disabled:cursor-not-allowed'
            onClick={saveEmployee}
          >
            Save Employee Profile
          </button>
        )}
      </TabContext>
    </ProfileCtx.Provider>
  );
};

export default ProfileMain;
