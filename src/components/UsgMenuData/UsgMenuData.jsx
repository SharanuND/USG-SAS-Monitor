import React, { useState, useRef, useEffect } from 'react';
import styles from './UsgMenuData.module.scss'; // Using the correct CSS module
import { FaChevronDown } from 'react-icons/fa';
import SetTime from '../SetTime/SetTime'; // Import the SetTime component

const UsgMenuData = () => {
    const [command, setCommand] = useState('');
    const [response, setResponse] = useState('');
    const [error, setError] = useState('');
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showSetTime, setShowSetTime] = useState(false); // State to control SetTime visibility
    const inputRef = useRef(null);

    const commandOptions = [
        '?', 'CLRDAILY', 'GAMESTATS', 'TARGAFILE', 'LASTVOUCHER', 'DISABLE', 
        'AUDIT', 'CLRPERIOD', 'CLRCOLLECT', 'CLRCOMBO', 'CLRGSTATS', 'PLAYSONG', 
        'TIME', 'SETTIME', 'TGALN', 'TARGAXFER', 'ENABLE', 'DISABLE'
    ];

    // Clear localStorage on page refresh
    useEffect(() => {
        window.addEventListener('beforeunload', () => {
            localStorage.clear();
        });
        return () => {
            window.removeEventListener('beforeunload', () => {
                localStorage.clear();
            });
        };
    }, []);

    useEffect(() => {
        // Retrieve command and response from localStorage on component mount
        const savedCommand = localStorage.getItem('usgMenuDataCommand');
        const savedResponse = localStorage.getItem('usgMenuDataResponse');
        if (savedCommand) setCommand(savedCommand);
        if (savedResponse) setResponse(savedResponse);
    }, []);

    const processResponseText = (text) => {
        return text.replace(/\n\s*\n/g, '\n').trim();
    };

    const sendCommand = async () => {
        try {
            const commandWithCR = command + '\r';
            setIsLoading(true);
            const apiCallResponse = await fetch('http://pog1/api/v1/command', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ command: commandWithCR }),
            });

            if (apiCallResponse.ok) {
                console.log("Command sent successfully!");

                setTimeout(async () => {
                    const response = await fetch('http://pog1/api/v1/command/response', {
                        method: 'GET',
                    });

                    if (response.ok) {
                        const data = await response.json();
                        const processedResponse = processResponseText(data.response);
                        setResponse(processedResponse); // Set processed response text
                        setError('');

                        // Save both command and response to localStorage
                        localStorage.setItem('usgMenuDataCommand', command);
                        localStorage.setItem('usgMenuDataResponse', processedResponse);

                        if (command === 'SETTIME') {
                            setShowSetTime(true);
                        } else {
                            setShowSetTime(false);
                        }
                    } else {
                        console.error('Failed to fetch response:', response.status);
                        setError(`Failed to fetch response: ${response.status}`);
                    }
                    setIsLoading(false);
                }, 3000);
            } else {
                console.error('Command sending failed:', apiCallResponse.status);
                setError(`Command sending failed: ${apiCallResponse.status}`);
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Error sending command', error);
            setError(`Network Error: ${error.message}`);
            setIsLoading(false);
        }
    };

    const handleInputChange = (event) => {
        const value = event.target.value;
        setCommand(value);

        if (value.length > 0) {
            const filtered = commandOptions.filter(option =>
                option.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredOptions(filtered);
            setIsDropdownVisible(true);
        } else {
            setIsDropdownVisible(false);
        }
    };

    const handleOptionClick = (option) => {
        setCommand(option);
        setIsDropdownVisible(false);
    };

    const handleIconClick = () => {
        setFilteredOptions(commandOptions);
        setIsDropdownVisible(!isDropdownVisible);
    };

    return (
        <div className={styles.usgMenuData}>
            <div className={styles.inputContainer}>
                <div className={styles.inputWrapper}>
                    <input
                        type="text"
                        value={command}
                        onChange={handleInputChange}
                        placeholder="Enter command"
                        className={styles.commandInputBox}
                        ref={inputRef}
                    />
                    <FaChevronDown className={styles.dropdownIcon} onClick={handleIconClick} />
                    {isDropdownVisible && (
                        <div className={styles.dropdown}>
                            {filteredOptions.map((option, index) => (
                                <div
                                    key={index}
                                    className={styles.dropdownOption}
                                    onClick={() => handleOptionClick(option)}
                                >
                                    {option}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <button onClick={sendCommand} className={styles.commandButton}>Send Command</button>
            </div>
            <div className={styles.responseContainer}>
                {isLoading ? (
                    <div className={styles.loader}>Loading...</div>
                ) : response ? (
                    <pre className={styles.response}>{response}</pre>
                ) : error ? (
                    <p className={styles.error}>{error}</p>
                ) : null}
            </div>
            {showSetTime && <SetTime />} {/* Conditionally render SetTime component */}
        </div>
    );
};

export default UsgMenuData;
