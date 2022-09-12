import './App.css';
import React, { useEffect, createContext, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import SignInSide from './Login';
import Main from './components/Main';
import { useSelector } from 'react-redux';
import { EmployeeDBI } from 'slices/interfaces/employeeI';
import { initialState } from 'components/MyProfile/employee.initialstate';

type AppModel = {
  access_token: string;
  isLoggedIn: boolean;
  userData: EmployeeDBI;
  userGroup: string;
  setIsHRLogin: React.Dispatch<React.SetStateAction<boolean>>;
  isHRLogin: boolean;
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
  currentPage: string;
};

export const AppCtx = createContext<AppModel>({
  access_token: "",
  isLoggedIn: false,
  userData: { ...initialState, full_name: "" },
  userGroup: "",
  setIsHRLogin: () => { },
  isHRLogin: false,
  setCurrentPage: () => { },
  currentPage: "login",
});

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
    if (userData && userData.userGroup.code == "HR ADMIN") {
      setIsHRLogin(true);
    }
  }, [userData])

  return (
    <div className={`App h-[100vh]`} style={{ background: '#fafbff' }}>
      <ThemeProvider theme={theme}>
        {!isLoggedIn ? <SignInSide /> :
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
            }}
          >
            <Main role={userGroup} />
          </AppCtx.Provider>
        }
      </ThemeProvider>
    </div>
  );
};

export default App;
