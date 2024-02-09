'use client';
import home from '../../assets/png/home.png';
import title from '../../assets/png/title.png';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import MintComponent from '../components/Mint.component';
import Head from 'next/head';

const Minter = () => {
  return (
    <div>
      <Head>
        <title>KirpillVsFood - Mint</title>
      </Head>
      <button className="home-button">
        <Link href="/">
          <Image src={home} height={70} priority alt={'home'} />
        </Link>
      </button>

      <div className="wrapper">
        <div className="title">
          <Link href="/">
            <Image src={title} priority width={800} alt={''} />
          </Link>
        </div>

        <MintComponent />
      </div>
    </div>
  );
};

export default Minter;
