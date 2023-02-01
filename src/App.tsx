import './App.css';
import React, { useEffect, createContext, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import Main from './components/Main';
import { useDispatch, useSelector } from 'react-redux';
import { EmployeeDBI } from 'slices/interfaces/employeeI';
import { initialState } from 'components/MyProfile/employee.initialstate';
import Slider from './components/Auth/slider';
import holidays from 'constants/holidays';
import { URL_USER_LOGS } from 'constants/EndpointPath';
import { createEndpoint } from 'apis';
import axios from 'axios';
import { HR_ADMIN, MANAGER, SYSAD } from 'constants/Values';
import { setTeamMembers, authStore } from 'slices/userAccess/authSlice';
import { getAllEmployeesAction, getEmployeeStatus, getEmployeeItems} from 'slices/employees/getEmployeesSlice';
import { getByEmployeeNoAction, employeeData, employeeDataStatus } from 'slices/teamLeader';

export var moment = require('moment-business-days');
 
moment.updateLocale('us', {
  holidays: [holidays[2022], holidays[2023]],
  holidayFormat: 'MM-DD-YYYY',
  workingWeekdays: [1, 2, 3, 4, 5, 6]
});

type AppModel = {
  access_token: string;
  isLoggedIn: boolean;
  userData: EmployeeDBI;
  userGroup: string;
  isHRLogin: boolean;
  isManagerLogin: boolean;
  isSysAdLogin: boolean;
  isEmployeeLogin: boolean;
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
  currentPage: string;
  createLog: any;
};

export const AppCtx = createContext<AppModel>({
  access_token: '',
  isLoggedIn: false,
  userData: { ...initialState, full_name: '' },
  userGroup: '',
  isHRLogin: false,
  isManagerLogin: false,
  isSysAdLogin: false,
  isEmployeeLogin: true,
  setCurrentPage: () => {},
  currentPage: 'login',
  createLog: () => { }
});

type Props = {};

export const consoler = (data: any, bgColor: string, title: string) => {
 console.log(`%c 📝 ${title}:`, `background: ${bgColor}; color: white`, data);
};

const App: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state: any) => state);
  const { isLoggedIn, userData, access_token, userGroup, isManagerLogin } = auth;
  const [isHRLogin, setIsHRLogin] = useState(false);
  const [isSysAdLogin, setIsSysAdLogin] = useState(false);
  const [isEmployeeLogin, setIsEmployeeLogin] = useState(true);  
  const [currentPage, setCurrentPage] = useState('login');
  const teamLeaderGetStatus = useSelector(employeeDataStatus);
  const teamLeaderInfo = useSelector(employeeData);
  const mode = 'light'; //dark

  const employeeStatus = useSelector(getEmployeeStatus);
  const teamMembers = useSelector(getEmployeeItems);

  const theme = createTheme({
    palette: {
      mode
    },
    typography: {
      fontFamily: ['Lato'].join(','),
    },
  });

  useEffect(() => { 
    if (teamLeaderGetStatus === 'succeeded') {
      console.log({teamLeaderInfo})
    }
  }, [teamLeaderGetStatus, teamLeaderInfo])

  useEffect(() => {
    if (isManagerLogin && employeeStatus !== 'idle') {
      dispatch(setTeamMembers(teamMembers))
    }
  }, [dispatch, employeeStatus, isManagerLogin, teamMembers])

  const getTeamMembers = async() => {
    await dispatch(getAllEmployeesAction({
      access_token,
      params: {
        isActive: true,
        reportsTo: userData.employeeNo
      }
    }))
  }

  const getTeamLeaderDetails = async() => {
    await dispatch(getByEmployeeNoAction({
      access_token,
      employeeNo: userData.employeeNo
    }))
  }
 console.log({userData})
  useEffect(() => {
    if (userData) {
      switch (userData.userGroup.code) {
        case HR_ADMIN:
          setIsHRLogin(true);
          setIsEmployeeLogin(false);
          break;
        case MANAGER:
         
          //check if effective date has started
          getTeamLeaderDetails();
          getTeamMembers();
          // setIsManagerLogin(true);
          setIsEmployeeLogin(false);
          break;
        case SYSAD:
          setIsSysAdLogin(true);
          setIsEmployeeLogin(false);
          break;
        default:
          //check if employee is a delegated approver
          
          setIsHRLogin(false);
          // setIsManagerLogin(false);
          setIsSysAdLogin(false);
          setIsEmployeeLogin(true);
      }
    }
  }, [getTeamLeaderDetails, getTeamMembers, userData]);

  const createLog = async (data) => {
    
    const getMyBrowser = () => {
      return navigator.userAgent.toString();
    }

    const config = {
      headers: { Authorization: `Bearer ${access_token}` },
    };
    const body = {
      employeeNo: userData?.employeeNo,
      user_agent: getMyBrowser(),
      ...data
    }
    return await createEndpoint(URL_USER_LOGS, body, config);
  }

  return (
    <div className={`App h-[100vh]`} style={{ background: '#fafbff' }}>
      <ThemeProvider theme={theme}>
          <AppCtx.Provider
            value={{
              access_token,
              isLoggedIn,
              userData,
              userGroup,
              isHRLogin,
              isSysAdLogin,
              isManagerLogin,
              isEmployeeLogin,
              setCurrentPage,
              currentPage,
              createLog
            }}
        >
          {!isLoggedIn ? <Slider /> : <Main role={userGroup} />}
          </AppCtx.Provider>
      </ThemeProvider>
    </div>
  );
};

export default App;
