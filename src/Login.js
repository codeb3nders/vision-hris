import React, { useContext, useState } from 'react';
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
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PMS_LOGO from './assets/images/pms-watermark.png';
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

function Copyright(props) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
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
    setIsHRLogin(isHR);
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component='main' sx={{ height: '100vh' }}>
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
        >
          <Card sx={{ width: '90%', maxWidth: 900 }} elevation={20}>
            <Grid container>
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  background: 'linear-gradient(to right, #db2325, #fff)',
                  overflow: 'hidden',
                }}
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
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    my: 6,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <img src={PMS_LOGO} alt='' style={{ width: 100 }} />
                  </div>

                  <section
                    style={{ marginTop: 32 }}
                    className='login-selector-wrapper'
                  >
                    <button
                      className={isHR ? '' : 'selected'}
                      onClick={() => setIsHR(false)}
                    >
                      <AccountCircle fontSize='small' s />{' '}
                      <Typography
                        sx={{ marginLeft: '5px' }}
                        component='small'
                        variant='subtitle2'
                      >
                        Employee
                      </Typography>
                    </button>
                    <button
                      className={isHR ? 'selected' : ''}
                      onClick={() => setIsHR(true)}
                    >
                      <AdminPanelSettings fontSize='small' />
                      <Typography
                        sx={{ marginLeft: '5px' }}
                        component='small'
                        variant='subtitle2'
                      >
                        HR
                      </Typography>
                    </button>
                  </section>
                  <Box component='form' noValidate onSubmit={handleSubmit}>
                    <TextField
                      margin='normal'
                      required
                      fullWidth
                      id='email'
                      label='Email Address / Username'
                      name='email'
                      autoComplete='email'
                      autoFocus
                      variant='standard'
                    />
                    <FormControl fullWidth>
                      {/* <InputLabel htmlFor='password'>Password</InputLabel> */}
                      <TextField
                        variant='standard'
                        margin='normal'
                        required
                        fullWidth
                        name='password'
                        label='Password'
                        value={values.password}
                        onChange={handleChange('password')}
                        type={values.showPassword ? 'text' : 'password'}
                        id='password'
                        // autoComplete='current-password'
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
                      control={<Checkbox value='remember' color='primary' />}
                      label='Remember me'
                    />
                    <Button
                      type='submit'
                      fullWidth
                      variant='contained'
                      disableElevation
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign In
                    </Button>
                    <Grid container>
                      <Grid item xs sx={{ textAlign: 'left' }}>
                        <Link href='#' variant='body2'>
                          Forgot password?
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link href='#' variant='body2'>
                          {"Don't have an account? Sign Up"}
                        </Link>
                      </Grid>
                    </Grid>
                    <Copyright sx={{ mt: 5 }} />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
