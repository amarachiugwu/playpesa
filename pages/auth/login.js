import {useState} from 'react';
import Link from 'next/link'

import styles from '../../styles/Login.module.css';
import Layout from '../../components/layout';

export default function Login() {

  const [showPassword, setShowPassword] = useState('password');
  const [eye, setEye] = useState('fa-eye');

  const showPasswordHandler = () => {
    if (showPassword == "password") {
      setShowPassword("text");
      setEye('fa-eye-slash');
    } else {
      setShowPassword("password");
      setEye('fa-eye');
    }
  }
   
  return (
    <Layout title="Login">

      <div className={styles.container}>
  
        <div className={styles.logo_img_container}>
          <img className={styles.logo_img} src="/assets/images/logo.png" />
        </div> 
  
        <div className={styles.soccer_img_container}>
          <img className={styles.soccer_img} src="/assets/images/soccer.png" />
        </div> 
  
        <div className={styles.text_container}>
          <h2 className={styles.header_primary}>Welcome!</h2>
          <p className={styles.p_text}>Sign in or create new account below</p>
          
          <button className={styles.btn}>&nbsp;<i className={`fab fa-google ${styles.fa_google}`}></i> Sign In With Google</button> 
        </div>
  
        <form className={styles.text_container}>
          <input type="text" className={styles.input} placeholder="Enter email or phone number" />
          <input type={showPassword} className={styles.input} placeholder="Enter your password" />
          <i className={`fas ${eye} ${styles.field_icon}`} onClick={showPasswordHandler}></i>
  
          <a href="/auth/google" className={styles.loginBtn}>
            
            Login
          </a>
  
          <p className = { styles.p_text}> Don 't have an account 
            &nbsp; <span className={styles.span_text}><Link href="/auth/signup" as="/sign-up"><a>Sign Up</a></Link></span>
          </p>
  
          <a className={styles.forgot_link}>Forgot password</a>
        </form>
  
      </div>
    
    </Layout>
  )
}

