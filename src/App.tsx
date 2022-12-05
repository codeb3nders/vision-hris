import './App.css';
import React, { useEffect, createContext, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import Main from './components/Main';
import { useSelector } from 'react-redux';
import { EmployeeDBI } from 'slices/interfaces/employeeI';
import { initialState } from 'components/MyProfile/employee.initialstate';
import Slider from './components/Auth/slider';
import holidays from 'constants/holidays';
import { URL_USER_LOGS } from 'constants/EndpointPath';
import { createEndpoint } from 'apis';
import axios from 'axios';

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
  setIsHRLogin: React.Dispatch<React.SetStateAction<boolean>>;
  isHRLogin: boolean;
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
  currentPage: string;
  createLog: any;
};

export const AppCtx = createContext<AppModel>({
  access_token: '',
  isLoggedIn: false,
  userData: { ...initialState, full_name: '' },
  userGroup: '',
  setIsHRLogin: () => {},
  isHRLogin: false,
  setCurrentPage: () => {},
  currentPage: 'login',
  createLog: () => { }
});

type Props = {};

export const consoler = (data: any, bgColor: string, title: string) => {
  console.log(`%c 📝 ${title}:`, `background: ${bgColor}; color: white`, data);
};

const App: React.FC<Props> = () => {
  const { auth } = useSelector((state: any) => state);
  const { isLoggedIn, userData, access_token, userGroup } = auth;
  const [isHRLogin, setIsHRLogin] = useState(false);
  const [currentPage, setCurrentPage] = useState('login');
  const [mode] = useState(true);

  const theme = createTheme({
    palette: {
      mode: mode ? 'light' : 'dark',
    },
    typography: {
      fontFamily: ['Lato'].join(','),
    },
  });

  useEffect(() => {
    if (userData && userData.userGroup.code === 'HR ADMIN') {
      setIsHRLogin(true);
    }
  }, [userData]);

  const createLog = async (data) => {
    console.log("createLogcreateLogcreateLog")
    const getMyIP = async() => { 
      try {
        const res = await axios.get('https://ipapi.co/json/')
        return res.data.IPv4;
      } catch (error) {
        console.error({error})
      }
    }
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
              setIsHRLogin,
              isHRLogin,
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
