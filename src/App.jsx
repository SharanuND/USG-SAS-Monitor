import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import MyDevices from './pages/MyDevices/MyDevices';
import DeviceDetails from './pages/DeviceDetails/DeviceDetails';
import styles from './App.module.scss'; // Import the CSS module

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className={styles.app}> {/* Apply the CSS module class */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/my-devices" element={<MyDevices />} />
            <Route path="/device-details" element={<DeviceDetails />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;

