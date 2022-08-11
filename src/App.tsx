import './App.css';
import SignInSide from './Login';
import { useEffect, createContext, useState } from 'react';
import Main from './components/Main';
import { createTheme } from '@mui/material';
import Test from 'components/test/test';

export const AppCtx: any = createContext(null);

type Props = {};

type Login = {
  username: string | null;
  alias: string | null;
};

const App: React.FC<Props> = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<Login>({
    username: null,
    alias: null,
  });
  const [isHRLogin, setIsHRLogin] = useState(false);
  const [currentPage, setCurrentPage] = useState('login');
  const [mode, setMode] = useState(true);

  useEffect(() => {
    console.log({ isLoggedIn });
  }, [isLoggedIn]);

  const theme = createTheme({
    palette: {
      mode: mode ? 'light' : 'dark',
      background: {
        // paper: mode ? '#ffffff85' : '#121212a1',
        // default: mode ? "#ffffff85" : "#121212c9"
      },
    },
  });

  console.log({ mode: theme.palette.mode });

  return (
    <div className={`App h-[100vh]`} style={{ background: '#fafbff' }}>
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
        {!isLoggedIn?.username ? <Test /> : <Main />}
      </AppCtx.Provider>
    </div>
  );
};

export default App;
