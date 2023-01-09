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
import { EmployeeDBI, EmployeeI } from 'slices/interfaces/employeeI';
import { compensationBenefitsCols, initialState, payrollInfoCols, personalCols } from './employee.initialstate';
import ProfileOther from './profile.other';
import ProfileTeam from './profile.team';
import { EmployeeCtx } from 'components/HRDashboard/EmployeeDatabase';
import { useDispatch, useSelector } from 'react-redux';
import {
  getListOfValues,
  getOneEmployeeAction as _getOneEmployeeAction,
  getEmployeeStatusOne as _getOneEmployeeStatus,
  getEmployeeDetails as _getOneEmployeeDetails,
  getEmployeeUpdateStatus as _getEmployeeUpdateStatus,
  getEmployeeUpdateError as _getEmployeeUpdateError,
  getEmployeeHistoryAction as _getEmployeeHistoryAction,
  getEmployeeHistoryData as _getEmployeeHistoryData,
  getEmployeeHistoryStatus as _getEmployeeHistoryStatus,
  getEmployeeHistoryError as _getEmployeeHistoryError,
  createEmployee,
  getEmployeeCreatedItem,
  getEmployeeCreateError,
  getEmployeeCreateStatus,
  resetCreate,
  resetUpdate,
  updateEmployee,
} from 'slices';
import useRequiredChecker from 'hooks/useRequiredChecker';
import { EMPLOYMENT_HISTORY_TYPE, JOB_HISTORY_TYPE } from 'constants/Values';
import { SvgIconComponent } from '@mui/icons-material';
import moment from 'moment';
import ProfileTabs from './profile.tabs';
import ProfileDetails from './profile.details';
import { useParams } from 'react-router-dom';
import { getContractEndDate, getProbationaryEndDate } from 'utils/functions';

// const ProfileDetails = lazy(() => import('./profile.details'));
const ProfileTabContent = lazy(() => import('./profile.tabcontent'));

type Props = {
  isModal?: boolean;
  isView?: boolean;
  employeeNo?: string;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setViewDetails?: React.Dispatch<
    React.SetStateAction<{
      employeeDetails: EmployeeDBI;
      status: boolean;
    }>
  >;
  viewDetails: any;
};

export type ProfileModel = {
  index: string;
  setIndex: React.Dispatch<React.SetStateAction<string>>;
  isModal?: boolean;
  isView?: boolean;
  employeeDetails: EmployeeDBI;
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
  resetNotif: any;
  setEducationalBgData: React.Dispatch<any[]>;
  educationalBgData: any[];
};

export const ProfileCtx = createContext<ProfileModel>({
  index: '1',
  setIndex: () => { },
  isModal: false,
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
  setUpdatedDetails: () => { },
  updatedDetails: null,
  handleUpdateEmployee: () => { },
  getIcon: () => { },
  failed: () => { },
  resetNotif: () => { },
  setEducationalBgData: () => { },
  educationalBgData: [],
});

export type EnumI = {
  _id: string;
  type: string;
  code: string;
  name: string;
  Cleansing_Days?: number;
  Category?: string;
  Level?: string;
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
  employment_types: EnumI[];
  payroll_group: EnumI[];
  payment_method: EnumI[];
  violations: EnumI[];
  offenseLevel: EnumI[];
  offenseStages: EnumI[];
  violationCategories: EnumI[];
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
  employment_types: [],
  payroll_group: [],
  payment_method: [],
  violations: [],
  offenseLevel: [],
  offenseStages: [],
  violationCategories: []
};

