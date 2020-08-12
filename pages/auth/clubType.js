import React from 'react';

import styles from '../styles/ClubType.module.css';
import Layout from '../components/layout';



export default function ClubType(props) {  

  return (
    <Layout title="Club Type ">

      <div className={styles.container}>
        <h2 className={styles.header_primary}>Club Type</h2>
  
        <div className={styles.p_container}>
          <p className={styles.p_text}>
            Select your club type below. PRO clubs are able to compete in live leagues and earn real money
          </p>
        </div>
  
        <div className={styles.clubType_container}>

          <div className={styles.club_amateur} onClick={props.changeClubType}>

            <div className={styles.amateur_header}>
              <i className="fas fa-check-circle"></i>
            </div>

            <div className={styles.amateur_body}>

              <div className={styles.img_container}>
                <img className={styles.img} src="/assets/images/soccer.png" />
              </div> 

              <h2 className={styles.amateur_h2}>Amateur club</h2>

              <div className={styles.p_container}>
                <ul className={styles.amateur_ul}>
                  <li className={styles.amateur_li}> Buy/sell players </li>
                  <li className={styles.amateur_li}> Play against friends </li>
                  <li className={styles.amateur_li}> Become a fan </li>
                </ul>
              </div>

            </div>
          </div>

          <div>
            <div className={styles.club_pro}>

              <div className={styles.amateur_body}>

                <div className={styles.img_container}>
                  <img className={styles.img} src="/assets/images/soccer.png" />
                </div> 

                <h2 className={styles.pro_h2}>PRO club</h2>

                <div className={styles.p_container}>
                  <ul className={styles.amateur_ul}>
                    <li className={styles.amateur_li}> Win Trophies </li>
                    <li className={styles.amateur_li}> Earn real money </li>
                    <li className={styles.amateur_li}> Earn fans </li>
                  </ul>
                </div>

              </div>
            </div>
            <p className={styles.p_text_quote}><q>You need to win ten (10) matches in Amateur mode to upgrade to a PRO club</q></p>
          </div>
          

        </div>
      </div>
    
    </Layout>

  )

}