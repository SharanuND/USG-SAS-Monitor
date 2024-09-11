import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DeviceCard.module.scss';
import { Card, CardContent, Typography, Button, IconButton, Menu, MenuItem, TextField } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const DeviceCard = ({ id, name, config, onRemove, onEdit }) => {
  const [deviceName, setDeviceName] = useState(name);
  const [editing, setEditing] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [infoFetched, setInfoFetched] = useState(false);
  const [systemInfo, setSystemInfo] = useState({});
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // Fetch system info
  const fetchSystemInfo = async () => {
    try {
      const response = await fetch('http://pog1/api/v1/system/info', { method: 'GET' });

      if (response.ok) {
        const data = await response.json();
        setSystemInfo(data);
        setError('');
      } else {
        console.error('Failed to fetch system info:', response.status);
        setError(`Failed to fetch system info: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching system info', error);
      setError(`Network Error: ${error.message}`);
    }
  };

  const handleCardClick = () => {
    if (infoFetched) {
      navigate('/device-details', {
        state: { id, name: deviceName, config, systemInfo }
      });
    }
  };

  const handleViewClick = async (event) => {
    event.stopPropagation();
    if (!showInfo) {
      await fetchSystemInfo();
      setShowInfo(true);
      setInfoFetched(true);
    }
  };

  const handleMenuClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setEditing(true);
    handleMenuClose();
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove(id);
    } else {
      console.error('onRemove is not a function');
    }
    handleMenuClose();
  };

  const handleNameChange = (event) => {
    setDeviceName(event.target.value);
  };

  const handleNameSave = () => {
    setEditing(false);
    if (onEdit) {
      onEdit(id, deviceName);
    } else {
      console.error('onEdit is not a function');
    }
  };

  return (
    <Card
      className={styles.deviceCard}
      onClick={handleCardClick}
      style={{ cursor: showInfo ? 'default' : 'pointer' }}
    >
      <div className={styles.cardHeader}>
        <IconButton className={styles.moreIcon} onClick={handleMenuClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
          <MenuItem onClick={handleRemove}>Remove</MenuItem>
        </Menu>
      </div>
      <CardContent>
        {editing ? (
          <TextField
            value={deviceName}
            onChange={handleNameChange}
            onBlur={handleNameSave}
            autoFocus
            variant="outlined"
            size="small"
            className={styles.deviceNameInput}
          />
        ) : (
          <Typography variant="h6">{deviceName}</Typography>
        )}
        {showInfo && (
          <div className={styles.infoDetails}>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {systemInfo.version && <p>Version: {systemInfo.version}</p>}
            {systemInfo.cores && <p>Cores: {systemInfo.cores}</p>}
          </div>
        )}
        {!showInfo && (
          <Button
            variant="contained"
            color="secondary"
            className={styles.viewButton}
            size="small"
            onClick={handleViewClick}
          >
            View
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default DeviceCard;
