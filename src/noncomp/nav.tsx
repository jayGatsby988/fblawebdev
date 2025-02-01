"use client";
import React, { useState, useEffect } from "react";
import {
  useMediaQuery,
  Box,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import Link from "next/link";
import logoText from "../../public/images/logoPlain.png";
import { useAuth } from "@/app/context/authcontext";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { user, logOut } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const isMobile = useMediaQuery("(max-width:600px)");

  const pathname = usePathname();
  // Ensure the user role is updated when the user state changes
  useEffect(() => {
    if (user) {
      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        setUserRole(userData?.role); // Update role based on stored user data
      }
    } else {
      setUserRole(null); // Set role to null if no user is logged in
    }
  }, [user, pathname]); // Re-run effect when `user` state changes
  console.log(user);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {userRole ? (
          <>
            {/* Show only if the user is a counselor, employer, or has specific permissions */}
            {userRole === "Counselor" || userRole === "Employer" ? (
              <>
                <ListItem component={Link} href="/createJob">
                  <ListItemText primary="Create Job" />
                </ListItem>
                {userRole === "Counselor" && (
                  <ListItem component={Link} href="/adminpanel">
                    <ListItemText primary="Admin Panel" />
                  </ListItem>
                )}
              </>
            ) : null}
            <ListItem component={Link} href="/jobs">
              <ListItemText primary="Jobs" />
            </ListItem>
            <ListItem onClick={logOut} component={Link} href="/">
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          <ListItem component={Link} href="/login">
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      color="inherit"
      sx={{ boxShadow: 1, zIndex: 10000000 }}
    >
      <Toolbar>
        <Link href="/" passHref>
          <Image
            src={logoText}
            alt="Logo"
            style={{
              flexGrow: 1,
              textDecoration: "none",
              color: "inherit",
              maxWidth: "100px",
              padding: "10px",
              paddingLeft: 0,
            }}
          />
        </Link>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
        >
          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                edge="end"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor={"right"}
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                style={{ zIndex: 100000000 }}
              >
                {list()}
              </Drawer>
            </>
          ) : (
            <>
              {user ? (
                <>
                  {/* Show these buttons only for employers and counselors */}
                  {userRole === "Employer" || userRole === "Counselor" ? (
                    <Button
                      color="inherit"
                      component={Link}
                      href="/createJob"
                      sx={{ margin: 1 }}
                    >
                      Create Job
                    </Button>
                  ) : null}

                  {/* Admin panel only visible for counselors */}
                  {userRole === "Counselor" && (
                    <Button
                      color="inherit"
                      component={Link}
                      href="/adminpanel"
                      sx={{ margin: 1 }}
                    >
                      Admin Panel
                    </Button>
                  )}
                  <Button
                    color="inherit"
                    component={Link}
                    href="/jobs"
                    sx={{ margin: 1 }}
                  >
                    Job Listings
                  </Button>
                </>
              ) : null}

              <Button
                variant="contained"
                color="primary"
                component={Link}
                href="/login"
                onClick={logOut}
                sx={{
                  margin: 1,
                  backgroundColor: "rgb(37,99,235)",
                }}
              >
                {userRole ? "Logout" : "Login"}
              </Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}
