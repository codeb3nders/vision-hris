import React, { useContext, useEffect, useState } from 'react';
import {
  InputAdornment,
  IconButton,
  Grid,
  Box,
  Paper,
  Link,
  Checkbox,
  FormControlLabel,
  TextField,
  CssBaseline,
  Button,
  OutlinedInput,
  InputLabel,
  FormControl,
  Card,
  Input,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { VISION_RED } from './constants/Colors';
import {
  VisibilityOff,
  Visibility,
  AdminPanelSettings,
  Person,
  AccountCircle,
} from '@mui/icons-material';
import { AppCtx } from './App';
import { useHistory } from 'react-router-dom';
import CustomCard from './CustomComponents/CustomCard';
import { VISION_LOGO } from 'assets';

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
  const history = useHistory();
  const { setIsLoggedIn, setIsHRLogin, setCurrentPage } = useContext(AppCtx);
  const [values, setValues] = useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const [isHR, setIsHR] = useState(false);
  const [loginData, setLoginData] = useState<{
    username: string | null;
    password: string | null;
  }>({
    username: null,
    password: null,
  });

  useEffect(() => {
    console.log({ loginData });
  }, [loginData]);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
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

  const handleSubmit = () => {
    setIsLoggedIn({
      username: loginData.username,
      alias:
        loginData.username === 'employee@hris'
          ? 'EMPLOYEE'
          : loginData.username === 'manager@hris'
          ? 'MANAGER'
          : loginData.username === 'hr@hris'
          ? 'HR'
          : 'ADMIN',
    });
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
                    <FormControl fullWidth variant='standard'>
                      <InputLabel htmlFor='password'>Password</InputLabel>
                      <Input
                        required
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
                      disabled={!loginData.username}
                      className='bg-v-red hover:bg-v-red-hover'
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
