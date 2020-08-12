import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
// import Swal from 'sweetalert2'
// import withReactContent from 'sweetalert2-react-content'

import { Spinner } from 'reactstrap';


import styles from '../../styles/Club.module.css';
import Layout from '../../components/layout';
import ClubType from '../../components/clubType';
import  {isEmpty} from '../../lib/utilities';
import {storageGet} from '../../lib/storage';
import region from '../../country.json';




export default function Club() {
  const router = useRouter();
//   const MySwal = withReactContent(Swal)

  const hiddenColorInput = React.useRef(null);
  const logoInput = React.useRef(null);
  
  const [ isLoading, setLoading ] = useState(true);
  const [validationErrors, setValidationErrors] = useState({});
  const [showCreateClub, setShowCreateClub] = useState(false);
  const [userClub, setUserClub] = useState('');


  const [logoImg, setLogoImg] = useState('');
  const [clubName, setClubName] = useState('');
  const [leagueName, setLeagueName] = useState('fc');
  const [clubSlogan, setClubSlogan] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [country, setCountry] = useState('');
  const [userState, setUserState] = useState('');
  const [color, setColor] = useState('');
  const [countryStates, setCountryStates] = useState([]);


  const onCreateAmateurClubHandler = () => {
    setUserClub('amateur');
    setShowCreateClub(true);
  }
  const onInputChangeHandler = (event) => {
    event.persist();
    let inputName = event.target.name;
    let inputText = event.target.value;

    if (inputName === 'clubName') setClubName(inputText);
    if (inputName === 'clubAddress') setClubAdress(inputText);
    if (inputName === 'leagueName') setLeagueName(inputText);
    if (inputName === 'clubSlogan') setClubSlogan(inputText);
    if (inputName === 'phoneNo') setPhoneNo(inputText);
    if (inputName === 'color') setColor(inputText);

    if (inputName == 'user_country') {
      setCountry(inputText);

      if (inputText == "default") return setCountryStates([]);

      region.map((data) => {
        if (data.name == inputText) {
          let value = data.name;
          let optionalvalue = [{
            name: value
          }]
          if (data.states.length == 0) return setCountryStates(optionalvalue)
          else return setCountryStates(data.states);
        }
      })
    }
  }


  const getBase64 = (file, cb) => {
     let reader = new FileReader();
     reader.readAsDataURL(file);
     reader.onload = function () {
      
        cb(reader.result)
     };
     reader.onerror = function (error) {
        console.log('Error: ', error);
     };
  }

  const handleLogoChange = event => {
    const fileUploaded = event.target.files[0];
    if (fileUploaded) {
      getBase64(fileUploaded, (result) => {
         setLogoImg(result);
      });  
    }


  };

  const submitFormHandler = (e) => {
        e.preventDefault();

        let clubLogo = logoInput.current.files[0];
        const data = {
            clubName, leagueName, clubSlogan, color, clubLogo, phoneNo, country, userState
        }
        let checkErrors = validate(data);
        let location = `${userState} ${country}`;

        const postData = {
            clubName, color, leagueName, clubSlogan, logo: clubLogo, location, phoneNo
        }
        
        if (isEmpty(checkErrors)){
            console.log(postData);
            
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
                    title: <h5>Your have successfully created your club</h5>,
                    showConfirmButton: false,
                    timer: 1500
                })
                .then((result) => router.push('/auth/club', '/club'))
                
            }else{
                MySwal.fire({
                    position: 'center',
                    icon: 'error',
                    title: <h5>Unable to create club, try again</h5>,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
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

      const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];

      let logoExtension = values.clubLogo.name.split('.').pop().toLowerCase();      
        
      if (!values.clubLogo.name) {
         errors.clubLogo = 'Required';
      } else if (!imageExtensions.includes(logoExtension)) {
         errors.clubLogo = 'Invalid image format (jpeg,jpg,png,gif) are expected';
      } else if (values.clubLogo.size > 13631488) {
         errors.clubLogo = 'Logo size exceeded 13MB';
      }

      if (!values.clubName) {
         errors.clubName = 'Required';
      } 
      if (!values.leagueName) {
         errors.leagueName = 'Required';
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

      if (!values.clubSlogan) {
         errors.clubSlogan = 'Required';
      } 

      if (!values.phoneNo) {
         errors.phoneNo = 'Required';
      } else if (isNaN(values.phoneNo)) {
         errors.phoneNo = 'Phone number must be a number ';
      }

      if (!values.color) {
         errors.color = 'Club color is required';
      } 

        return errors;
  };
    

 
  
  return (
    <>

    {
      showCreateClub ? 
      ( 
        <Layout title="Create Club">

          <div className={styles.container}>
            <h2 className={styles.header_primary}>Create Club</h2>
            
            {/* {isLoading ? (
            <div className={styles.spinner_container}>
               <Spinner type="grow" className={styles.spinner} color="danger" />
            </div>
            ): null} */}


            <form className={styles.input_group} onSubmit={submitFormHandler}>

                <label htmlFor="logo" className={styles.header_secondary}>Club Logo</label>
                <input type="file" ref={logoInput} className={styles.d_none} onChange={handleLogoChange} />
                <div className={styles.logoContainer}>
                   {
                     !logoImg ? (
                        <div className={styles.addLogo} onClick={()=>logoInput.current.click()}>
                           <i className="fas fa-plus"></i>
                        </div>
                     ) : (
                        <div>
                           <div className={styles.logoImgContainer}>
                              <img className={styles.resImage} src={logoImg} />
                           </div>
                           <button type="button" className={styles.changeImgBtn} onClick={()=>logoInput.current.click()}>Change Logo</button>
                        </div>
                     )
                   }
                    {validationErrors.clubLogo ? (<div className={styles.errormsg}>{validationErrors.clubLogo}</div>) : null }
                    <div>
                        <h5 className={styles.header_tertiary}>Club Logo must have these attributes:</h5>
                        <ul className={styles.addLogo_ul}>
                           <li className={styles.addLogo_ul_li}>Less than 13MB in size</li>
                           <li className={styles.addLogo_ul_li}>File type must be PNG or JPEG</li>
                           <li className={styles.addLogo_ul_li}>File must NOT have a transparent background</li>
                        </ul>
                    </div>

                </div>
            
                <div className={styles.formContainer}>

                    <div className={styles.input_group}>
                        <label className={styles.header_secondary} htmlFor="clubName">Club Name</label>
                        <div className={styles.form_group}>
                          <div>
                              <input type="text" className={styles.input} id="clubName" name="clubName" value={clubName} onChange={onInputChangeHandler} />
                              {validationErrors.clubName ? (<div className={styles.errormsg}>{validationErrors.clubName}</div>) : null }

                          </div>
                          <div>
                              <select id="leagueName" className={styles.input} name="leagueName" value={leagueName} onChange={onInputChangeHandler}>
                                 <option value="fc">FC</option>
                              </select>
                              {validationErrors.leagueName ? (<div className={styles.errormsg}>{validationErrors.leagueName}</div>) : null }
                          </div>
                        </div>
                    </div>

                    <label className={styles.header_secondary} htmlFor="clubAddress">Club Address</label>
                    <div className={styles.form_group}>
                      <div>
                          <select value={country} name="user_country" className={styles.input} onChange={onInputChangeHandler}>
                              <option value="default" selected={true} >Country</option>
                              {region.map((data)=>(
                                  <option value={data.name} key={data.name}>{data.name}</option>
                              ))}
                          </select>
                          {validationErrors.country ? (<div className={styles.errormsg}>{validationErrors.country}</div>) : null }
                      </div>

                      <div>
                          <select value={userState} name="user_state" className={styles.input} onChange={onInputChangeHandler}>
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
                        <label className={styles.header_secondary} htmlFor="clubSlogan">Club Slogan</label>
                        <input type="text" className={styles.input} id="clubSlogan" name="clubSlogan" value={clubSlogan} onChange={onInputChangeHandler} />
                        {validationErrors.clubSlogan ? (<div className={styles.errormsg}>{validationErrors.clubSlogan}</div>) : null }
                    </div>

                    <div className={styles.input_group}>
                        <label className={styles.header_secondary} htmlFor="phoneNo">Phone Number</label>
                        <input type="number" className={styles.input} id="phoneNo" name="phoneNo" value={phoneNo} onChange={onInputChangeHandler} />
                        {validationErrors.phoneNo ? (<div className={styles.errormsg}>{validationErrors.phoneNo}</div>) : null }
                    </div>


                    <div className={styles.input_group}>
                     <label className={styles.header_secondary} htmlFor="phoneNo">Club color</label>
                     <input type="color" ref={hiddenColorInput} className={styles.d_none} id="color" name="color" value={color} onChange={onInputChangeHandler} />
                     <div className={styles.color_group}>
                        <div>
                           <img className={styles.resImage} src="/assets/images/colorpicker.gif"  onClick={()=>hiddenColorInput.current.click()} /> 
                        </div>
                        
                        <div>
                           <div className="selectedColor"></div>
                           {color ? <p className={styles.selectedColor_p}>Selected color: <b>{color}</b></p> : null}
                        </div>
                     </div>
                     {validationErrors.color ? (<div className={styles.errormsg}>{validationErrors.color}</div>) : null }

                    </div>


                    <button className={styles.loginBtn} type="submit">Create club</button>

                

                </div>



            </form>

            <style jsx>{`
             
               .selectedColor {
                  background: ${color};
                  height: 2rem;
                  width: 2rem;
                  border-radius: 50% ;
                  }
               }
              
               `}</style>
              
          </div>
              
        </Layout>
      ) 
      : <ClubType changeClubType={onCreateAmateurClubHandler} />
    }

    </>
    
  
  )
}