const ProfileMain = ({
  isModal,
  isView,
  employeeNo,
  setOpen,
  setViewDetails,
  viewDetails
}: Props) => {
  const dispatch = useDispatch();

  const [updatedDetails, setUpdatedDetails] = useState<any>(null);
  const [index, setIndex] = useState<string>('1');
  const {isNew} = useContext(EmployeeCtx);
  const { isLoggedIn, userData, access_token, userGroup } = useContext(AppCtx);
  const { setRefresh } = useContext(EmployeeCtx);
  const [employeeDetails, setEmployeeDetails] =
    useState<EmployeeDBI>(initialState);
  const [displayPhoto, setDisplayPhoto] = useState<{
    employeeNo: string;
    photo: string;
  }>({
    employeeNo: '',
    photo: '',
  });
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [enums, setEnums] = useState<EnumsI>(enumsInitialState);
  const { validated } = useRequiredChecker({ data: employeeDetails });

  const memoizedEmployeeDetails = useMemo(
    () => employeeDetails,
    [employeeDetails]
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
  const [educationalBgData, setEducationalBgData] = useState<any[]>([]);
  const [duplicates, setDuplicates] = useState<any>({
    data: [], status: false
  })

  const {positions,
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
      employment_types,
      gender,
      payroll_group,
      payment_method,
      violations,
      offenseLevel,
      offenseStages,
      violationCategories} = useSelector(getListOfValues);
  const newEmployeeStatus = useSelector(getEmployeeCreateStatus);
  const newEmployeeData = useSelector(getEmployeeCreatedItem);
  const newEmployeeError = useSelector(getEmployeeCreateError);

  // Employees
  const employeeData = useSelector(_getOneEmployeeDetails);
  const employeeUpdatedStatus = useSelector(_getEmployeeUpdateStatus);
  const employeeUpdateError = useSelector(_getEmployeeUpdateError);

  // Employee History
  const employeeHistoryData = useSelector(_getEmployeeHistoryData);

  const params:any = useParams();

  // useEffect(() => {
  //   if (isNew && employeeDetails.firstName && employeeDetails.birthDate && moment(employeeDetails.birthDate).isValid()) {
  //     checkForDuplicate();
  //   }
  // }, [employeeDetails.firstName, employeeDetails.birthDate])

  /** Employees: NEW */
  useEffect(() => {
    console.log({ newEmployeeData }, { newEmployeeStatus });
    if (newEmployeeStatus !== 'idle') {
      if (newEmployeeData && newEmployeeStatus === 'succeeded') {
        // handleSaveDisplayPhoto(newEmployeeData.payload.employeeNo);
        success(resetCreate(), "newEmployeeStatus");
      } else {
        failed(newEmployeeError);
      }
    }
  }, [newEmployeeStatus]);

  useEffect(() => {
    handleHistory();
  }, [employeeHistoryData]);

  /** Employees: UPDATE */
  useEffect(() => {
    if (employeeUpdatedStatus !== 'idle') {
      if (employeeUpdateError) {
        failed(employeeUpdateError);
      } else {
        success(resetUpdate(), "employeeUpdatedStatus");
        const updatedDetailsTmp = updatedDetails;
        clearUpdatedDetails();
        setRefresh(true);
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
    if (access_token && (employeeNo || params?.employeeNo)) {
      const employeeNumber = employeeNo || params?.employeeNo
      dispatch(
        _getOneEmployeeAction({
          access_token,
          params: { employeeNo: employeeNumber },
        })
      );
    } else {
      if (!isNew) {
        setEmployeeDetails(userData)
        setIsOwner(true);
      }
    }
  }, [access_token, employeeNo]);

  useEffect(() => {
    handleGetDisplayPhoto();
    setIndex(index);
    if (isNew) {
      setEmployeeDetails(initialState);
    } else {
      const employeeNo = employeeData?.employeeNo || params?.employeeNo || employeeDetails.employeeNo;
      if (employeeNo) {
        getEmployeeHistory(employeeNo);
      }
    }
  }, [employeeData, isLoggedIn, isNew, isView, isOwner]);

  const getEmployeeHistory = async (employeeNo) => {
    dispatch(
      _getEmployeeHistoryAction({
        access_token,
        employeeNo
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
    if (isOwner) {
      setEmployeeDetails(() => {
      return {
        ...initialState,
        ...userData,
        employment_history: employmentHistory,
        job_history: jobHistory,
      };
    });
    } else {
      setEmployeeDetails(() => {
        return {
          ...initialState,
          ...employeeData,
          employment_history: employmentHistory,
          job_history: jobHistory,
        };
      });
    }
    setEducationalBgData(employeeData?.educationalBackground || [])
  };
console.log({isOwner})
  const success = (cb: any, test: string) => {
    console.log({ test })
    setLoading({ status: false, action: '' });
    setRefresh(true);
    const type = isNew ? 'created' : 'updated';
    if (isNew) {
      setOpenNotif({
        message: `${newEmployeeData.firstName} ${newEmployeeData.lastName} has been successfully ${type}.`,
        status: true,
        severity: 'success',
      });
      dispatch(cb);
      setOpen && setOpen(false);
    } else {
      setOpenNotif({
        message: `${employeeDetails.firstName} ${employeeDetails.lastName} has been successfully ${type}.`,
        status: true,
        severity: 'success',
      });
      dispatch(cb);
      setOpen && setOpen(false);
    }
    // setOpen && setOpen(false);
  };

  const failed = (message: string) => {
    setLoading({ status: false, action: '' });
    setOpenNotif({
      message: message,
      status: true,
      severity: 'error',
    });
  };

  const resetNotif = () => {
    setOpenNotif({
      message: "",
      status: false,
      severity: '',
    });
  }

  useEffect(() => {
  //   var positions: any = [],
  //     departments: any = [],
  //     ranks: any = [],
  //     civil_status: any = [],
  //     citizenship: any = [],
  //     religions: any = [],
  //     employment_status: any = [],
  //     locations: any = [],
  //     assets: any = [],
  //     file201: any = [],
  //     allowance_types: any = [],
  //     employment_types: any = [],
  //     gender: any = [],
  //     payroll_group: any = [],
  //     payment_method: any = [],
  //     violations: any = [],
  //     offenseLevel: any = [],
  //     offenseStages: any = [],
  //     violationCategories: any = [];

  //   enumsData.forEach((o: any) => {
  //     switch (o.type.toLowerCase()) {
  //       case 'position':
  //         positions.push(o);
  //         break;
  //       case 'civilstatus':
  //         civil_status.push(o);
  //         break;
  //       case 'gender':
  //         gender.push(o);
  //         break;
  //       case 'citizenship':
  //         citizenship.push(o);
  //         break;
  //       case 'religion':
  //         religions.push(o);
  //         break;
  //       case 'employmentstatus':
  //         employment_status.push(o);
  //         break;
  //       case 'location':
  //         locations.push(o);
  //         break;
  //       case 'department':
  //         departments.push(o);
  //         break;
  //       case 'rank':
  //         ranks.push(o);
  //         break;
  //       case 'assettype':
  //         assets.push(o);
  //         break;
  //       case 'documenttype':
  //         file201.push(o);
  //         break;
  //       case 'allowancetype':
  //         allowance_types.push(o);
  //         break;
  //       case 'employmenttype':
  //         employment_types.push(o);
  //         break;
  //       case 'payrollgroup':
  //         payroll_group.push(o);
  //         break;
  //       case 'paymentmethod':
  //         payment_method.push(o);
  //         break;
  //       case 'violations':
  //         violations.push(o);
  //         break;
  //       case 'offenselevel':
  //         offenseLevel.push(o);
  //         break;
  //       case 'offensestage':
  //         offenseStages.push(o);
  //         break;
  //       case 'violationcategory':
  //         violationCategories.push(o);
  //         break;
  //     }
  //   });
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
      employment_types,
      payroll_group,
      payment_method,
      violations,
      offenseLevel,
      offenseStages,
      violationCategories
    });
  }, [positions,
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
      employment_types,
      payroll_group,
      payment_method,
      violations,
      offenseLevel,
      offenseStages,
      violationCategories]);

  // useEffect(() => {
  //   handleCompanyEmail();
  //   if (employeeDetails.employeeNo && displayPhotos?.length > 0) {
  //     const employee_dp = displayPhotos.filter(
  //       (dp) => dp.employeeNo === employeeDetails.employeeNo
  //     )[0];

  //     setDisplayPhoto(employee_dp);
  //   }
  // }, [displayPhotos, employeeDetails]);

  const handleGetDisplayPhoto = () => {
    const local_dps: any = localStorage.getItem('display_photos');
    const dps = JSON.parse(local_dps);

    setDisplayPhotos(dps);
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
      const { employment_history, job_history, ...rest } = employeeDetails;
      let endOfProbationary:any = null, contractEndDate:any = null;
      if (rest.endOfProbationary) {
        endOfProbationary = moment(getProbationaryEndDate(rest.dateHired)).valueOf();
      }
      if (rest.contractEndDate) {
        contractEndDate = moment(getContractEndDate(rest.dateHired)).valueOf();
      }
      await dispatch(createEmployee({ body: {...rest, endOfProbationary, contractEndDate}, access_token }));
    } catch (error: any) {
      setLoading({ status: false, action: '' });
      console.log(error);
    }
  };

  const handleUpdateEmployee = async () => {
    try {
      consoler(updatedDetails, 'orange', 'updateEmployee');
      if (updatedDetails.employeeBenefits) {
        updatedDetails.employeeBenefits = updatedDetails.employeeBenefits.map((o: any) => o.benefit)
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

  useEffect(() => {
    console.log({ educationalBgData });
  }, [educationalBgData]);

  const getIcon = (icon: SvgIconComponent, col: string) => {
    if (updatedDetails) {
      const badgeIcon = <Badge badgeContent=' ' color='error' variant='dot'>
        {icon}
      </Badge>
      const checkPersonalChanges = () => {
        return personalCols.some((x: any) => updatedDetails.hasOwnProperty(x));
      };
      const checkGovtChanges = () => {
        return compensationBenefitsCols.some((x: any) => updatedDetails.hasOwnProperty(x))
      };
      const checkPayrollInfoChanges = () => {
        return payrollInfoCols.some((x: any) => updatedDetails.hasOwnProperty(x))
      };
      switch (col) {
        case "Personal":
          if (checkPersonalChanges()) {
            return badgeIcon;
          }
          break;
        case "Government":
          if (checkGovtChanges()) {
            return badgeIcon;
          }
          break;
        case "PayrollInfo":
          if (checkPayrollInfoChanges()) {
            return badgeIcon;
          }
          break;
        default:
          if (updatedDetails.hasOwnProperty(col)) {
            return badgeIcon;
          }
      }
    }
    return icon;
  };

  // const checkForDuplicate = async () => {
  //   await dispatch(checkEmployeeExists({
  //     access_token, params: {
  //       firstName: employeeDetails.firstName,
  //       birthDate: moment(employeeDetails.birthDate).format("YYYY-MM-DD")
  //     }
  //   }))
  // }

  return (
    <ProfileCtx.Provider
      value={{
        index,
        isModal,
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
        setEducationalBgData, educationalBgData,
        resetNotif
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

      {/* {!employeeDetails.employeeNo && duplicates.length > 0 && <EmployeeExists setLoading={setLoading} duplicates={duplicates} setViewDetails={setViewDetails} setOpen={setOpen} setEmployeeDetails={setEmployeeDetails} setDuplicates={setDuplicates} />} */}

      <TabContext value={index}>
        <section
          className={`mt-0 grid gap-4 pb-0 w-full mb-10 px-4 ${isNew ? '!pb-0' : ''
            }`}
        >
          {!isModal && employeeDetails && !isNew &&
            <ProfileDetails employeeDetails={employeeDetails} />
          }
          {/* <section className='laptop:col-span-12 desktop:col-span-12 tablet:col-span-12 phone:col-span-12 phone:text-xs flex flex-col justify-end phone:text-center tablet:text-left laptop:text-left desktop:text-left'> */}
            <ProfileTabs className='phone:hidden laptop:block desktop:block tablet:hidden ' />
          {/* </section> */}
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
              className={`laptop:col-span-9 desktop:col-span-9 phone:col-span-12 flex ${isNew
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
    </ProfileCtx.Provider >
  );
};

export default ProfileMain;
