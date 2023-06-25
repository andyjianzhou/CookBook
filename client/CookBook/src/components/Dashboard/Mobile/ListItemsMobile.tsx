import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import KitchenIcon from '@mui/icons-material/Kitchen';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { BottomNavigation } from '@mui/material';

export const mainMobileListItems = () => {
  const mobileNavItems = [
    {
      label: "Feed",
      value: "Feed",
      icon: <HomeIcon />,
    },
    {
      label: "Search",
      value: "Search",
      icon: <SearchIcon />,
    },
    {
      label: "Explore",
      value: "Explore",
      icon: <PeopleIcon />,
    },
    {
        label: "Create",
        value: "Create",
        icon: <ControlPointIcon />,
    },
    {
        label: "Scan",
        value: "Scan",
        icon: <CameraAltIcon />,
    },
    {
        label: "Kitchen",
        value: "Kitchen",
        icon: <KitchenIcon />,
    }
  ];

  return (
    mobileNavItems.map((item) => (
        <BottomNavigationAction
            key={item.value}
            label={item.label}
            value={item.value}
            icon={item.icon}
        />
        ))
  );
}
          

{/* export const mainListItems = (
  <React.Fragment>
    <ListItemButton > 
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItemButton>
  </React.Fragment>
); */}

export const secondaryListItems = (
  <React.Fragment>
    {/* <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader> */}
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      {/* <ListItemText primary="Current month" /> */}
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      {/* <ListItemText primary="Last quarter" /> */}
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      {/* <ListItemText primary="Year-end sale" /> */}
    </ListItemButton>
  </React.Fragment>
);