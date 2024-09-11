import React, { useState, useEffect } from 'react';
import styles from './SetTime.module.scss'; // Import the SCSS module for styling

const SetTime = () => {
    const [manualTime, setManualTime] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isManual, setIsManual] = useState(true); // State to determine manual or current time option
    const [isInputValid, setIsInputValid] = useState(false); // To check if input is valid

    // Effect to set the current time automatically when the component mounts
    useEffect(() => {
        if (!isManual) {
            const now = new Date();
            const formattedTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')} ${now.getMonth() + 1}/${now.getDate().toString().padStart(2, '0')}/${now.getFullYear().toString().slice(-2)}`;
            setManualTime(formattedTime);
            setIsInputValid(true); // Input is valid when current time is filled
        }
    }, [isManual]);

    const handleManualTimeChange = (event) => {
        const value = event.target.value;
        setManualTime(value);
        // Validate input format
        setIsInputValid(/^(\d{2}):(\d{2}):(\d{2}) (\d{2})\/(\d{2})\/(\d{2})$/.test(value));
    };

    
    const handleSetTime = async () => {
        if (!isInputValid) {
            setErrorMessage('Invalid time format. Please use HH:MM:SS MM/DD/YY.');
            return;
        }
        try {
            const response = await fetch('http://pog1/api/v1/command', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ command: `SETTIME ${manualTime}` }),
            });

            if (response.ok) {
                setSuccessMessage('Time set successfully!');
                setErrorMessage('');
            } else {
                setErrorMessage(`Failed to set time: ${response.status}`);
                setSuccessMessage('');
            }
        } catch (error) {
            setErrorMessage(`Network Error: ${error.message}`);
            setSuccessMessage('');
        }
    };

    const handleOptionChange = (option) => {
        setIsManual(option === 'manual');
        if (option === 'manual') {
            setManualTime(''); // Clear the input when switching to manual
            setIsInputValid(false); // Input is not valid when cleared
        } else {
            const now = new Date();
            const formattedTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')} ${now.getMonth() + 1}/${now.getDate().toString().padStart(2, '0')}/${now.getFullYear().toString().slice(-2)}`;
            setManualTime(formattedTime);
            setIsInputValid(true); // Input is valid when current time is filled
        }
    };

    return (
        <div className={styles.setTime}>
            <h2 className={styles.title}>Set Time</h2>
            <div className={styles.optionContainer}>
                <label>
                    <input
                        type="radio"
                        checked={isManual}
                        onChange={() => handleOptionChange('manual')}
                    />
                    Manual
                </label>
                <label>
                    <input
                        type="radio"
                        checked={!isManual}
                        onChange={() => handleOptionChange('current')}
                    />
                    Current Time
                </label>
            </div>
            <div className={styles.inputContainer}>
                <input
                    type="text"
                    value={manualTime}
                    onChange={handleManualTimeChange}
                    placeholder={!isInputValid ? 'HH:MM:SS MM/DD/YY' : ''}
                    className={styles.timeInput}
                />
                <button
                    onClick={handleSetTime}
                    className={styles.setTimeButton}
                    disabled={!isInputValid} // Disable button if input is not valid
                >
                    Set Time
                </button>
            </div>
            {successMessage && <p className={styles.success}>{successMessage}</p>}
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        </div>
    );
};

export default SetTime;
