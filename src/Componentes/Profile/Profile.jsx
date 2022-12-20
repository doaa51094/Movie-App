import React from 'react'
import styles from './Profile.module.css'

export default function Profile({userData}) {
    let {first_name,last_name,age,email}=userData;
  return (
    <>
    <section className={`${styles.home}`}>
    <div className="container h-100 d-flex justify-content-center align-items-center">
        <div className={`${styles.item} p-5`}>
        <h3>First Name : <span className={`${styles.spanColor}`}>{first_name}</span></h3>
        <h3>Last Name : <span className={`${styles.spanColor}`}>{last_name}</span></h3>
        <h3>Age : <span className={`${styles.spanColor}`}>{age}</span></h3>
        <h3>Email : <span className={`${styles.spanColor}`}>{email}</span></h3>
        </div>
        </div>
    </section>
    
    
    
    
    </>
  )
}
