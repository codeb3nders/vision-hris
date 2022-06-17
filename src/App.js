import './App.css';
import SignInSide from './Login';
import { useEffect, createContext, useState } from 'react';
import Dashboard from './components/Dashboard';

export const AppCtx = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isHRLogin, setIsHRLogin] = useState(false);

  useEffect(() => {
    console.log({ isLoggedIn });
  }, [isLoggedIn]);

  return (
    <div className='App'>
      <AppCtx.Provider
        value={{ setIsLoggedIn, isLoggedIn, setIsHRLogin, isHRLogin }}
      >
        {isLoggedIn ? <Dashboard /> : <SignInSide />}
        {/* <Router>
          <Switch>
            <Route exact path={'/'} component={Dashboard} />
            <Route path={'/login'} component={SignInSide} />
          </Switch>
        </Router> */}
      </AppCtx.Provider>
    </div>
  );
}

export default App;
