import Head from 'next/head'
import { APP_NAME } from '../lib/constants'

export default function Meta() {
  return (
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/assets/images/logo.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/assets/images/logo.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/assets/images/logo.png"
      />
      {/* <link rel="manifest" href="/favicon/site.webmanifest" /> */}
      <link
        rel="mask-icon"
        href="/assets/images/logo.png"
        color="#000000"
      />
      <link rel="shortcut icon" href="/assets/images/logo.png" />
      {/* <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" /> */}
      <meta name="theme-color" content="#0c9a66" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <meta
        name="description"
        content={`${APP_NAME} is an online football or soccer game.`}
      />
    </Head>
  )
}