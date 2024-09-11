import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs, Tab, Box, IconButton, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import UsgMenuData from '../../components/UsgMenuData/UsgMenuData';
import SasData from '../../components/SasData/SasData';

import styles from './DeviceDetails.module.scss';

const DeviceDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const device = location.state?.device || {}; // Retrieve device from state
  const [systemInfo, setSystemInfo] = useState({});
  const [value, setValue] = useState(0);

  useEffect(() => {
    const fetchSystemInfo = async () => {
      try {
        const response = await fetch('http://pog1/api/v1/system/info');
        if (response.ok) {
          const data = await response.json();
          setSystemInfo(data);
        } else {
          console.error('Failed to fetch system info:', response.status);
        }
      } catch (error) {
        console.error('Error fetching system info', error);
      }
    };

    
    fetchSystemInfo();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleBackClick = () => {
    navigate('/my-devices'); // Redirect to My Devices page
  }; 
  return (
    <div className={styles.deviceDetails}>
      <Header />
      <main className={styles.deviceDetailsContent}>
        <h2>Device Details</h2>
        <div className={styles.backButton}>
       
          <IconButton 
  onClick={handleBackClick} 
  color="primary"
  sx={{ 
    p: 0, // Remove default padding
    '& .MuiSvgIcon-root': { // Target the SVG icon inside IconButton
      fontSize: '16px', // Set the desired size
    } 
  }}
>
  <ArrowBackIosNewIcon />
</IconButton>

          <Typography 
            onClick={handleBackClick} 
            className={styles.backText}
          >
            My Devices
          </Typography>
        </div>
        <Typography variant="h4" className={styles.deviceName}>{device.name}</Typography>
        <Typography variant="body1" className={styles.deviceConfig}>{device.config}</Typography>

        {/* Device Heading */}
        <Typography variant="h5" className={styles.deviceHeading}>{device.name}</Typography>

        <div className={styles.systemInfoContainer}>
          {systemInfo.version && (
            <div className={styles.systemInfo}>
              <Typography variant="body2" className={styles.systemInfoTitle}>
                System Information
              </Typography>
              <Typography variant="body1">Version: <span className={styles.infoValue}>{systemInfo.version}</span></Typography>
              <Typography variant="body1">Board: <span className={styles.infoValue}>{systemInfo.board}</span></Typography>
               {/* <Typography variant="body1">Cores: <span className={styles.infoValue}>{systemInfo.cores}</span></Typography> */}
               
              {/* Display more system info if needed */}
            </div>
          )}
        </div>

        {/* Center the Tabs */}
       
        <Box className={styles.tabsContainer}>
  <Tabs
    value={value}
    onChange={handleChange}
    sx={{
      borderBottom: 1,
      borderColor: 'divider',
      '& .MuiTab-root': {
        flex: 'unset', // Remove flex properties
        textAlign: 'center', // Center the text
        minWidth: 200, // Adjust minimum width if needed
      },
    }}
    className={styles.tabs}
  >
    <Tab label="USG MENU DATA" />
    <Tab label="SAS DATA" />
  </Tabs>
</Box>

        <Box>
          {value === 0 && <UsgMenuData />}
          {value === 1 && <SasData />}
        </Box>
      </main>
      <Footer />
    </div>
  );
};

export default DeviceDetails;
