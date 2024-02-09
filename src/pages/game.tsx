'use client';
import home from '../../assets/png/home.png';
import title from '../../assets/png/title.png';
import Image from 'next/image';
import FridgeSection from '../components/FridgeSection.component';
import Link from 'next/link';
import styles from '../styles/staking.module.css';

const Home = () => {
  const handleClick = () => {
    console.log('click');
  };

  return (
    <div>
      <button className={styles["home-button"]}>
        <Link href="/">
          <Image src={home} height={70} priority alt={'home'} />
        </Link>
      </button>

      <div className="title">
        <Image src={title} priority width={800} alt={''} />
      </div>

      <div className={styles["wrapper"]}>
        <FridgeSection />
      </div>
    </div>
  );
};

export default Home;
