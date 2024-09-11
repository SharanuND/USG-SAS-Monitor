import React, { useEffect, useState } from 'react';
import styles from './SasData.module.scss'; // Import the CSS Module

const SasData = () => {
    const [sasData1, setSasData1] = useState([]);
    const [sasData2, setSasData2] = useState([]);
    const [error1, setError1] = useState('');
    const [error2, setError2] = useState('');

    useEffect(() => {
        let interval1, interval2;

        // Load data from sessionStorage when the component mounts
        const storedSasData1 = sessionStorage.getItem('sasData1');
        const storedSasData2 = sessionStorage.getItem('sasData2');

        if (storedSasData1) {
            setSasData1(JSON.parse(storedSasData1));
        }
        if (storedSasData2) {
            setSasData2(JSON.parse(storedSasData2));
        }

        // Start fetching data immediately on component mount
        interval1 = setInterval(fetchSasData1, 1000); // Fetch data every second
        interval2 = setInterval(fetchSasData2, 1000); // Fetch data every second

        return () => {
            clearInterval(interval1);
            clearInterval(interval2);
        };
    }, []);

    // Clear sessionStorage on page refresh
    useEffect(() => {
        const handleBeforeUnload = () => {
            sessionStorage.removeItem('sasData1');
            sessionStorage.removeItem('sasData2');
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    const fetchSasData1 = async () => {
        try {
            const response = await fetch('http://pog1/api/v1/sas/data1', {
                method: 'GET',
            });

            if (response.ok) {
                const data = await response.json();
                const hexData1 = parseInt(data.data, 10).toString(16).toUpperCase(); // Convert to hexadecimal
                setSasData1(prevData => {
                    const newData = [...prevData, hexData1];
                    sessionStorage.setItem('sasData1', JSON.stringify(newData)); // Save to sessionStorage
                    return newData;
                });
                setError1('');
            } else {
                console.error('Failed to fetch SAS data1:', response.status);
                setError1(`Failed to fetch SAS data1: ${response.status}`);
            }
        } catch (error) {
            console.error('Error fetching SAS data1', error);
            setError1(`Network Error: ${error.message}`);
        }
    };

    const fetchSasData2 = async () => {
        try {
            const response = await fetch('http://pog1/api/v1/sas/data2', {
                method: 'GET',
            });

            if (response.ok) {
                const data = await response.json();
                const hexData2 = parseInt(data.data, 10).toString(16).toUpperCase(); // Convert to hexadecimal
                setSasData2(prevData => {
                    const newData = [...prevData, hexData2];
                    sessionStorage.setItem('sasData2', JSON.stringify(newData)); // Save to sessionStorage
                    return newData;
                });
                setError2('');
            } else {
                console.error('Failed to fetch SAS data2:', response.status);
                setError2(`Failed to fetch SAS data2: ${response.status}`);
            }
        } catch (error) {
            console.error('Error fetching SAS data2', error);
            setError2(`Network Error: ${error.message}`);
        }
    };

    return (
        <div className={styles.sasData}>
            <div className={styles.infoContainer}>
                <div className={styles.infoDetailsSas}>
                    <h3>Channel 1</h3>
                    <div className={styles.sasDataBox}>
                        <div>
                            {error1 && <p style={{ color: 'red' }}>{error1}</p>}
                            {sasData1.map((data, index) => (
                                <p key={index}>{data}</p>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={styles.infoDetailsSas}>
                    <h3>Channel 2</h3>
                    <div className={styles.sasDataBox}>
                        <div>
                            {error2 && <p style={{ color: 'red' }}>{error2}</p>}
                            {sasData2.map((data, index) => (
                                <p key={index}>{data}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SasData;
