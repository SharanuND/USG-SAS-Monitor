import React from 'react';
import { Button } from '@mui/material';
import DeviceCard from '../../components/DeviceCard/DeviceCard';
import Header from '../../components/Header/Header'; // Adjust the import path as necessary
import Footer from '../../components/Footer/Footer'; // Adjust the import path as necessary
import styles from './MyDevices.module.scss'; // Import the CSS module

const MyDevices = () => {
  return (
    <div className={styles.myDevicesPage}> {/* Apply styles using the CSS module */}
      <Header />  {/* Include the Header */}
      
      <div className={styles.myDevicesContent}>
        <div className={styles.headerSection}>
          <h2 className={styles.headerName}>My Devices</h2>
          <Button variant="contained" color="primary" className={styles.addDeviceButton}>
            + Add Device
          </Button>
        </div>
        <div className={styles.deviceList}>
          <DeviceCard name="POG_1" config="Configuration 1" />
          <DeviceCard name="POG_2" config="Configuration 2" />
          <DeviceCard name="POG_3" config="Configuration 3" />
        </div>
      </div>
      
      <Footer /> {/* Include the Footer */}
    </div>
  );
};

export default MyDevices;
