import React from 'react';
import styles from './Home.module.scss'; // Import the module SCSS
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const Home = () => {
  return (
    <div className={styles.home}>
      <Header />
      <div className={styles.backgroundImage}></div>
      <Footer />
    </div>
  );
};

export default Home;
