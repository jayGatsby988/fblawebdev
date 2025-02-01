"use client";
import React, { useState } from "react";
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

export default function Navbar() {
  const { user, logOut } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");

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
        {(user ? ["Create", "AdminPanel", "Jobs", "Logout"] : ["Login"]).map(
          (text, index) => (
            <ListItem
              key={text}
              onClick={text === "Logout" ? logOut : null}
              component={Link}
              href={
                text === "Logout"
                  ? "/"
                  : text == "Create"
                  ? "/createJob"
                  : `/${text.toLowerCase()}`
              }
            >
              <ListItemText primary={text} />
            </ListItem>
          )
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
                  <Button
                    color="inherit"
                    component={Link}
                    href="/createJob"
                    sx={{ margin: 1 }}
                  >
                    Create Job
                  </Button>
                  <Button
                    color="inherit"
                    component={Link}
                    href="/adminpanel"
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
                {user ? "Logout" : "Login"}
              </Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}
