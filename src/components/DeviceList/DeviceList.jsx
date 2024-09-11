import React, { useState } from 'react';
import DeviceCard from './DeviceCard';
import './DeviceList.css'; // Ensure this file contains the necessary styles

const DeviceList = () => {
  const [devices, setDevices] = useState([
    { id: 1, name: 'Device 1', config: 'Config A' },
    { id: 2, name: 'Device 2', config: 'Config B' },
    { id: 3, name: 'Device 3', config: 'Config C' },
    // Add more devices as needed
  ]);

  const removeDevice = (id) => {
    setDevices(devices.filter(device => device.id !== id));
  };

  const editDevice = (id, newName) => {
    setDevices(devices.map(device =>
      device.id === id ? { ...device, name: newName } : device
    ));
  };

  return (
    <div className="deviceListContainer">
      {devices.map(device => (
        <DeviceCard
          key={device.id}
          id={device.id}
          name={device.name}
          onRemove={() => removeDevice(device.id)}
          onEdit={(id, newName) => editDevice(id, newName)}
        />
      ))}
    </div>
  );
};

export default DeviceList;
