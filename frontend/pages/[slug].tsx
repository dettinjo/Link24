import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Imprint from '../components/Imprint'
import Spinner from '../components/Spinner'


const Slug: NextPage = () => {

  const [resolvedLink, setResolvedLink] = useState("")
  const router = useRouter()
  const slug = router.query.slug
  const [isLoading, setIsLoading] = useState(true)
  const [statusMessage, setStatusMessage] = useState("")


  useEffect(() => {
    resolvedLink.length > 0 &&
      (
        setStatusMessage(`redirecting to: ${resolvedLink.length > 24 ? resolvedLink.substring(0, 24) + "..." : resolvedLink}`),
        setTimeout(() => {
          window.location.replace((resolvedLink.indexOf("http://") == 0 || resolvedLink.indexOf("https://") == 0) ? resolvedLink : "//" + resolvedLink)
        }, 2000)
      )
  }, [resolvedLink])

  const getData = async () => {
    fetch(`http://localhost:8080/links/${slug}`
      , {
        method: 'GET',
      }).then((res) => {
        if (res.ok) {
          return res.json()
        } else if (res.status === 404) {
          setStatusMessage("Invalid link")
          return
        } else {
          setStatusMessage("Internal error")
          return
        }
      }).then((data) => {
        setIsLoading(false)
        data && setResolvedLink(data.url)
      }).catch((error) => {
        setStatusMessage("Internal error")
      })
  }

  useEffect(() => {
    getData()
  }, [router.isReady])

  return (
    <div  className='bg-[#F3F3F3] w-screen h-screen flex flex-col items-center justify-center'>
      <Head>
        <title>Link24</title>
        <meta name='link24' content='link shortener' />
      </Head>

      <p className='m-12 font-semibold text-blue-700 text-lg'>Link24</p>
      {isLoading ? "loading..." : statusMessage}
      <Spinner/>

      <Imprint/>
      
      
    </div>
  )
}

export default Slug
