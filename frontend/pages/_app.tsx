import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import Head from 'next/head'



function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Link24</title>
        <link rel="shortcut icon" href="static/favicon.svg" />
        <meta name='link24' content='link shortener' />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
