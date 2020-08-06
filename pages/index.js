import { useEffect, useState } from 'react';

import Head from 'next/head'

import styles from '../styles/Landing.module.css'
import Login from "./auth/login";
import Landing from "./root/landingPage";




import axios from 'axios';

const fetchData = async () => await axios.get('https://restcountries.eu/rest/v2/all')
  .then(res => {
    return ({
    error: false,
    users: res.data,
  })})
  .catch(() => ({
    error: true,
    users: null,
  }), );

export default function Home({res, region}) {
  const [ isLoading, setLoading ] = useState(true);

  useEffect(() => {

  }, []);

  
  return (
    <>
      <Login />
        
    </>
  )
}

export const getStaticProps = async () => {
  const res = await fetchData();
  return {
    props: {res}
  };


}