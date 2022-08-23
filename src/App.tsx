import './App.css';
import React, { useEffect, createContext, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import SignInSide from './Login';
import Main from './components/Main';
import { EmployeeI } from 'slices/interfaces/employeeI';
import { getLocalStorageItems } from 'utils/localStorage';
import { useSelector } from 'react-redux';

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
  const { auth } = useSelector((state: any) => state);
  const { isLoggedIn, userData, access_token } = auth;
  const [isHRLogin, setIsHRLogin] = useState(false);
  const [currentPage, setCurrentPage] = useState('login');
  const [mode] = useState(true);

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
            access_token,
            isLoggedIn,
            userData,
            setIsHRLogin,
            isHRLogin,
            setCurrentPage,
            currentPage,
          }}
        >
          {!isLoggedIn ? <SignInSide /> : <Main role={userData.userGroup} />}
        </AppCtx.Provider>
      </ThemeProvider>
    </div>
  );
};

export default App;
