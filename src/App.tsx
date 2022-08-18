import './App.css';
import SignInSide from './Login';
import { useEffect, createContext, useState } from 'react';
import Main from './components/Main';
import { createTheme, ThemeProvider } from '@mui/material';
import { EmployeeI } from 'slices/interfaces/employeeI';

export const AppCtx: any = createContext(null);

type Props = {};

type Login = {
  userData: any | null;
  alias: string | null;
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
    const credential: any = localStorage.getItem('credential');
    const local_user: { access_token: string; userInfo: EmployeeI } =
      JSON.parse(credential);

    if (local_user?.access_token && local_user?.userInfo.employeeNo) {
      setIsLoggedIn({
        alias: local_user?.userInfo.userGroup,
        userData: local_user?.userInfo,
      });
    }
  };

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
          {!isLoggedIn?.userData?.employeeNo ? <SignInSide /> : <Main />}
        </AppCtx.Provider>
      </ThemeProvider>
    </div>
  );
};

export default App;
