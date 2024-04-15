import React, { useEffect, useState } from 'react'
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
import { mainListItems, secondaryListItems } from '../Dashboard/listItems';
import {useNavigate} from 'react-router-dom';
import {useTheme} from '@mui/material/styles';
import { Button, Modal, TextField, ToggleButton, ToggleButtonGroup, useMediaQuery } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import { useAuth } from '../contexts/AuthContext';
import ProfileDropDownMenu from '../Profile/ProfileDropDownMenu';
import PostModal from '../Post/PostModal';
import Feed from '../Feed/Feed';
import { BrowserRouter, Router } from 'react-router-dom';
import Camera from '../Scan/Camera';

// mobile only imports
import { mainMobileListItems } from '../Dashboard/Mobile/ListItemsMobile';
import CameraDrawer from '../Scan/CameraDrawer';

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

function CameraContent() {
  const [mode, setMode] = useState('receipts'); // 'receipts' or 'fridge'
  const { currentUser } = useAuth();
  const [currentPage, setPage] = React.useState('Feed');
  const [isCreateModalOpen, setCreateModalOpen] = React.useState(false);
    const [isCameraDrawerOpen, setCameraDrawerOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const handleModeChange = (event: any, newMode: any) => {
    if (newMode !== null) {
      setMode(newMode);
    }
  };

  console.log("Mode: ", mode)
  return (
    <ThemeProvider theme={mdTheme}>
      <Box component="div" sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute">
          <Toolbar>
            <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
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
            {mainListItems({setPage, isMobile, setCreateModalOpen, setCameraDrawerOpen})}
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
            {mainListItems({setPage, isMobile, setCreateModalOpen, setCameraDrawerOpen})}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        )}
        <Box component="main" sx={{
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
        }}>
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <ToggleButtonGroup
              color="primary"
              value={mode}
              exclusive
              onChange={handleModeChange}
              sx={{ marginBottom: 2 }}
            >
              <ToggleButton value="receipts">Scan Receipts</ToggleButton>
              <ToggleButton value="fridge">View Fridge</ToggleButton>
            </ToggleButtonGroup>
            <Camera mode={mode} />
            {isCreateModalOpen && (
            <PostModal isOpen={isCreateModalOpen} onClose={() => setCreateModalOpen(false)} />
            )}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function CameraPage() {
  return <CameraContent />;
}