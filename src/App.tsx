import './App.css';
import React, { useEffect, createContext, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import SignInSide from './Login';
import Main from './components/Main';
import { EmployeeI } from 'slices/interfaces/employeeI';

export const AppCtx: any = createContext(null);

type Props = {};

type Login = {
  userData: any | null;
  alias: string | null;
};

export const consoler = (data: any, bgColor: string, title: string) => {
  console.log(`%c 📝 ${title}:`, `background: ${bgColor}; color: white`, data);
};

const App: React.FC<Props> = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<Login>({
    userData: null,
    alias: null,
  });
  const [isHRLogin, setIsHRLogin] = useState(false);
  const [currentPage, setCurrentPage] = useState('login');
  const [mode] = useState(true);

  useEffect(() => {
    handleGetUserInfoFromLocalStorage();
  }, []);

  const handleGetUserInfoFromLocalStorage = () => {
    const access_token: any = localStorage.getItem('access_token');
    const userData_tmp: any = localStorage.getItem('userData') || {};
    const userData: any = JSON.parse(userData_tmp);

    if (access_token && userData) {
      setIsLoggedIn({
        alias: userData.userGroup,
        userData
      });
    }
  };
  console.log({ isLoggedIn })
  const theme = createTheme({
    palette: {
      mode: mode ? 'light' : 'dark',
    },
    typography: {
      fontFamily: ['Lato'].join(','),
    },
  });

  console.log({ mode: theme.palette.mode });

  return (
    <div className={`App h-[100vh]`} style={{ background: '#fafbff' }}>
      <ThemeProvider theme={theme}>
        <AppCtx.Provider
          value={{
            setIsLoggedIn,
            isLoggedIn,
            setIsHRLogin,
            isHRLogin,
            setCurrentPage,
            currentPage,
          }}
        >
          {!isLoggedIn?.userData?.employeeNo ? <SignInSide /> : <Main role={isLoggedIn.alias} />}
        </AppCtx.Provider>
      </ThemeProvider>
    </div>
  );
};

export default App;
