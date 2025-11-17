import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Container } from "@mui/material";

function Header() {
  return (
    <AppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" component="h1" flex={1} fontWeight="700">
            ایوند
          </Typography>
          <Button color="inherit">ورود</Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
