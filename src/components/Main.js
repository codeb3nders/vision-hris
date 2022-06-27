import React, { useContext, useState, useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import {
  CssBaseline,
  // MuiDrawer,
  Box,
  // MuiAppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Container,
  Grid,
  Button,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  formLabelClasses,
} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import { VISION_RED } from '../constants/Colors';
import {
  Dashboard,
  Logout,
  ExpandLess,
  ExpandMore,
  Menu,
  ChevronLeft,
  NoteAlt,
  MoreTimeOutlined,
  Settings,
  TimeToLeaveOutlined,
  ManageHistory,
  Group,
} from '@mui/icons-material';
import { AppCtx } from '../App';
// import { Link, useHistory } from 'react-router-dom';
import { Path } from '../constants/Path';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

const Main = ({ children }) => {
  // const history = useHistory();
  const { setIsLoggedIn, setCurrentPage } = useContext(AppCtx);
  const [open, setOpen] = useState(true);
  const [isFormsOpen, setIsFormsOpen] = useState(false);
  const [isManageOpen, setIsManageOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    (isFormsOpen || isManageOpen) && setOpen(true);
  }, [isFormsOpen, isManageOpen]);

  useEffect(() => {
    !open && setIsFormsOpen(false);
    !open && setIsManageOpen(false);
  }, [open]);

  const mainListItems = (
    <React.Fragment>
      <ListItemButton onClick={() => setCurrentPage('dashboard')}>
        <ListItemIcon>
          <Dashboard />
        </ListItemIcon>
        <ListItemText secondary='Dashboard' />
      </ListItemButton>

      <ListItemButton
        onClick={() => {
          setIsFormsOpen(!isFormsOpen);
        }}
      >
        <ListItemIcon>
          <NoteAlt />
        </ListItemIcon>
        <ListItemText secondary='ESS Application' />
        {isFormsOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={isFormsOpen} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => setCurrentPage('leave-list')}
          >
            <ListItemIcon>
              <TimeToLeaveOutlined />
            </ListItemIcon>
            <ListItemText secondary='Leave Application' />
          </ListItemButton>

          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => setCurrentPage('ot-list')}
          >
            <ListItemIcon>
              <MoreTimeOutlined />
            </ListItemIcon>
            <ListItemText secondary='OT Application' />
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton onClick={() => setIsManageOpen(!isManageOpen)}>
        <ListItemIcon>
          <ManageHistory />
        </ListItemIcon>
        <ListItemText secondary='ESS Management' />
        {isManageOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={isManageOpen} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => setCurrentPage('leave-manage')}
          >
            <ListItemIcon>
              <TimeToLeaveOutlined />
            </ListItemIcon>
            <ListItemText secondary='Leave Management' />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => setCurrentPage('ot-manage')}
          >
            <ListItemIcon>
              <MoreTimeOutlined />
            </ListItemIcon>
            <ListItemText secondary='OT Management' />
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton onClick={() => setCurrentPage('employee')}>
        <ListItemIcon>
          <Group />
        </ListItemIcon>
        <ListItemText secondary='Employee Database' />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon>
          <Settings />
        </ListItemIcon>
        <ListItemText secondary='Account Settings' />
      </ListItemButton>
    </React.Fragment>
  );

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position='absolute'
          open={open}
          sx={{ backgroundColor: VISION_RED }}
        >
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge='start'
              color='inherit'
              aria-label='open drawer'
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <Menu />
            </IconButton>
            <Typography
              component='h1'
              variant='h6'
              color='inherit'
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Employee Dashboard
            </Typography>
            <Button
              variant='contained'
              color='error'
              startIcon={<Logout />}
              disableElevation
              onClick={() => {
                setCurrentPage('login');
                setIsLoggedIn(false);
              }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer variant='permanent' open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeft />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component='nav'>
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {/* {secondaryListItems} */}
          </List>
        </Drawer>
        <Box
          component='main'
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
            <Grid
              container
              spacing={3}
              flexDirection='column'
              justifyContent='center'
            >
              {children}
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Main;
