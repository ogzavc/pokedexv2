"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import styles from "./appBar.module.css";

const menuPages = [
  { page: "/profile", title: "Profile" },
  { page: "/my-pokemons", title: "My Pokemons" },
];

function ResponsiveAppBar() {
  const router = useRouter();
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleUserMenuSelect = (page) => {
    setAnchorElUser(null);
    router.push(page);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  return (
    <AppBar color="default" position="relative">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box className={styles.logoContainer}>
            <Image
              src="/logo.svg"
              width={200}
              height={90}
              alt="Pokedex Logo"
              priority
            />
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton
              onClick={handleOpenUserMenu}
              className={styles.userMenuButton}
            >
              <Avatar />
            </IconButton>

            <Menu
              className={styles.menuStyles}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={() => setAnchorElUser(null)}
            >
              {menuPages.map(({ page, title }) => (
                <MenuItem
                  key={title}
                  onClick={() => handleUserMenuSelect(page)}
                >
                  <Typography className={styles.menuItemText}>
                    {title}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
