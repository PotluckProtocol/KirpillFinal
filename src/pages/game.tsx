'use client';
import home from '../../assets/png/home.png';
import title from '../../assets/png/title.png';
import Image from 'next/image';
import FridgeSection from '../components/FridgeSection.component';
import Link from 'next/link';
import styles from '../styles/staking.module.css';
import Head from 'next/head';

const Home = () => {
  return (
    <div>
      <Head>
        <title>KirpillVsFood - Game</title>
      </Head>
      <button className={styles['home-button']}>
        <Link href="/">
          <Image src={home} height={70} priority alt={'home'} />
        </Link>
      </button>

      <div className="title">
        <Link href="/">
          <Image src={title} priority width={800} alt={''} />
        </Link>
      </div>

      <div className={styles['wrapper']}>
        <FridgeSection />
      </div>
    </div>
  );
};

export default Home;
