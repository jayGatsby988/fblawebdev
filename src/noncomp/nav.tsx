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
import { useParams, usePathname } from "next/navigation";

export default function Navbar() {
  const { user, logOut } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const isMobile = useMediaQuery("(max-width:600px)");
  const params = usePathname();
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
  }, [user, localStorage.getItem("userData")?.uid, params]); // Re-run effect when `user` state changes

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };
  const list = () => {
    var array = ["Help"];
    if (userRole == "Counselor" || userRole == "Employer") {
      array.push("Create");
    }
    if (userRole == "Counselor") {
      array.push("AdminPanel");
    }
    if (userRole) {
      array.push("Jobs");
    }
    array.push("Logout");
    return (
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          {(user
            ? ["Help", "Create", "AdminPanel", "Jobs", "Logout"]
            : ["Login"]
          ).map((text) => (
            <ListItem key={text} onClick={text === "Logout" ? logOut : null}>
              <Link
                href={
                  text === "Logout"
                    ? "/"
                    : text === "Create"
                    ? "/createJob"
                    : `/${text.toLowerCase()}`
                }
                passHref
              >
                <ListItemText primary={text} />
              </Link>
            </ListItem>
          ))}
        </List>
      </Box>
    );
  };

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
              <Button
                color="inherit"
                component={Link}
                href="/help"
                sx={{ margin: 1 }}
              >
                Help
              </Button>
              {user ? (
                <>
                  <Button
                    color="inherit"
                    component={Link}
                    href="/quick-find"
                    sx={{ margin: 1 }}
                  >
                    Build Resume
                  </Button>
                  <Button
                    color="inherit"
                    component={Link}
                    href="/createJob"
                    sx={{ margin: 1 }}
                    style={{
                      display: !(
                        userRole == "Counselor" || userRole == "Employer"
                      )
                        ? "none"
                        : "inherit",
                    }}
                  >
                    Create Job
                  </Button>
                  <Button
                    color="inherit"
                    component={Link}
                    href="/adminpanel"
                    style={{
                      display: !(userRole == "Counselor") ? "none" : "inherit",
                    }}
                    sx={{ margin: 1 }}
                  >
                    AdminPanel
                  </Button>
                </>
              ) : (
                ""
              )}
              <Button
                color="inherit"
                component={Link}
                href="/jobs"
                style={{
                  display: !(
                    userRole == "Counselor" ||
                    userRole == "Student" ||
                    userRole == "Employer"
                  )
                    ? "none"
                    : "inherit",
                }}
                sx={{ margin: 1 }}
              >
                Listings
              </Button>
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
                {user || userRole ? "Logout" : "Login"}
              </Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}
