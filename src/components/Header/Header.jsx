
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import logo from '../../assets/SGVI_logo.jpg'


const Header = () => {
  return (
    <AppBar position="static" className={styles.header}>
      <Toolbar className={styles.headerToolbar}>
        <Link to="/" className={styles.logoLink}>
          <img 
            src={logo}  // Use the imported logo
            alt="MyLogo" 
            className={styles.logo} 
          />
        </Link>
        <div className={styles.menuItems}>
          <Link to="/" className={styles.menuLink}>
            <Typography className={styles.menu}>Home</Typography>
          </Link>
          <Link to="/about" className={styles.menuLink}>
            <Typography className={styles.menu}>About</Typography>
          </Link>
          <Link to="/contact" className={styles.menuLink}>
            <Typography className={styles.menu}>Contact</Typography>
          </Link>
          {/* <Link to="/my-devices" className={styles.menuLink}>
            <Typography className={styles.menu}>Devices</Typography>
          </Link> */}
        </div>
        <Link to="/login" className={styles.loginLink}>
          <Button color="inherit" className={styles.loginButton}>
            Sign In
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
