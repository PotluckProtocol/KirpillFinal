import Link from 'next/link';
import styles from '../styles/home.module.css'; // Ensure the path is correct

export default function Home() {
  return (
    <>
      <div className={styles.homecontainer}>
        {' '}
        {/* Use styles object */}
        <div className={styles.homegroup1}>
          <div className={styles.homeframe2}>
            <img
              alt="Background12"
              sizes="(min-width: 992px) 1200px, (min-width: 768px) 800px, 480px"
              src="/external/background12-0tj-2000w.webp"
              srcSet="external//background12-0tj-2000w.webp 1200w, external/background12-0tj-tablet.webp 800w, external/background12-0tj-mobile.webp 480w"
              className={styles.homebackground}
            />
            <img
              alt="Title23"
              src="/external/title23-yx25-300h.webp"
              className={styles.hometitle}
            />
            <Link className={styles.homenavlink} href="/mint">
              <img
                alt="Mint24"
                src="/external/mint24-hay-200h.webp"
                className={styles.homemint}
              />
            </Link>
            <Link className={styles.homenavlink} href="/game">
              <img
                alt="Play25"
                src="/external/play25-zqh-200h.webp"
                className={styles.homeplay}
              />
            </Link>
            <Link href="https://solidly.com/swap/">
              <img
                alt="Buy27"
                src="/external/buy27-ge7p-200h.webp"
                className={styles.homebuy}
              />
            </Link>
            <a
              href="https://t.me/Chill_Pill_Fi_Group"
              target="_blank"
              rel="noreferrer noopener"
              className={styles.homelink}
            >
              <img
                alt="Telegram212"
                src="/external/telegram212-vda9-200w.webp"
                className={styles.hometelegram}
              />
            </a>
            <a
              href="https://twitter.com/chillpillfi"
              target="_blank"
              rel="noreferrer noopener"
              className={styles.homelink1}
            >
              <img
                alt="Twitter213"
                src="/external/twitter213-c3g-200h.webp"
                className={styles.hometwitter}
              />
            </a>
            <img
              alt="Docs214"
              src="/external/docs214-7a6g-200w.webp"
              className={styles.homedocs}
            />
            <img
              alt="DexScreener215"
              src="/external/dexscreener215-mg4b-200h.webp"
              className={styles.homedexscreener}
            />
            <img
              alt="ChillFlag218"
              sizes="(min-width: 768px) 800px, 480px"
              src="/external/chillflag218-4lb5-600h.webp"
              srcSet="external//chillflag218-4lb5-600h.webp 800w, external/chillflag218-4lb5-mobile.webp 480w"
              className={styles.homechillflag}
            />
            <img
              sizes="(min-width: 768px) 800px, 480px"
              src="/kirpill_with_chill_flag-600h.webp"
              srcSet="/kirpill_with_chill_flag-600h.webp 800w, /kirpill_with_chill_flag-mobile.webp 480w"
              className={styles.homebluekirby}
            />
          </div>
        </div>
      </div>
    </>
  );
}
