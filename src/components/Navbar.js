import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 2 }}>
          Live Stream Dashboard
        </Typography>
        <Button color="inherit" href="/">
          Dashboard
        </Button>
        <Button color="inherit" href="/charts">
          Charts
        </Button>
        <Button color="inherit" href="/table">
          Table View
        </Button>
        {/* <Button color="inherit" href="/json">
          JSON Viewer
        </Button> */}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
