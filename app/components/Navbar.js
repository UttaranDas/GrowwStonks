'use client'
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Search from './Search';
import Link from 'next/link';
import Image from 'next/image';

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="wallet" color="inherit">
          <Badge badgeContent={4} color="error">
            <AccountBalanceWalletIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    // <Box sx={{ flexGrow: 1 }}>
    //   <AppBar position="static">
    //     <Toolbar>
    //       <IconButton
    //         size="large"
    //         edge="start"
    //         color="inherit"
    //         aria-label="open drawer"
    //         sx={{ mr: 2 }}
    //       >
    //         <MenuIcon />
    //       </IconButton>
    //       <Typography
    //         variant="h6"
    //         noWrap
    //         component="div"
    //         sx={{ display: { xs: 'none', sm: 'block' } }}
    //       >
    //         GrowwStonks
    //       </Typography>
    //       <Search>
    //         <SearchIconWrapper>
    //           <SearchIcon />
    //         </SearchIconWrapper>
    //         <StyledInputBase
    //           placeholder="What are you looking for today?"
    //           inputProps={{ 'aria-label': 'search' }}
    //         />
    //       </Search>
    //       <Box sx={{ flexGrow: 1 }} />
    //       <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
    //         <IconButton size="large" aria-label="wallet" color="inherit">
    //             <AccountBalanceWalletIcon />
    //         </IconButton>
    //         <IconButton
    //           size="large"
    //           aria-label="show 17 new notifications"
    //           color="inherit"
    //         >
    //           <Badge badgeContent={17} color="error">
    //             <NotificationsIcon />
    //           </Badge>
    //         </IconButton>
    //         <IconButton
    //           size="large"
    //           edge="end"
    //           aria-label="account of current user"
    //           aria-controls={menuId}
    //           aria-haspopup="true"
    //           onClick={handleProfileMenuOpen}
    //           color="inherit"
    //         >
    //           <AccountCircle />
    //         </IconButton>
    //       </Box>
    //       <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
    //         <IconButton
    //           size="large"
    //           aria-label="show more"
    //           aria-controls={mobileMenuId}
    //           aria-haspopup="true"
    //           onClick={handleMobileMenuOpen}
    //           color="inherit"
    //         >
    //           <MoreIcon />
    //         </IconButton>
    //       </Box>
    //     </Toolbar>
    //   </AppBar>
    //   {renderMobileMenu}
    //   {renderMenu}
    // </Box>

    
    <>
      <nav className="bg-gray-900 shadow-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <Link href="/" className='flex flex-row'>
              <div className="flex flex-shrink-0 items-center text-4xl font-bold text-white py-2">
                GrowwStonks
              </div>
            </Link>
            <Search />
            <div className="flex items-center">
              <div className="hidden md:block">
                  <Link
                    href="/explore"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-100 hover:bg-gray-700 hover:text-gray-100"
                  >
                    explore
                  </Link>                 
                
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}