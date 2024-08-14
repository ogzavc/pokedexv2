"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Image,
  AppBar,
  Container,
  Toolbar,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
} from "@/components";
import styles from "./styles.module.css";

const menuPages = [
  { page: "/profile", title: "Profile" },
  { page: "/my-pokemons", title: "My Pokemons" },
];

function AppHeader() {
  const router = useRouter();
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleUserMenuSelect = (page) => {
    setAnchorElUser(null);
    router.push(page);
  };

  return (
    <AppBar color="default" position="relative">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            className={styles.logoContainer}
            onClick={() => router.push(`/`)}
          >
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
export default AppHeader;
