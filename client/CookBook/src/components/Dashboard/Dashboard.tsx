import React, { useEffect } from 'react'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import {useNavigate} from 'react-router-dom';
import {useTheme} from '@mui/material/styles';
import { Button, Modal, TextField, useMediaQuery } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import { useAuth } from '../contexts/AuthContext';
import ProfileDropDownMenu from '../Profile/ProfileDropDownMenu';
import PostModal from '../Post/PostModal';
import Feed from '../Feed/Feed';
import { BrowserRouter, Router } from 'react-router-dom';

// mobile only imports
import { mainMobileListItems } from './Mobile/ListItemsMobile';

// page render imports
// import Chart from './Chart';
// import Deposits from './Deposits';
// import Orders from './Orders';

function Copyright(props: any) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
    mobileDisplay?: boolean;
  }

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })<AppBarProps>(({ theme, mobileDisplay }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ... (mobileDisplay && {
      // fix the appbar to the top and make it invisible
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1201,
      boxShadow: 'none',
      color: 'white',
      // make the appbar height smaller
      height: 64,
      // make the content of the appbar smaller
      minHeight: 64,
      // remove the padding
      padding: '0 8px',
    }),
  }));

  interface DrawerProps {
    open?: boolean;
    mobileDisplay?: boolean;
  }
  
  const drawerHeight: number = 60; 
  const drawerWidth: number = 72;
  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })<DrawerProps>(
    ({ theme, open, mobileDisplay }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(mobileDisplay && {
          height: drawerHeight,
          width: '100%',
          position: 'fixed',
          bottom: 0,
          borderTopLeftRadius: theme.shape.borderRadius,
          borderTopRightRadius: theme.shape.borderRadius,
          transition: theme.transitions.create('height', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }),
        ...(!mobileDisplay && {
          [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            position: 'fixed',
            height: '100%',
            borderRight: 'none',
          },
        }),
      },
    }),
  );
  
  const mdTheme = createTheme({
    palette: {
      primary: {
        main: '#556cd6',
      },
      secondary: {
        main: '#19857b',
      },
      error: {
        main: '#f44336',
      }
    },
}
);

  function DashboardContent() {
    const [open, setOpen] = React.useState(true);
    const {currentUser} = useAuth();
    const [currentPage, setPage] = React.useState('Feed');
    const [isCreateModalOpen, setCreateModalOpen] = React.useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();
    const toggleDrawer = () => {
      setOpen(!open);
    };

    // wait for user to be loaded for 500ms
    // if user is not loaded, redirect to login page
    return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column-reverse' : 'row' }}>
        <CssBaseline />
        <AppBar position="absolute" mobileDisplay={isMobile}>
          <Toolbar
            sx={{
                pr: '24px', // keep right padding when drawer closed
            }}
          >
            {/* <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton> */}
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard 
            </Typography>
            <ProfileDropDownMenu profile={currentUser?.displayName}/>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        {isMobile ? (
          // Mobile drawer to be at the bottom of the screen
          // TODO: There are errors with this, I fixed it but there's a black border around each button
          <BottomNavigation sx={{ width: '100%', position: 'fixed', bottom: 0, borderTop: 1, borderColor: 'divider'}}>
            {mainListItems({setPage, isMobile, setCreateModalOpen})}
          </BottomNavigation>
        ) : (
          // Desktop drawer to be on the left side of the screen
        <Drawer variant="permanent">
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            {/* <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton> */}
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems({setPage, isMobile, setCreateModalOpen})}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        )}
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            width : '100%',
            overflow: 'auto',
            // center the content by shifting the content to the right for the width of the drawer
            marginLeft: isMobile ? 0 : `${drawerWidth}px`,
          }}
        >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={8} lg={9}>
              {currentPage === 'Feed' && (
                  <Feed />
              )}
              {currentPage === 'Search' && (
                  <Grid item xs={12}>
                      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                          <Typography component="h2" variant="h6" color="primary" gutterBottom>
                              Search
                          </Typography>
                          <Typography component="p" variant="body1">
                              This is where you search for others
                          </Typography>
                      </Paper>
                  </Grid>
              )}
                {currentPage === 'Explore' && (
                  <Grid item xs={12}>
                      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                          <Typography component="h2" variant="h6" color="primary" gutterBottom>
                              Explore
                          </Typography>
                          <Typography component="p" variant="body1">
                              This is where you explore 
                          </Typography>
                      </Paper>
                  </Grid>
              )}
              {isCreateModalOpen && (
                <PostModal isOpen={isCreateModalOpen} onClose={() => setCreateModalOpen(false)} />
                )}
                {currentPage === 'Scan' && (
                  <Grid item xs={12}>
                      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                          <Typography component="h2" variant="h6" color="primary" gutterBottom>
                              Scan
                          </Typography>
                          <Typography component="p" variant="body1">
                              This is where you can scan for ingredients to create recipes which is stored in Kitchen
                          </Typography>
                      </Paper>
                  </Grid>
              )}
                {currentPage === 'Kitchen' && (
                  <Grid item xs={12}>
                      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                          <Typography component="h2" variant="h6" color="primary" gutterBottom>
                              Kitchen
                          </Typography>
                          <Typography component="p" variant="body1">
                              This is where you can see what ingredients you have in your kitchen and get recommended recipes
                          </Typography>
                      </Paper>
                  </Grid>
                )}
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    );
  }
  
  export default function Dashboard() {
    return <DashboardContent />;
  }
