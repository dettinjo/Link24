import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import Heading from '../components/Heading'
import Imprint from '../components/Imprint'
import LinkButton from '../components/LinkButton'
import LinkHistory from '../components/LinkHistory'
import PageHead from '../components/PageHead'
import TextInput from '../components/TextInput'

interface linkHistoryObject {
  links: [linkObject]
}

interface linkObject {
  _id: string;
  original: string;
  slug: string;
  clicks: number;
  expiresAt: string;
}

const Home: NextPage = () => {

  const [linkInputValue, setLinkInputValue] = useState("")
  const [generateNewButtonText, setGenerateNewButtonText] = useState("Generate")
  const [textReadonly, setTextReadonly] = useState(false)
  const [statusMessage, setStatusMessage] = useState("")
  const [showNewLinkButton, setShowNewLinkButton] = useState(false)
  const SERVER_URL = "localhost:3000"
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false)
  const [customSlug, setCustomSlug] = useState("")
  const [useCustomSlug, setUseCustomSlug] = useState(false)
  const [expiryDays, setExiryDays] = useState("")
  const [useExpiryDays, setUseExiryDays] = useState(false)
  const router = useRouter()
  const [linkHistoryObject, setLinkHistoryObject] = useState<linkHistoryObject>({ links: [{ _id: "", original: "", slug: "", clicks: 0, expiresAt: "" }] })
  const createlinkform = useRef<HTMLFormElement>(null)



  useEffect(() => {
    setLinkInputValue("")
    getLinkHistory()
    verifyLogin()
  }, [])

  const buildQuery = () => {
    if (useCustomSlug && useExpiryDays) {
      return {
        url: linkInputValue,
        slug: customSlug,
        expireDays: expiryDays
      }
    } else if (useCustomSlug) {
      return {
        url: linkInputValue,
        slug: customSlug
      }
    } else if (useExpiryDays) {
      return {
        url: linkInputValue,
        expireDays: expiryDays
      }
    } else {
      return {
        url: linkInputValue
      }
    }
  }



  const createLink = async () => {

    fetch("http://localhost:8080/links", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: linkInputValue,
      })
    }).then(res => {
      return res.json()
    }).then(data => {
      setLinkInputValue(`${SERVER_URL + "/" + data?.slug}`)
      setTextReadonly(true)
      setShowNewLinkButton(true)
      setGenerateNewButtonText("Copy")
    }).catch(error => {
      setLinkInputValue("SERVER ERROR")
    })
  }

  const deleteLink = async (id: string) => {

    const token = localStorage.getItem("jwt")

    fetch("http://localhost:8080/links", {
      method: 'DELETE',
      headers: {
        'token': token ?? "",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id,
      })
    }).then(res => {
      res.ok ? getLinkHistory() : setStatusMessage("Deleting link failed")
    }).catch(error => {
      setStatusMessage("Deleting link failed")
    })
  }

  const updateLink = async (id: string, url: string) => {

    const token = localStorage.getItem("jwt")

    fetch("http://localhost:8080/links", {
      method: 'PATCH',
      headers: {
        'token': token ?? "",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id,
        url: url
      })
    }).then(res => {
      console.log(res)
      console.log("obj", linkHistoryObject)
      res.ok ? getLinkHistory() : setStatusMessage("Updating link failed")
    }).catch(error => {
      setStatusMessage("Updating link failed")
    })
  }

  const createLinkExtendet = () => {

    const token = localStorage.getItem("jwt")

    fetch("http://localhost:8080/links", {
      method: 'POST',
      headers: {
        'token': token ?? "",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(buildQuery())
    }).then(res => {
      return res.json()
    }).then(data => {
      console.log("result", data)
      setLinkInputValue(`${SERVER_URL + "/" + data?.slug}`)
      setTextReadonly(true)
      setShowNewLinkButton(true)
      setGenerateNewButtonText("Copy")
      getLinkHistory()
    }).catch(error => {
      setLinkInputValue("Server Error")
    })
  }

  const getLinkHistory = async () => {

    const token = localStorage.getItem("jwt")

    fetch("http://localhost:8080/links", {
      method: 'GET',
      headers: {
        'token': token ?? "",
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.ok) return res.json()
    }).then(data => {
      if (data) setLinkHistoryObject(data)
    }).catch(error => console.log("could not fetch link history"));
  }

  const verifyLogin = async () => {

    const token = localStorage.getItem("jwt")

    fetch("http://localhost:8080/auth/check", {
      method: 'GET',
      headers: {
        'token': token ?? "",
        'Content-Type': 'application/json'
      }
    }).then(res => {
      res.ok && setUserIsLoggedIn(true)
    }).catch(error => setUserIsLoggedIn(false));
  }

  const copyLink = () => {
    setStatusMessage("Copied to clipboard")
    navigator.clipboard.writeText(linkInputValue)
  }

  const newLink = () => {
    setLinkInputValue("")
    setTextReadonly(false)
    setShowNewLinkButton(false)
    setGenerateNewButtonText("Generate")
    setStatusMessage("")
    setUseCustomSlug(false)
    setUseExiryDays(false)
    setCustomSlug("")
    setExiryDays("")
  }

  const logUserOut = () => {
    console.log("logged out")
    localStorage.removeItem("jwt")
    setUserIsLoggedIn(false)
  }

  const validateInput = () => {
    return (
      linkInputValue.length > 0 &&
      createlinkform?.current?.checkValidity()
    )
  }

  const handleGenerateOrCopy = () => {
    if (generateNewButtonText === "Generate") {
      if (validateInput()) {
        setStatusMessage("")
        userIsLoggedIn ? createLinkExtendet() : createLink()
        setUseCustomSlug(false)
        setUseExiryDays(false)
      } else {
        setStatusMessage("Invalid input, please try again")
      }
    } else {
      copyLink()
    }
  }

  // useEffect(() => {
  //   console.log(linkHistoryObject)
  // }, [linkHistoryObject])


  return (
    <div className='bg-[#F3F3F3] w-screen h-screen flex flex-col items-center absolute px-1'>
      <PageHead logUserOut={logUserOut} isLoggedIn={userIsLoggedIn} />
      <Heading />
      <form ref={createlinkform} className='bg-white drop-shadow-sm rounded-2xl h-fit w-11/12 lg:w-7/12 py-8 text-center inline'>
        <TextInput onChange={setLinkInputValue} pattern="((http)?(https)?(ftp)?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/=]*)" title='Enter a valid URL' reportValidity readonly={textReadonly} value={linkInputValue} placeholder='Paste URL here' />
        <LinkButton onClick={handleGenerateOrCopy} title={generateNewButtonText} isButton />
        {showNewLinkButton && <LinkButton onClick={newLink} title="New link" isButton />}
        {userIsLoggedIn && generateNewButtonText === "Generate" &&
          <div className=' flex justify-center gap-2'>
            <LinkButton onClick={() => { setUseCustomSlug(!useCustomSlug) }} title={`${useCustomSlug ? "Remonve" : "Add"} custom slug`} isButton />
            <LinkButton onClick={() => { setUseExiryDays(!useExpiryDays) }} title={`${useExpiryDays ? "Remonve" : "Add"} expiry date`} isButton />
          </div>
        }
        {statusMessage.length > 0 && <p className='mt-4 text-gray-700'>{statusMessage}</p>}
        {useCustomSlug && <TextInput readonly={textReadonly} reportValidity pattern='^[A-Za-z0-9]{6,64}$' title='Enter only characters and numbers with a length of 6 - 64 digits' onChange={setCustomSlug} placeholder="Paste custom slug here" value={customSlug} />}
        {useExpiryDays && <TextInput readonly={textReadonly} pattern="([1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9])" title='Enter a number between 1 and 9999' reportValidity onChange={setExiryDays} placeholder="Expires in ... days" value={expiryDays} />}
      </form>
      {userIsLoggedIn && <LinkHistory deleteLink={deleteLink} updateLink={updateLink} linkHistoryArray={linkHistoryObject.links} />}
      <Imprint />
    </div>
  )
}

export default Home
