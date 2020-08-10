import {useState} from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { Spinner } from 'reactstrap';

import axios from 'axios';

import styles from '../../styles/Signup.module.css';
import Layout from '../../components/layout';
import  {isEmpty} from '../../lib/utilities';



export default function Signup({region}) {
   const router = useRouter();
   const MySwal = withReactContent(Swal);

    const [validationErrors, setValidationErrors] = useState({});
    const [showPassword, setShowPassword] = useState('password');
    const [eye, setEye] = useState('fa-eye');
    const [isLoading, setIsLoading] = useState(false);

    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    
    const handleInputChange = (event) => {
        event.persist();
        let inputName = event.target.name;
        let inputText = event.target.value;

        if (inputName === 'email') setEmail(inputText);
        if (inputName === 'password') setPassword(inputText);
        if (inputName === 'firstName') setFirstName(inputText);
        if (inputName === 'lastName') setLastName(inputText);

       
        
    }
    
    const showPasswordHandler = () => {
       if (showPassword == "password") {
           setShowPassword("text");
           setEye('fa-eye-slash');
        }
       else {
           setShowPassword("password");
           setEye('fa-eye');
        }
    }
    
    const submitFormHandler = (e) => {
        e.preventDefault();

        router.push('/auth/club', '/club')

        const postData = {
            firstName, lastName,  email,  password
        }

        let checkErrors = validate(postData);

        
        if (isEmpty(checkErrors)){
            console.log(postData);
            // storageSave('userBioData', data);
            // router.push('/auth/clubType', '/clubType');
            setIsLoading(true);
            axios({
                method: 'post',
                url: 'https://playpesa.herokuapp.com/api/clubs',
                data: postData
            }).then((response) => {
            setIsLoading(false)
                console.log(response);

                if (response.status == 200) {
                MySwal.fire({
                    position: 'center',
                    icon: 'success',
                    title: <h5>Your have successfully sign up</h5>,
                    showConfirmButton: false,
                    timer: 1500
                })
                .then((result) => router.push('/auth/club', '/club'))
                
            }else{
                MySwal.fire({
                    position: 'center',
                    icon: 'error',
                    title: <h5>Unable to sign you up, try again</h5>,
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
                setIsLoading(false);
                router.push('/auth/club', '/club')
            });

            }
        else {
            setValidationErrors(checkErrors);
            return false
        };
       
    }

    const validate = values => {
        const errors = {};
        if (!values.firstName) {
            errors.firstName = 'Required';
        } 

        if (!values.lastName) {
            errors.lastName = 'Required';
        } 
        
        if (!values.phoneNo) {
            errors.phoneNo = 'Required';
        } else if (isNaN(values.phoneNo)) {
            errors.phoneNo = 'Phone number must be a number ';
        }

        if (!values.email) {
            errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }
    
        if (!values.country) {
            errors.country = 'Required';
        } else if (values.country == "default") {
            errors.country = 'required';
        }

        if (!values.userState) {
            errors.userState = 'Required';
        } else if (values.userState == "default") {
            errors.userState = 'Enter a valid state name';
        }

        if (!values.password) {
            errors.password = 'Required';
        } else if (values.password.length < 8 ) {
            errors.password = 'Password must be greather than 8 letters';
        } else if (/^[a-zA-Z0-9]+$/.test(values.email)) {
            errors.password = 'Password must be alpha-numeric';
        }


        return errors;
    };
    
    
   
  return (
    <Layout title="Signup">

      <div className={styles.container}>
         {isLoading ? (
            <div className={styles.spinner_container}>
               <Spinner type="grow" className={styles.spinner} color="danger" />
            </div>
         ): null}
          
            <div className={styles.logo_img_container}>
                <img className={styles.logo_img} src="/assets/images/logo.png" />
            </div> 


            <form className={styles.text_container} onSubmit={submitFormHandler}>
            <h2 className={styles.header_primary}>Fill in your Bio Data below!</h2>
                <div className={styles.input_group}>
                    <input id="firstName" name="firstName" value={firstName} type="text" className={styles.input} placeholder="First name" onChange={handleInputChange} />
                    {validationErrors.firstName ? (<div className={styles.errormsg}>{validationErrors.firstName}</div>) : null }
                </div>
                <div className={styles.input_group}>
                    <input id="lastName" name="lastName" value={lastName} type="text" className={styles.input} placeholder="Last name" onChange={handleInputChange} />
                    {validationErrors.lastName ? (<div className={styles.errormsg}>{validationErrors.lastName}</div>) : null }
                </div>
               
                <div className={styles.input_group}>
                    <input id="email" name="email" value={email} type="text" className={styles.input} placeholder="Email Address" onChange={handleInputChange} />
                    {validationErrors.email ? (<div className={styles.errormsg}>{validationErrors.email}</div>) : null }
                </div>

             
                <div className={styles.input_group}>
                    <input id="password" type={showPassword} value={password} name="password" className={styles.input} placeholder="Password" onChange={handleInputChange} />
                    <i className={`fas ${eye} ${styles.field_icon}`} onClick={showPasswordHandler}></i>
                    {validationErrors.password ? (<div className={styles.errormsg}>{validationErrors.password}</div>) : null }
                </div>

              
                <input type="submit" value="Sign up" className={styles.loginBtn} />
        
                <p className={styles.p_text}> Already have an account?
                    {' '} <span><Link href="/auth/login" as="/login"><a className={styles.span_text}>Login</a></Link></span>
                </p>
        
    
            </form>
      </div>
    
    </Layout>
  )
}


