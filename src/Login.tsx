import { useContext, useEffect, useState } from 'react';
import {
  InputAdornment,
  IconButton,
  Grid,
  Box,
  Link,
  Checkbox,
  FormControlLabel,
  TextField,
  CssBaseline,
  Button,
  InputLabel,
  FormControl,
  Input,
  Alert,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { VISION_RED } from './constants/Colors';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { AppCtx } from './App';
import CustomCard from './CustomComponents/CustomCard';
import { VISION_LOGO } from 'assets';

import { login } from 'apis/auth';
import { getEmployeesEndpoint } from 'apis/employees';

function Copyright(props) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      className='text-xs'
      {...props}
    >
      {'Copyright © '}
      <Link color='inherit'>VISION HRIS</Link> {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {
  const { setIsLoggedIn } = useContext(AppCtx);
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

  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    console.log({ loginData });
  }, [loginData]);

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
      setError(false);
      event.preventDefault();
      const response = await login({
        username: loginData.username,
        password: loginData.password,
      });

      const res = await getEmployeesEndpoint(loginData.username);

      console.log({ res });

      if (response.data.access_token !== '' && res.data.employeeNo) {
        setError(false);

        setIsLoggedIn({
          userData: res.data,
          alias: res.data.userGroup,
        });
      } else {
        setError(true);
        // TODO: set login failure message.
      }
    } catch (error) {
      setError(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component='main'>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={12}
          md={12}
          sx={{
            // background: `url(${require('./assets/images/login-bg.jpg')}) no-repeat`,
            backgroundAttachment: '',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundBlendMode: 'overlay',
            backgroundColor: VISION_RED,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          className='h-[100vh] p-4'
        >
          <CustomCard className='px-0 py-0 w-[90%] laptop:max-w-[800px] tablet:max-w-[600px] phone:max-w-full shadow-xl '>
            {/* <Card sx={{ width: '90%', maxWidth: 900 }} elevation={20}> */}
            <Grid container className='grid grid-cols-12'>
              <Grid
                item
                className='bg-[linear-gradient(to right, #db2325, #fff)] overflow-hidden tablet:col-span-6 phone:hidden tablet:block'
              >
                <Box
                  sx={{
                    background: `url(${require('./assets/images/login-bg.png')}) no-repeat`,
                    backgroundAttachment: 'local',
                    backgroundSize: 'cover',
                    backgroundPosition: '60% center',
                    backgroundBlendMode: 'overlay',
                    width: '100%',
                    height: '100%',
                    opacity: 0.6,
                  }}
                ></Box>
              </Grid>

              <Grid item className='tablet:col-span-6 phone:col-span-12'>
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
                    <img src={VISION_LOGO} alt='' style={{ width: 100 }} />
                  </div>

                  {error && (
                    <Alert
                      severity='error'
                      variant='filled'
                      className='mt-2 w-full'
                    >
                      Sorry, we couldn't find an account with that username or
                      password.
                    </Alert>
                  )}

                  <Box
                    component='form'
                    noValidate
                    onSubmit={handleSubmit}
                    className='justify-start'
                  >
                    <TextField
                      margin='normal'
                      required
                      fullWidth
                      id='employee'
                      label='Employee Number'
                      name='employee'
                      autoComplete='employee'
                      autoFocus
                      size='small'
                      variant='standard'
                      onChange={(e) =>
                        setLoginData({ ...loginData, username: e.target.value })
                      }
                    />
                    <FormControl fullWidth variant='standard' required>
                      <InputLabel htmlFor='password'>Password</InputLabel>
                      <Input
                        fullWidth
                        name='password'
                        onChange={(e) =>
                          setLoginData({
                            ...loginData,
                            password: e.target.value,
                          })
                        }
                        type={values.showPassword ? 'text' : 'password'}
                        id='password'
                        endAdornment={
                          <InputAdornment position='end'>
                            <IconButton
                              aria-label='toggle password visibility'
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge='end'
                            >
                              {values.showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>

                    <FormControlLabel
                      className='text-xs'
                      control={
                        <Checkbox
                          value='remember'
                          color='primary'
                          className='text-xs'
                        />
                      }
                      label='Remember me'
                    />

                    <Button
                      type='submit'
                      fullWidth
                      variant='contained'
                      disableElevation
                      sx={{ mt: 3, mb: 2 }}
                      disabled={!loginData.username && !loginData.password}
                      className='bg-sky-500 hover:bg-sky-600'
                    >
                      Sign In
                    </Button>

                    <Grid container>
                      <Grid item xs sx={{ textAlign: 'left' }}>
                        <Link href='#' variant='body2'>
                          Forgot password?
                        </Link>
                      </Grid>
                    </Grid>
                    <Copyright sx={{ mt: 5 }} />
                  </Box>
                </Box>
              </Grid>
            </Grid>
            {/* </Card> */}
          </CustomCard>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
