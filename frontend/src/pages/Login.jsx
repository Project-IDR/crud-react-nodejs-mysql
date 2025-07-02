// src/pages/Login.jsx
import { useEffect } from 'react';
import styles from './Login.module.css';

function Login() {
  useEffect(() => {
    document.body.style.background = '#1c1c1c';

    return () => {
      document.body.style.background = '';
    };
  }, []);
  
  return (
    <div className={styles.box}>
      <div className={styles['border-line']}></div>
      <form action="#">
        <h2>Sign in</h2>
        <div className={styles['input-box']}>
          <input type="text" required />
          <span>Username</span>
          <i></i>
        </div>
        <div className={styles['input-box']}>
          <input type="password" required />
          <span>Password</span>
          <i></i>
        </div>
        <div className={styles['imp-links']}>
          <a href="#">Forget Password</a>
          <a href="#">Sign up</a>
        </div>
        <input type="submit" value="Login" className={styles.btn} />
      </form>
    </div>
  );
}

export default Login;
