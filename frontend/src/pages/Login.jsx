// src/pages/Login.jsx
import { useState, useEffect } from 'react';
import styles from './Login.module.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Dummy data login (boleh kamu ganti sendiri)
  const dummyUser = {
    username: 'admin',
    password: '123456'
  };

  useEffect(() => {
    document.body.style.background = '#1c1c1c';
    return () => {
      document.body.style.background = '';
    };
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === dummyUser.username && password === dummyUser.password) {
      toast.success("Login berhasil! 👌", { position: "top-center", autoClose: 1500 });
      setTimeout(() => {
        navigate("/");
      }, 1600);
    } else {
      toast.error("Login gagal! Username atau password salah 😢", { position: "top-center" });
    }
  };

  return (
    <div className={styles.box}>
      <div className={styles['border-line']}></div>
      <form onSubmit={handleLogin}>
        <h2>Sign in</h2>
        <div className={styles['input-box']}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <span>Username</span>
          <i></i>
        </div>
        <div className={styles['input-box']}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
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
