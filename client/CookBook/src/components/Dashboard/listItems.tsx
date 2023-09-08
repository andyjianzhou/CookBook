import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ChatIcon from '@mui/icons-material/Chat';
import PeopleIcon from '@mui/icons-material/People';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import KitchenIcon from '@mui/icons-material/Kitchen';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { BottomNavigation } from '@mui/material';

interface ListItemsProps {
  setPage: (page: string) => void;
  isMobile: boolean;
  setCreateModalOpen: (isOpen: boolean) => void;
}

export const mainListItems: React.FC<ListItemsProps> = ({ setPage, isMobile, setCreateModalOpen }) => {
  const handlePageChange = (page: string) => {
    console.log("Page pressed: ", page);
    setPage(page);
  }

  const handleCreateModalOpen = (isOpened: boolean) => {
    console.log("Create modal opened");
    setCreateModalOpen(isOpened);
  }

  return (
    <React.Fragment>
      <ListItemButton onClick={() => handlePageChange('Feed')}> 
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      {/* <ListItemText primary="Feed" /> */}
      </ListItemButton>
      {/* In the future, combine search and explore together, and add a "+" symbol for Ingredients to scan */}
      <ListItemButton onClick={() => handlePageChange('Search')}>
        <ListItemIcon>
          <SearchIcon />
        </ListItemIcon>
        {/* <ListItemText primary="Search" /> */}
      </ListItemButton>
      <ListItemButton onClick={() => handlePageChange('Explore')}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        {/* <ListItemText primary="Explore" /> */}
      </ListItemButton>
      <ListItemButton onClick={() => handleCreateModalOpen(true)}>
        <ListItemIcon>
          <ChatIcon />
        </ListItemIcon>
        {/* <ListItemText primary="Create" /> */}
      </ListItemButton>
      <ListItemButton onClick={() => handlePageChange('Scan')}>
        <ListItemIcon>
          <CameraAltIcon />
        </ListItemIcon>
        {/* <ListItemText primary="Scan" /> */}
      </ListItemButton>
      <ListItemButton onClick={() => handlePageChange('Kitchen')}>
        <ListItemIcon>
          <KitchenIcon />
        </ListItemIcon>
        {/* <ListItemText primary="Kitchen" /> */}
      </ListItemButton>
    </React.Fragment>
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