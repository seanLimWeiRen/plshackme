import React from 'react';
import Head from 'next/head';
import Image from 'next/image'
import styles from '../styles/home.module.scss';
export default function Home() {
  return (
  <>
    <Head>
      <title>1337CTF</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
    </Head>
    <br/>
    <div className="w3-container w3-bar">
        <div className="w3-display-container w3-green" id={styles.grad1} style={{ height: '30px' }}>
            <div className="w3-display-left w3-padding">
              <a href="/login">login</a>
              </div>
            <div className="w3-display-right w3-padding">
              <a href="/register">register</a>
              </div>
            <div className="w3-display-middle w3-padding">
              <strong>1337CTF</strong>
            </div>
        </div>
    </div>
    <br />
    <Image src="/Logo.png" alt="plshackme logo" width="400" height="400" className={styles.center} />
  </>
  );
}