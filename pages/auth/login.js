import {useState} from 'react';
import Link from 'next/link'
import axios from 'axios';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { Spinner } from 'reactstrap';

import styles from '../../styles/Login.module.css';
import Layout from '../../components/layout';
import { useRouter } from 'next/router'

export default function Login() {
  const router = useRouter();

  const MySwal = withReactContent(Swal)


  const [showPassword, setShowPassword] = useState('password');
  const [eye, setEye] = useState('fa-eye');
  const [isLoading, setIsLoading] = useState(false);

  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');


  const handleInputChange = (event) => {
      event.persist();
      let inputName = event.target.name;
      let inputText = event.target.value;

      if (inputName === 'username') setUsername(inputText);
      if (inputName === 'password') setPassword(inputText);
  }

  const showPasswordHandler = () => {
    if (showPassword == "password") {
      setShowPassword("text");
      setEye('fa-eye-slash');
    } else {
      setShowPassword("password");
      setEye('fa-eye');
    }
  }

  const onSubmitHandler = (e) => {
     e.preventDefault();

     setIsLoading(true)

        const data = { username, password}
        axios({
            method: 'post',
            url: 'https://playpesa.herokuapp.com/api/login',
            data: data
        }).then((response) => {
          setIsLoading(false)
            console.log(response);

            if (response.status == 200) {
              MySwal.fire({
                position: 'center',
                icon: 'success',
                title: <h5>Your have been logged in</h5>,
                showConfirmButton: false,
                timer: 1500
              })
              .then((result) => router.push('/auth/clubType', '/clubType'))
              
           }else{
              MySwal.fire({
                position: 'center',
                icon: 'error',
                title: <h5>Invalid email/phone number or password</h5>,
                showConfirmButton: false,
                timer: 1500
              })
           }
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
          // always executed
          setIsLoading(false)
        });
  }
   
  return (
    <Layout title="Login">

      <div className={styles.container}>

        {isLoading ? (
          <div className={styles.spinner_container}>
            <Spinner type="grow" className={styles.spinner} color="danger" />
          </div>
         ): null}
  
        <div className={styles.logo_img_container}>
          <img className={styles.logo_img} src="/assets/images/logo.png" />
        </div> 
  
        <div className={styles.soccer_img_container}>
          <img className={styles.soccer_img} src="/assets/images/soccer.png" />
        </div> 
  
        <div className={styles.text_container}>
          <h2 className={styles.header_primary}>Welcome!</h2>
          <p className={styles.p_text}>Sign in or create new account below</p>

          <div>
            <button className={styles.btn}>
              &nbsp;<i className={`fab fa-google ${styles.fa_google}`}></i> Sign In With Google
             </button> 
          </div>
          
        </div>
  
        <form className={styles.text_container} onSubmit={onSubmitHandler}>
          <input type="text" className={styles.input} value={username} name="username" placeholder="Enter email or phone number" onChange={handleInputChange} required />
          <input type={showPassword} className={styles.input} name="password" value={password} placeholder="Enter your password" onChange={handleInputChange} required />
          <i className={`fas ${eye} ${styles.field_icon}`} onClick={showPasswordHandler}></i>
  
          <input type="submit" value="Login" className={styles.loginBtn} />
            
          
  
          <p className = { styles.p_text}> Don 't have an account 
             <span><Link href="/auth/signup" as="/sign-up"><a className={styles.span_text}> {' '}Sign up</a></Link></span>
          </p>
  
          <a className={styles.forgot_link}>Forgot password</a>
        </form>
  
      </div>
    
    </Layout>
  )
}