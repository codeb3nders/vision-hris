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
  const { setIsLoggedIn, setIsHRLogin } = useContext(AppCtx);
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

  const handleSubmit = (event) => {
    // history.push('/');
    setIsHRLogin(isHR);
    setIsLoggedIn(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component='main' sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={5}
          md={8}
          sx={{
            background: `url(${require('./assets/images/login-bg.jpg')}) no-repeat`,
            backgroundAttachment: '',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundBlendMode: 'overlay',
            backgroundColor: VISION_RED,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />

        <Grid item xs={12} sm={7} md={4} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div>
              <img src={PMS_LOGO} alt='' style={{ width: 100 }} />
            </div>

            {/* <Typography component='h1' variant='h5'>
              Sign in
            </Typography> */}
            <section className='login-selector-wrapper'>
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
            <Box
              component='form'
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address / Username'
                name='email'
                autoComplete='email'
                autoFocus
              />
              <FormControl fullWidth sx={{ marginTop: 1 }}>
                <InputLabel htmlFor='password'>Password</InputLabel>
                <OutlinedInput
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
    </ThemeProvider>
  );
}
