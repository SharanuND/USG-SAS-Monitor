import React, { useState } from 'react';
import SetTime from '../SetTime/SetTime'; // Adjust import path as needed

const CommandInput = () => {
  const [command, setCommand] = useState('');

  const handleCommandSubmit = () => {
    if (command === 'settime') {
      // Show the SetTime component
    }
  };

  const handleSetTime = (time) => {
    // Logic to send the settime command with the provided time
    console.log('Setting time to:', time);
    // Simulate sending the command
    // e.g., axios.post('/api/settime', { time });
  };

  return (
    <div>
      <input
        type="text"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        placeholder="Enter command"
        
      />
      <button onClick={handleCommandSubmit}>Submit</button>
      {command === 'settime' && <SetTime onSetTime={handleSetTime} />}
    </div>
  );
};

export default CommandInput;
