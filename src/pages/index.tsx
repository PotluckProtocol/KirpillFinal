import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

const Home = () => {
  return (
    <>
      <div className="home-container">
        <Head>
          <title>KirpillVsFood</title>
        </Head>
        <div className="home-group1">
          <div className="home-frame2">
            <img
              alt="Background12"
              sizes="(min-width: 992px) 1200px, (min-width: 768px) 800px, 480px"
              src="/external/background12-0tj-2000w.webp"
              srcSet="external//background12-0tj-2000w.webp 1200w, external/background12-0tj-tablet.webp 800w, external/background12-0tj-mobile.webp 480w"
              className="home-background"
            />
            <img
              alt="image"
              src="/external/titlemobile-400w.webp"
              className="home-image"
            />
            <Link href='/'>
            <img
              alt="Title23"
              src="/external/title23-yx25-300h.webp"
              className="home-title"
            />
            </Link>
             <Link href="/mint">
            <img
              alt="Mint24"
              src="/external/mint24-hay-200h.webp"
              className="home-mint"
            />
            </Link>
            <Link href="/game">
            <img
              alt="Play25"
              src="/external/play25-zqh-200h.webp"
              className="home-play"
            />
            </Link>
            <Link href="https://solidly.com/swap/?inputCurrency=FTM&outputCurrency=0x92b598deBd3f4c9d99C40c5542E1F4450841fCf2">
            <img
              alt="Buy27"
              src="/external/buy27-ge7p-200h.webp"
              className="home-buy"
            />
            </Link>
            <Link
              href="https://t.me/Chill_Pill_Fi_Group"
              target="_blank"
              rel="noreferrer noopener"
              className="home-link"
            >
              <img
                alt="Telegram212"
                src="/external/telegram212-vda9-200w.webp"
                className="home-telegram"
              />
            </Link>
            <Link
              href="https://twitter.com/chillpillfi"
              target="_blank"
              rel="noreferrer noopener"
              className="home-link1"
            >
              <img
                alt="Twitter213"
                src="/external/twitter213-c3g-200h.webp"
                className="home-twitter"
              />
            </Link>
            <Link
              href="https://medium.com/@chillpillfi/chill-gamefi-adventure-part-3-33e2e5d9050a"
              target="_blank"
              rel="noreferrer noopener"
              className="home-link2"
            >
              <img
                alt="Docs214"
                src="/external/docs214-7a6g-200w.webp"
                className="home-docs"
              />
            </Link>
            <Link href="https://solidly.com/swap/?inputCurrency=FTM&outputCurrency=0x92b598deBd3f4c9d99C40c5542E1F4450841fCf2">
            <img
              alt="DexScreener215"
              src="/external/dexscreener215-mg4b-200h.webp"
              className="home-dex-screener"
            />
            <img
              alt="ChillFlag218"
              sizes="(min-width: 768px) 800px, 480px"
              src="/external/chillflag218-4lb5-600h.webp"
              srcSet="external//chillflag218-4lb5-600h.webp 800w, external/chillflag218-4lb5-mobile.webp 480w"
              className="home-chill-flag"
            />
            <img
              sizes="(min-width: 768px) 800px, 480px"
              src="/kirpill_with_chill_flag-600h.webp"
              srcSet="/kirpill_with_chill_flag-600h.webp 800w, /kirpill_with_chill_flag-mobile.webp 480w"
              className="home-blue-kirby"
            />
            </Link>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .home-container {
            width: 100%;
            display: flex;
            overflow: hidden;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
          .home-group1 {
            width: 1920px;
            height: 1080px;
            display: flex;
            z-index: 100;
            position: relative;
            box-shadow: 5px 5px 10px 0px #d4d4d4;
            align-items: flex-start;
            flex-shrink: 1;
            border-color: var(--dl-color-gray-black);
            border-width: 1px;
            border-radius: var(--dl-radius-radius-radius4);
          }
          .home-frame2 {
            top: 0px;
            left: 0px;
            width: 1920px;
            height: 1080px;
            display: flex;
            overflow: hidden;
            position: absolute;
            align-items: center;
            flex-shrink: 0;
            border-color: rgba(0, 0, 0, 0.10000000149011612);
            border-style: solid;
            border-width: 1px;
            border-radius: 2px;
            justify-content: center;
            background-color: rgba(255, 255, 255, 1);
          }
          .home-background {
            top: 0.375px;
            left: -10px;
            width: 1920px;
            height: 1080px;
            position: absolute;
          }
          .home-image {
            width: 200px;
            object-fit: cover;
          }
          .home-title {
            top: 31.375px;
            left: 384px;
            width: 1012px;
            height: 231px;
            position: absolute;
          }
          .home-mint {
            top: 512.375px;
            left: 719px;
            width: 471px;
            height: 118px;
            position: absolute;
          }
          .home-play {
            top: 341.375px;
            left: 719px;
            width: 471px;
            height: 116px;
            position: absolute;
          }
          .home-buy {
            left: 719px;
            width: 471px;
            bottom: 278px;
            height: 117px;
            position: absolute;
          }
          .home-link {
            display: contents;
          }
          .home-telegram {
            left: 768px;
            width: 74px;
            bottom: 148px;
            height: 75px;
            position: absolute;
            text-decoration: none;
          }
          .home-link1 {
            display: contents;
          }
          .home-twitter {
            left: 875px;
            width: 75px;
            bottom: 148px;
            height: 75px;
            position: absolute;
            text-decoration: none;
          }
          .home-link2 {
            display: contents;
          }
          .home-docs {
            right: 755px;
            width: 74px;
            bottom: 148px;
            height: 75px;
            position: absolute;
            text-decoration: none;
          }
          .home-dex-screener {
            right: 862px;
            width: 75px;
            bottom: 148px;
            height: 75px;
            position: absolute;
          }
          .home-chill-flag {
            top: 647.2213745117188px;
            left: -124px;
            width: 583px;
            height: 516px;
            display: none;
            position: absolute;
          }
          .home-blue-kirby {
            left: 27px;
            width: 552px;
            bottom: 218px;
            height: 545px;
            position: absolute;
            object-fit: cover;
            object-position: center;
          }
          @media (max-width: 1600px) {
            .home-title {
              top: 28px;
              left: 454px;
            }
            .home-telegram {
              top: 842px;
              left: 819px;
            }
            .home-twitter {
              top: 842px;
              left: 894px;
            }
            .home-docs {
              top: 842px;
              left: 1042px;
            }
            .home-dex-screener {
              top: 842px;
              left: 969px;
            }
            .home-chill-flag {
              top: 600px;
              left: 97px;
              bottom: -16px;
            }
            .home-blue-kirby {
              left: 134px;
              bottom: 213px;
              position: absolute;
            }
          }
          @media (max-width: 1200px) {
            .home-title {
              top: 44px;
              left: 444px;
            }
            .home-telegram {
              top: 826px;
              left: 819px;
            }
            .home-twitter {
              top: 826px;
              left: 894px;
            }
            .home-docs {
              top: 826px;
              left: 1039px;
            }
            .home-dex-screener {
              top: 826px;
              left: 964px;
            }
            .home-chill-flag {
              top: 650px;
              left: 272px;
              width: 500px;
              bottom: -49px;
              height: 500px;
            }
            .home-blue-kirby {
              left: 334px;
              width: 410px;
              bottom: 297px;
              height: 410px;
            }
          }
          @media (max-width: 991px) {
            .home-title {
              top: 82px;
              left: 465px;
              width: 991px;
            }
            .home-telegram {
              left: 856px;
              width: var(--dl-size-size-small);
              bottom: 191px;
              height: var(--dl-size-size-small);
            }
            .home-twitter {
              left: 906px;
              width: var(--dl-size-size-small);
              bottom: 191px;
              height: var(--dl-size-size-small);
            }
            .home-docs {
              left: 1006px;
              width: var(--dl-size-size-small);
              bottom: 191px;
              height: var(--dl-size-size-small);
            }
            .home-dex-screener {
              left: 956px;
              width: var(--dl-size-size-small);
              bottom: 191px;
              height: var(--dl-size-size-small);
            }
            .home-chill-flag {
              top: 880px;
              left: 545px;
              width: var(--dl-size-size-large);
              height: var(--dl-size-size-large);
            }
            .home-blue-kirby {
              top: 428px;
              left: 400px;
              width: 373px;
              height: 293px;
            }
          }
          @media (max-width: 767px) {
            .home-title {
              top: 35px;
              left: 573px;
              width: 766px;
            }
            .home-telegram {
              left: 832px;
              bottom: 31px;
            }
            .home-twitter {
              left: 911px;
              bottom: 31px;
            }
            .home-docs {
              left: 981px;
              bottom: 31px;
            }
            .home-dex-screener {
              left: 1056px;
              bottom: 31px;
            }
            .home-blue-kirby {
              top: 700px;
              left: 550px;
              width: 10%;
              bottom: 125px;
              height: 196px;
            }
          }
          @media (max-width: 479px) {
            .home-image {
              top: 96px;
              left: 783px;
              width: 339px;
              height: 191px;
              position: absolute;
            }
            .home-title {
              top: 141px;
              flex: 1;
              left: 740px;
              width: 410px;
              height: 161px;
              display: none;
            }
            .home-mint {
              top: 433px;
              left: 762px;
              width: 375px;
              height: 100px;
            }
            .home-play {
              top: 300px;
              left: 762px;
              width: 375px;
              height: 100px;
            }
            .home-buy {
              top: 561px;
              left: 762px;
              width: 375px;
              height: 100px;
            }
            .home-telegram {
              top: 673px;
              left: 855px;
            }
            .home-twitter {
              top: 673px;
              left: 906px;
              bottom: 196px;
            }
            .home-docs {
              top: 673px;
              left: 956px;
              bottom: 196px;
            }
            .home-dex-screener {
              top: 673px;
              left: 1006px;
              bottom: 196px;
            }
          }
        `}
      </style>
    </>
  )
}

export default Home
