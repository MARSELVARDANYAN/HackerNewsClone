import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Fade,
  Divider,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import CommentIcon from "@mui/icons-material/Comment";
import WorkIcon from "@mui/icons-material/Work";
import SendIcon from "@mui/icons-material/Send";
import HistoryIcon from "@mui/icons-material/History";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LoginIcon from "@mui/icons-material/Login";

const NavBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navItems = [
    {
      label: "new",
      path: "/newest",
      icon: <NewReleasesIcon fontSize="small" />,
    },
    { label: "past", path: "/front", icon: <HistoryIcon fontSize="small" /> },
    {
      label: "comments",
      path: "/comments",
      icon: <CommentIcon fontSize="small" />,
    },
    { label: "ask", path: "/ask", icon: <CommentIcon fontSize="small" /> },
    {
      label: "show",
      path: "/show",
      icon: <NewReleasesIcon fontSize="small" />,
    },
    { label: "jobs", path: "/jobs", icon: <WorkIcon fontSize="small" /> },
    { label: "posts", path: "/submit", icon: <SendIcon fontSize="small" /> },
    {
      label: "register",
      path: "/register",
      icon: <HowToRegIcon fontSize="small" />,
    },
    { label: "login", path: "/login", icon: <LoginIcon fontSize="small" /> },
    {
      label: "logout",
      path: "/logout",
      icon: <ExitToAppIcon fontSize="small" />,
    },
  ];

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#fff",
        color: "#000",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        borderBottom: "1px solid #eee",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          padding: { xs: "0 8px", sm: "0 16px" },
        }}
      >
        {/* Logo with animation */}
        <Button
          component={Link}
          to="/"
          sx={{
            textTransform: "none",
            p: 0,
            minWidth: "auto",
            "&:hover": {
              backgroundColor: "transparent",
              transform: "scale(1.03)",
              transition: "transform 0.3s ease",
            },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 900,
              letterSpacing: -1.2,
              fontFamily:
                "'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif",
              fontSize: { xs: "1.3rem", sm: "1.7rem" },
              background: "linear-gradient(45deg, #ff5500 0%, #ff9900 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0px 2px 4px rgba(0,0,0,0.1)",
              position: "relative",
              display: "inline-block",
              padding: "0 4px",
              transform: "skewX(-5deg)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "skewX(-5deg) scale(1.05)",
                textShadow: "0px 4px 8px rgba(0,0,0,0.15)",
              },
              "&::before": {
                content: '""',
                position: "absolute",
                bottom: -4,
                left: 0,
                right: 0,
                height: "2px",
                background:
                  "linear-gradient(90deg, transparent, #ff5500, transparent)",
                opacity: 0.7,
                transition: "all 0.3s ease",
              },
              "&:hover::before": {
                height: "3px",
                opacity: 1,
                bottom: -6,
              },
            }}
          >
            HACKERNEWS
          </Typography>
        </Button>

        {/* Desktop menu */}
        {!isMobile && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            {navItems.map((item, index) => (
              <Button
                key={index}
                component={Link}
                to={item.path}
                sx={{
                  color: "#000",
                  textTransform: "capitalize",
                  fontSize: "0.8rem",
                  fontWeight: index < 6 ? 600 : 400,
                  minWidth: "auto",
                  px: 1,
                  py: 0.5,
                  borderRadius: "4px",
                  "&:hover": {
                    backgroundColor: "#fff5eb",
                    color: "#ff6600",
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        )}

        {/* Mobile menu */}
        {isMobile && (
          <>
            <IconButton
              size="medium"
              aria-label="menu"
              onClick={handleMenuOpen}
              sx={{
                color: "#ff6600",
                backgroundColor: "#fff5eb",
                "&:hover": {
                  backgroundColor: "#ffe8d1",
                },
              }}
            >
              <MenuIcon />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              TransitionComponent={Fade}
              PaperProps={{
                sx: {
                  minWidth: 220,
                  borderRadius: "12px",
                  boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
                  mt: 1,
                },
              }}
              MenuListProps={{
                sx: { py: 0 },
              }}
            >
              <MenuItem
                component={Link}
                to="/"
                onClick={handleMenuClose}
                sx={{
                  backgroundColor: "#fff5eb",
                  py: 1.5,
                  "&:hover": {
                    backgroundColor: "#ffe8d1",
                  },
                }}
              >
                <ListItemIcon>
                  <AccountCircle sx={{ color: "#ff6600" }} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography sx={{ fontWeight: 700 }}>HACKERNEWS</Typography>
                  }
                />
              </MenuItem>

              <Divider />

              {navItems.slice(0, 6).map((item, index) => (
                <MenuItem
                  key={index}
                  component={Link}
                  to={item.path}
                  onClick={handleMenuClose}
                  sx={{
                    py: 1.2,
                    "&:hover": {
                      backgroundColor: "#fff9f2",
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      variant: "body2",
                      fontWeight: 500,
                    }}
                  />
                </MenuItem>
              ))}

              <Divider />

              {navItems.slice(6).map((item, index) => (
                <MenuItem
                  key={index}
                  component={Link}
                  to={item.path}
                  onClick={handleMenuClose}
                  sx={{
                    py: 1.2,
                    "&:hover": {
                      backgroundColor: "#fff9f2",
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      variant: "body2",
                      fontWeight: 500,
                    }}
                  />
                </MenuItem>
              ))}
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
