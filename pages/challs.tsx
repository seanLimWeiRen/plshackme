import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/home.module.scss';
import { getAllChallenges, getCategories } from '@/server/challenges';

export default function Home(challenges: any) {
  console.log(challenges)
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
            <Link href="/login">login</Link>
            </div>
          <div className="w3-display-right w3-padding">
            <Link href="/register">register</Link>
            </div>
          <div className="w3-display-middle w3-padding">
            <strong>1337CTF</strong>
          </div>
        </div>
    </div>
    <br/>
    
  </>
  );
}

export async function getStaticProps() {
    const challenges = await getAllChallenges()
    const categories = await getCategories()

    return{
      props: {
        challs: challenges,
        cats: categories,
      }
    }
}