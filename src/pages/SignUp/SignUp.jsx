import React from 'react';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Header from '../../components/Header/Header'; // Import header (remains unchanged)
import Footer from '../../components/Footer/Footer'; // Import footer (remains unchanged)
import styles from './SignUp.module.scss'; // Import the CSS module for SignUp component

const SignUp = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleSignUp = () => {
    // Handle the actual sign-up logic here
    // For example, validate the form and send data to the server

    // After successful sign-up, navigate to the Login page
    navigate('/login');
  };

  return (
    <div className={styles.signUpPage}> {/* Apply styles using the CSS module */}
      <Header /> {/* Header remains unchanged */}
      
      <div className={styles.signUpContent}>
        <form className={styles.signUpForm}>
          <h2>Sign Up</h2>
          <TextField label="First Name" variant="outlined" fullWidth margin="normal" />
          <TextField label="Last Name" variant="outlined" fullWidth margin="normal" />
          <TextField label="Email" variant="outlined" fullWidth margin="normal" />
          <TextField label="Password" type="password" variant="outlined" fullWidth margin="normal" />
          <TextField label="Re-enter Password" type="password" variant="outlined" fullWidth margin="normal" />
          <TextField label="OTP" variant="outlined" fullWidth margin="normal" />
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth
            onClick={handleSignUp} // Attach click handler
          >
            Sign Up
          </Button>
        </form>
      </div>
      
      <Footer /> {/* Footer remains unchanged */}
    </div>
  );
};

export default SignUp;
