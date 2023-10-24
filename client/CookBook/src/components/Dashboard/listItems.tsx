import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ChatIcon from '@mui/icons-material/Chat';
import PeopleIcon from '@mui/icons-material/People';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import AssignmentIcon from '@mui/icons-material/Assignment';
import KitchenIcon from '@mui/icons-material/Kitchen';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

interface ListItemsProps {
  setPage: (page: string) => void;
  isMobile: boolean;
  setCreateModalOpen: (isOpen: boolean) => void;
  setCameraDrawerOpen: (isOpen: boolean) => void;
}

export const mainListItems: React.FC<ListItemsProps> = ({ setPage, isMobile, setCreateModalOpen, setCameraDrawerOpen }) => {
  const navigate = useNavigate();
  const handlePageChange = (page: string) => {
    setPage(page);

    switch (page) {
      case 'Feed':
        navigate('/dashboard');
        break;
      case 'Search':
        navigate('/dashboard/search');
        break;
      case 'Explore':
        navigate('/dashboard/explore');
        break;
      // TODO: Change this to refridgerator page, so far Scan is just a swipeable drawer to enable camera action
      // case 'Scan':
      //   navigate('/dashboard/scan');
      //   break;
      case 'Kitchen':
        navigate('/dashboard/kitchen');
        break;
      default:
        break;
    }
  }

  const handleCreateModalOpen = (isOpened: boolean) => {
    console.log("Create modal opened");
    setCreateModalOpen(isOpened);
  }

  const handleCameraDrawerOpen = (isOpened: boolean) => {
    console.log("Camera drawer opened");
    setCameraDrawerOpen(isOpened);
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
      <ListItemButton onClick={() => handleCameraDrawerOpen(true)}>
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