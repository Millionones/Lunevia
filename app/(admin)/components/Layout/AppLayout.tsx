'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  useMediaQuery,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import BuildIcon from '@mui/icons-material/Build';
import CategoryIcon from '@mui/icons-material/Category';
import BusinessIcon from '@mui/icons-material/Business';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LogoutIcon from '@mui/icons-material/Logout';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useRouter, usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../admin/store';
import { logout } from '../../admin/store/authSlice';
import { useThemeMode } from '../../admin/theme/ThemeProvider';
import { useTheme } from '@mui/material/styles';

const drawerWidth = 240;

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isSettingsPath = pathname?.startsWith('/settings');
  const isPartnersPath = pathname?.startsWith('/partners');
  const [settingsOpen, setSettingsOpen] = useState(isSettingsPath);
  const [partnersOpen, setPartnersOpen] = useState(isPartnersPath);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [access, setAccess] = useState<string[]>([])
  const muiTheme = useTheme();
  const isDark = muiTheme.palette.mode === 'dark';
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  useEffect(() => {
    if (user) {
      let access = user.roles && user?.roles[0] ? user?.roles[0].access : []
      setAccess(access)
      console.log('User updated:', user);
    }
  }, [user]);


  const handleLogout = () => {
    dispatch(logout());
    // router.push('/login');
  };
  const { mode, toggleMode } = useThemeMode();

  const handleSettingsClick = () => {
    setSettingsOpen(!settingsOpen);
  };

  const handlePartnersClick = () => {
    setPartnersOpen(!partnersOpen);
  };

  const hasAccess = (permission?: string) =>
    !permission || access.includes(permission);

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard', permission: 'dashboard_control' },
    { text: 'Leads', icon: <PeopleIcon />, path: '/leads', permission: 'lead_control' },
  ];

  const settingsItems = [
    { text: 'User', icon: <PersonIcon />, path: '/settings/user', permission: 'user_controll' },
    { text: 'User Role', icon: <GroupIcon />, path: '/settings/user-role', permission: 'role_controll' },
    { text: 'General Settings', icon: <BuildIcon />, path: '/settings/general' },
  ];

  const partnerItems = [
    { text: 'Partners', icon: <BusinessIcon />, path: '/partners', permission: 'partner_control' },
    { text: 'Subcategory', icon: <CategoryIcon />, path: '/partners/subcategory', permission: 'partner_control' },
  ];

  React.useEffect(() => {
    if (isSettingsPath) {
      setSettingsOpen(true);
    }
    if (isPartnersPath) {
      setPartnersOpen(true);
    }
  }, [isSettingsPath, isPartnersPath]);

  const settingsVisible = settingsItems.some((item) => hasAccess(item.permission));
  // const partnersVisible = partnerItems.some((item) => hasAccess(item.permission));
  const partnersVisible = true;

  const navButtonSx = (isChild = false) => ({
    my: 0.5,
    mx: 1,
    px: 2,
    py: 1,
    borderRadius: 2,
    color: 'text.primary',
    alignItems: 'center',
    transition: 'all 0.2s ease',
    ...(isChild ? { pl: 3.5 } : {}),
    '&.Mui-selected': {
      bgcolor: isDark ? 'rgba(79,70,229,0.18)' : 'rgba(79,70,229,0.12)',
      color: isDark ? '#e0e7ff' : '#312e81',
      '& .MuiListItemIcon-root': {
        color: isDark ? '#c7d2fe' : '#4338ca',
      },
    },
    '&:hover': {
      bgcolor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(17,24,39,0.05)',
    },
  });

  const drawer = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        bgcolor: isDark ? '#0b1222' : '#ffffff',
        color: 'text.primary',
      }}
    >
      <Box
        sx={{
          px: 2.25,
          py: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1.25,
          background: isDark
            ? 'linear-gradient(135deg, #111827 0%, #0f172a 100%)'
            : 'linear-gradient(135deg, #eef2ff 0%, #ffffff 100%)',
          borderBottom: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(17,24,39,0.06)',
        }}
      >
        <Box
          sx={{
            width: 42,
            height: 42,
            borderRadius: 2,
            display: 'grid',
            placeItems: 'center',
            background: 'linear-gradient(135deg, #4f46e5, #22c55e)',
            color: '#fff',
            fontWeight: 700,
            letterSpacing: 0.5,
          }}
        >
          AP
        </Box>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.1 }}>
            Admin Portal
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Control center
          </Typography>
        </Box>
      </Box>
      <List sx={{ flexGrow: 1, pt: 1 }}>
        {menuItems.map((item) =>
          hasAccess(item.permission) ? (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                selected={pathname === item.path}
                onClick={() => {
                  router.push(item.path);
                  if (isMobile) setMobileOpen(false);
                }}
                sx={navButtonSx()}
              >
                <ListItemIcon sx={{ color: 'text.secondary', minWidth: 36 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ) : null
        )}

        {settingsVisible && (
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={handleSettingsClick} sx={navButtonSx()}>
                <ListItemIcon sx={{ color: 'text.secondary', minWidth: 36 }}>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Settings" />
                {settingsOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>

            <Collapse in={settingsOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {settingsItems.map((item) =>
                  hasAccess(item.permission) ? (
                    <ListItem key={item.text} disablePadding>
                      <ListItemButton
                        selected={pathname === item.path}
                        onClick={() => {
                          router.push(item.path);
                          if (isMobile) setMobileOpen(false);
                        }}
                        sx={navButtonSx(true)}
                      >
                        <ListItemIcon sx={{ color: 'text.secondary', minWidth: 36 }}>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                      </ListItemButton>
                    </ListItem>
                  ) : null
                )}
              </List>
            </Collapse>
          </>
        )}

        {partnersVisible && (
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={handlePartnersClick} sx={navButtonSx()}>
                <ListItemIcon sx={{ color: 'text.secondary', minWidth: 36 }}>
                  <BusinessIcon />
                </ListItemIcon>
                <ListItemText primary="Partners" />
                {partnersOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>

            <Collapse in={partnersOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {partnerItems.map((item) =>
                  hasAccess(item.permission) ? (
                    <ListItem key={item.text} disablePadding>
                      <ListItemButton
                        selected={pathname === item.path}
                        onClick={() => {
                          router.push(item.path);
                          if (isMobile) setMobileOpen(false);
                        }}
                        sx={navButtonSx(true)}
                      >
                        <ListItemIcon sx={{ color: 'text.secondary', minWidth: 36 }}>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                      </ListItemButton>
                    </ListItem>
                  ) : null
                )}
              </List>
            </Collapse>
          </>
        )}
      </List>

      <Box sx={{ px: 2.5, pb: 2.5, pt: 1, borderTop: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(17,24,39,0.06)' }}>
        <Button
          fullWidth
          variant="outlined"
          color="inherit"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            justifyContent: 'flex-start',
            color: isDark ? '#e5e7eb' : '#111827',
            borderColor: isDark ? 'rgba(255,255,255,0.16)' : 'rgba(17,24,39,0.12)',
            '&:hover': {
              borderColor: isDark ? 'rgba(255,255,255,0.24)' : 'rgba(17,24,39,0.18)',
              background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(17,24,39,0.04)',
            },
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        color="default"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          bgcolor: isDark ? 'rgba(15,23,42,0.85)' : 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(10px)',
          color: 'text.primary',
          boxShadow: isDark ? '0 12px 30px rgba(0,0,0,0.45)' : '0 16px 40px rgba(79,70,229,0.12)',
          minHeight: 72,
        }}
      >
        <Toolbar sx={{ minHeight: 72 }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin Portal
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton sx={{ ml: 1 }} onClick={toggleMode} color="inherit">
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              height: '100%',
              background: isDark
                ? 'linear-gradient(180deg, #0b1222 0%, #0f172a 100%)'
                : 'linear-gradient(180deg, #eef2ff 0%, #ffffff 100%)',
              borderRight: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(79,70,229,0.12)',
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              height: '100%',
              background: isDark
                ? 'linear-gradient(180deg, #0b1222 0%, #0f172a 100%)'
                : 'linear-gradient(180deg, #eef2ff 0%, #ffffff 100%)',
              borderRight: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(79,70,229,0.12)',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
          background: isDark
            ? 'radial-gradient(circle at 20% 20%, rgba(79,70,229,0.12), transparent 30%), radial-gradient(circle at 80% 0%, rgba(16,185,129,0.10), transparent 25%), #0b1222'
            : 'radial-gradient(circle at 15% 20%, rgba(79,70,229,0.08), transparent 28%), radial-gradient(circle at 85% 10%, rgba(16,185,129,0.10), transparent 24%), #f5f7fb',
          minHeight: '100vh',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}



