import {useState} from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router'

import axios from 'axios';

import styles from '../../styles/Signup.module.css';
import Layout from '../../components/layout';
import  {storageSave} from '../../lib/storage';
import  {isEmpty} from '../../lib/utilities';
import region from '../../country.json';



const fetchData = async () => await axios.get('https://restcountries.eu/rest/v2/all')
    .then(res => {
        // console.log(res);
        return ({
            error: false,
            users: res.data,
        })
    })
    .catch(() => ({
        error: true,
        users: null,
    }), );


export default function Signup({region}) {
    const router = useRouter();

    const [countryStates, setCountryStates] = useState([]);
    const [validationErrors, setValidationErrors] = useState({});
    const [showPassword, setShowPassword] = useState('password');
    const [eye, setEye] = useState('fa-eye');
    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [userState, setUserState] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');


    
    const handleInputChange = (event) => {
        event.persist();
        let inputName = event.target.name;
        let inputText = event.target.value;

        if (inputName === 'email') setEmail(inputText);
        if (inputName === 'password') setPassword(inputText);
        if (inputName === 'phoneNo') setPhoneNo(inputText);
        if (inputName === 'firstName') setFirstName(inputText);
        if (inputName === 'lastName') setLastName(inputText);
        if (inputName === 'gender') setGender(inputText);
        if (inputName === 'user_state') setUserState(inputText);

        if (inputName == 'user_country') {
            setCountry(inputText);

            if (inputText == "default") return setCountryStates([]);
           
            region.map((data) => {
                if (data.name == inputText) {
                    console.log(data.states);
                    let value = data.name;
                    let optionalvalue = [
                        {name: value}
                    ]
                    if (data.states.length == 0) return setCountryStates(optionalvalue)
                    else return setCountryStates(data.states);
                }
            })
        }
        
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
        const data = {
            firstName, lastName, phoneNo, email, country, userState, password, gender
        }
        let checkErrors = validate(data);
        
        if (isEmpty(checkErrors)){
            console.log(data);
            storageSave('userBioData', data);
            router.push('/auth/clubType', '/clubType');

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

        if (!values.gender) {
            errors.gender = 'Required';
        } 


        return errors;
    };
    
    
   
  return (
    <Layout title="Signup">

      <div className={styles.container}>
          
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
                    <input id="phoneNo" name="phoneNo" value={phoneNo} type="text" className={styles.input} placeholder="Phone Number" onChange={handleInputChange} />
                    {validationErrors.phoneNo ? (<div className={styles.errormsg}>{validationErrors.phoneNo}</div>) : null }
                </div>
                <div className={styles.input_group}>
                    <input id="email" name="email" value={email} type="text" className={styles.input} placeholder="Email Address" onChange={handleInputChange} />
                    {validationErrors.email ? (<div className={styles.errormsg}>{validationErrors.email}</div>) : null }
                </div>

                <div className={styles.input_group_join}>

                    <div>
                        <select value={country} name="user_country" className={styles.input} onChange={handleInputChange}>
                            <option value="default" selected={true} >Country of residence</option>
                            {region.map((data)=>(
                                <option value={data.name} key={data.name}>{data.name}</option>
                            ))}
                        </select>
                        {validationErrors.country ? (<div className={styles.errormsg}>{validationErrors.country}</div>) : null }
                    </div>

                    <div>
                        <select value={userState} name="user_state" className={styles.input} onChange={handleInputChange}>
                            <option value="default" selected={true}>Select a state</option>
                            {
                                countryStates.map((data) => {
                                    return <option value={data.name} key={data.name}>{data.name}</option>
                                })
                            }

                        </select>
                        {validationErrors.userState ? (<div className={styles.errormsg}>{validationErrors.userState}</div>) : null }
                        
                    </div>

                </div>
               
                <div className={styles.input_group}>
                    <input id="password" type={showPassword} value={password} name="password" className={styles.input} placeholder="Password" onChange={handleInputChange} />
                    <i className={`fas ${eye} ${styles.field_icon}`} onClick={showPasswordHandler}></i>
                    {validationErrors.password ? (<div className={styles.errormsg}>{validationErrors.password}</div>) : null }
                </div>

                <div className={styles.input_group_join}>
        
                <div>
                    <label htmlFor="male" className={styles.radio_input_label}>
                        <input id="male" type="radio" value="Male" name="gender" className={styles.radio_input}  onChange={handleInputChange} /> 
                        Male
                    </label>
                </div>
                
                <div>
                    <label htmlFor="female" className={styles.radio_input_label}>
                        <input id="female" type="radio" value="Female" name="gender" className={styles.radio_input}  onChange={handleInputChange} />
                        Female
                    </label>
                </div>
                    {validationErrors.gender ? (<div className={styles.errormsg}>{validationErrors.gender}</div>) : null }

                </div>
        
                <input type="submit" value="Continue" className={styles.loginBtn} />
        
                <p className={styles.p_text}> Already have an account?
                    {' '} <span><Link href="/auth/signup" as="/sign-up"><a className={styles.span_text}>Login</a></Link></span>
                </p>
        
    
            </form>
      </div>
    
    </Layout>
  )
}


export const getStaticProps = async () => {

    const res = await fetchData();
    // console.log(region);
    return {
        props: {region}
    };


}
