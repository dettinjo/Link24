import { useState, useRef } from 'react'
import Heading from '../components/Heading'
import TextInput from '../components/TextInput'
import Link from 'next/link'
import LinkButton from '../components/LinkButton'
import { useRouter } from 'next/router'
import Imprint from '../components/Imprint'



const Login = () => {

    const [emailInput, setEmailInput] = useState("")
    const [passwordInput, setPasswordInput] = useState("")
    const [statusMessage, setStatusMessage] = useState("")
    const loginform = useRef<HTMLFormElement>(null)
    const router = useRouter()



    const validateInput = () => {
        return (
            emailInput.length > 0 &&
            passwordInput.length > 0 &&
            loginform?.current?.checkValidity()
        )
    }

    const postData = async () => {
        fetch(`http://localhost:8080/auth/login`
            , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: emailInput,
                    password: passwordInput
                })
            }).then((res) => {
                if (res.ok) {
                    return res.json()
                } else if (res.status === 401) {
                    setStatusMessage("Email and/or password wrong, please try again")
                    return
                } else {
                    setStatusMessage("Internal error")
                    return
                }
            }).then((data) => {
                data && (
                    setStatusMessage("Succsessful login"),
                    console.log(data),
                    localStorage.setItem('jwt', data.token),
                    router.push("/")
                )
            }).catch((error) => {
                setStatusMessage("Internal error")
            })
    }

    const performLogin = () => {
        validateInput() ?
            (
                setStatusMessage(""),
                postData()
            ) :
            setStatusMessage("Invalid credentials, please try again")
    }

    return (
        <div className="bg-[#F3F3F3] h-screen w-screen flex flex-col items-center">
            <div className="flex justify-between w-screen px-8 pt-8">
                <Link href={"/"}>
                    <a className="text-blue-700 text-4xl font-bold">Link24</a>
                </Link>
                <Link passHref href={"/signup"}>
                    <LinkButton title='Sign up' isSecondary />
                </Link>
            </div>
            <Heading title="Let's Log in" />
            <div></div>
            <form ref={loginform} className="bg-white drop-shadow-sm rounded-2xl h-fit w-11/12 lg:w-7/12 py-8 flex flex-col items-center justify-between ">
                <TextInput type='email' placeholder='Email' reportValidity value={emailInput} onChange={setEmailInput} /><br />
                <TextInput type='password' placeholder='Password' value={passwordInput} onChange={setPasswordInput} />
                {statusMessage.length > 0 &&
                    <p className='my-2 text-gray-700 font-light'>{statusMessage}</p>
                }
                <div className="mt-16 flex items-center space-x-4">
                    <LinkButton onClick={performLogin} isButton title='Log in' />
                </div>
            </form>
            <Imprint />

        </div>
    )
}

export default Login

