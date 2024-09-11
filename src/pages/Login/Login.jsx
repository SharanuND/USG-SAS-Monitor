// import React, { useState } from 'react';
// import { Button, TextField, Link, Checkbox, FormControlLabel } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import Header from '../../components/Header/Header';
// import Footer from '../../components/Footer/Footer';
// import styles from './Login.module.scss';

// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleShowPasswordChange = (event) => {
//     setShowPassword(event.target.checked);
//   };

//   const handleSignUpClick = () => {
//     navigate('/signup');
//   };

//   return (
//     <div className={styles.loginPage}>
//       <Header />

//       <div className={styles.loginContent}>
//         <form>
//           <div className={styles.formHeader}>
//             <h2>Sign In</h2>
//           </div>
//           <TextField
//             label="Email"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             className={styles.usernameInput}
//           />
//           <TextField
//             label="Password"
//             type={showPassword ? 'text' : 'password'}
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             className={styles.passwordInput}
//           />
//           <div className={styles.passwordOptions}>
//             <FormControlLabel
//               className={styles.showPassword}
//               control={
//                 <Checkbox
//                   checked={showPassword}
//                   onChange={handleShowPasswordChange}
//                   sx={{
//                     transform: 'scale(1.2)', // Increase the checkbox size
//                     '& .MuiSvgIcon-root': {
//                       fontSize: 14, // Adjust icon size for the checkbox
//                     },
//                   }}
//                 />
//               }
//               label="Show Password"
//               componentsProps={{
//                 typography: {
//                   style: { fontSize: '12px' }, // Reduce the font size of the label
//                 },
//               }}
//             />
//             <Link className={styles.forgotPassword} href="#" underline="hover">
//               Forgot Password?
//             </Link>
//           </div>
//           <Button variant="contained" color="primary" fullWidth>
//             SIGN IN
//           </Button>
//           <div className={styles.signupPrompt}>
//             <span>Don’t have an account?</span>
//             <Link
//               href="#"
//               underline="hover"
//               onClick={handleSignUpClick}
//               sx={{ cursor: 'pointer' }}
//             >
//               Sign up
//             </Link>
//           </div>
//         </form>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default Login;
import React, { useState } from 'react';
import { Button, TextField, Link, Checkbox, FormControlLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './Login.module.scss';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleShowPasswordChange = (event) => {
    setShowPassword(event.target.checked);
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  const handleLogin = (event) => {
    event.preventDefault();

    // Updated dummy credentials
    const dummyEmail = 'admin';
    const dummyPassword = 'user@thing';

    // Validate login
    if (email === dummyEmail && password === dummyPassword) {
      setError('');
      navigate('/my-devices'); // Redirect to the landing page
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className={styles.loginPage}>
      <Header />

      <div className={styles.loginContent}>
        <form onSubmit={handleLogin}>
          <div className={styles.formHeader}>
            <h2>Sign In</h2>
          </div>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            className={styles.usernameInput}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            margin="normal"
            className={styles.passwordInput}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className={styles.passwordOptions}>
            <FormControlLabel
              className={styles.showPassword}
              control={
                <Checkbox
                  checked={showPassword}
                  onChange={handleShowPasswordChange}
                  sx={{
                    transform: 'scale(1.2)', // Increase the checkbox size
                    '& .MuiSvgIcon-root': {
                      fontSize: 14, // Adjust icon size for the checkbox
                    },
                  }}
                />
              }
              label="Show Password"
              componentsProps={{
                typography: {
                  style: { fontSize: '12px' }, // Reduce the font size of the label
                },
              }}
            />
            <Link className={styles.forgotPassword} href="#" underline="hover">
              Forgot Password?
            </Link>
          </div>
          {error && <div className={styles.errorMessage}>{error}</div>}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            SIGN IN
          </Button>
          <div className={styles.signupPrompt}>
            <span>Don’t have an account?</span>
            <Link
              href="#"
              underline="hover"
              onClick={handleSignUpClick}
              sx={{ cursor: 'pointer' }}
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
