/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import {
  InputAdornment,
  IconButton,
  Grid,
  Box,
  TextField,
  Button,
  InputLabel,
  FormControl,
  Input,
  Alert,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import {
  VisibilityOff,
  Visibility,
  Login as LoginIcon,
} from '@mui/icons-material';
import { VISION_LOGO } from 'assets';
import { getAllDataAction as _getEnumsAction } from 'slices';
import { useDispatch, useSelector } from 'react-redux';
import {
  authAction,
  setIsLoggedIn,
  clearAuthData,
} from 'slices/userAccess/authSlice';
import { SliderCtx } from './components/Auth/slider';
import { AppCtx } from 'App';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      className="text-xs"
      {...props}
    >
      <span>Copyright © 2022</span>
      <span className="block">Vision Properties Develoment Corporation</span>
      <span className="block">All Rights Reserved</span>
    </Typography>
  );
}

export default function Login() {
  const { setIndex } = useContext(SliderCtx);
  const dispatch = useDispatch();
  const { auth } = useSelector((state: any) => state);
  const { status, access_token, userData } = auth;
  const [values, setValues] = useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });
  const [loginData, setLoginData] = useState<{
    username: string;
    password: string;
  }>({
    username: '',
    password: '',
  });

  const [error, setError] = useState<{ status: boolean; message: string }>({
    status: false,
    message: '',
  });
  const { createLog } = useContext(AppCtx);

  useEffect(() => {
    if (status === 'succeeded') {
      if (access_token && userData) {
        if (!userData.isActive) {
          setError({
            status: true,
            message: `Sorry, your account is inactive.`,
          });
        } else {
          createLog({
            employeeNo: loginData.username,
            portal: "LOGIN",
            module: "Authentication",
            event: "Login",
            details: userData
          })
          setError({ status: false, message: '' });
          getEnums();
          dispatch(setIsLoggedIn(true));
        }
      } else {
        setError({
          status: true,
          message: `Sorry, we couldn't find an account with that username or password.`,
        });
        // TODO: set login failure message.
      }
    }
  }, [status]);

  useEffect(() => {
    if (error.status) {
      createLog({
        employeeNo: loginData.username,
        portal: "LOGIN",
        module: "Authentication",
        event: "Login",
        details: {username: loginData.username, error: error.message}
      })
      dispatch(clearAuthData());
    }
  }, [error]);

  const getEnums = async () => {
    await dispatch(_getEnumsAction({ access_token }));
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    try {
      setError({ status: false, message: '' });
      event.preventDefault();
      await dispatch(
        authAction({
          username: loginData.username,
          password: loginData.password,
        })
      );
    } catch (error) {
      setError({
        status: true,
        message: `Sorry, we couldn't find an account with that username or password.`,
      });
    }
    // createLog({ user_id: 0, email_address: userData.email, details: { login: "failed", reason: "User is not yet registered." } });
  };

  return (
    <Grid container className="grid grid-cols-12">
      <Grid
        item
        className="bg-[linear-gradient(to right, #db2325, #fff)] overflow-hidden tablet:col-span-7 phone:hidden tablet:block"
      >
        <Box
          sx={{
            background: `url(${require('./assets/images/login-bg.png')}) no-repeat`,
            backgroundAttachment: 'local',
            backgroundSize: 'cover',
            backgroundPosition: '40% center',
            backgroundBlendMode: 'overlay',
            width: '100%',
            height: '100%',
            opacity: 0.6,
          }}
        ></Box>
      </Grid>

      <Grid item className="tablet:col-span-5 phone:col-span-12">
        <Box
          sx={{
            my: 6,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'left',
          }}
        >
          <div>
            <img src={VISION_LOGO} alt="" />
          </div>

          {error.status && (
            <Alert severity="error" variant="filled" className="mt-2 w-full">
              {error.message}
            </Alert>
          )}

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            className="justify-start"
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="employee"
              label="Employee Number"
              name="employee"
              autoComplete="employee"
              autoFocus
              size="small"
              variant="standard"
              onChange={(e) =>
                setLoginData({ ...loginData, username: e.target.value })
              }
            />
            <FormControl fullWidth variant="standard" required>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                fullWidth
                name="password"
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    password: e.target.value,
                  })
                }
                type={values.showPassword ? 'text' : 'password'}
                id="password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            {/* <FormControlLabel
                      className='text-xs'
                      control={
                        <Checkbox
                          value='remember'
                          color='primary'
                          className='text-xs'
                        />
                      }
                      label='Remember me'
                    /> */}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disableElevation
              sx={{ mt: 3, mb: 2 }}
              disabled={!loginData.username && !loginData.password}
              className="bg-sky-500 hover:bg-sky-600 flex flex-row items-center justify-center gap-2"
              startIcon={<LoginIcon className="text-sm" />}
            >
              Sign In
            </Button>
          </Box>

          <Grid container>
            <Grid item xs sx={{ textAlign: 'left' }}>
              <button onClick={() => setIndex(1)}>Forgot password?</button>
              {/* <Link href="#" variant="body2">
                </Link> */}
            </Grid>
          </Grid>
          <Copyright sx={{ mt: 5 }} />
        </Box>
      </Grid>
    </Grid>
  );
}
