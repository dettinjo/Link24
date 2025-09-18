import Heading from '../components/Heading'
import TextInput from '../components/TextInput'
import Link from 'next/link'
import { useRef, useState } from 'react'
import LinkButton from '../components/LinkButton'
import { useRouter } from 'next/router'
import Imprint from '../components/Imprint'


const Signup = () => {

    const [emailInput, setEmailInput] = useState("")
    const [passwordInput, setPasswordInput] = useState("")
    const [passwordRepeatInput, setPasswordRepeatInput] = useState("")
    const [statusMessage, setStatusMessage] = useState("")
    const signupform = useRef<HTMLFormElement>(null)
    const router = useRouter()


    const validateInput = () => {
        return (
            emailInput.length > 0 &&
            passwordInput.length > 0 &&
            passwordInput === passwordRepeatInput &&
            signupform?.current?.checkValidity()
        )
    }

    const postData = async () => {
        fetch(`http://localhost:8080/auth/signup`
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
                } else if (res.status === 409) {
                    setStatusMessage("Email is already registerd")
                    return
                } else if (res.status === 400) {
                    setStatusMessage("Please provide email and/or password")
                    return
                } else {
                    setStatusMessage("Internal error")
                    return
                }
            }).then((data) => {
                data && (
                    setStatusMessage("Succsessful registered, logging in in 3.. 2.. 1.."),
                    localStorage.setItem('jwt', data.token),
                    setTimeout(() => { router.push("/") }, 3000)
                )
            })
    }

    const performSignup = () => {
        validateInput() ?
            (
                setStatusMessage(""),
                postData()
            ) :
            setStatusMessage("Invalid or empty input, please try again")
    }

    return (
        <div className="bg-[#F3F3F3] h-screen w-screen flex flex-col items-center">
            <div className="flex justify-between w-screen px-8 pt-8">
                <Link href={"/"}>
                    <a className="text-blue-700 text-4xl font-bold">Link24</a>
                </Link>
                <Link passHref href={"/login"}>
                    <LinkButton title='Login' isSecondary />
                </Link>
            </div>

            <Heading title="Let's Sign up" />
            <form ref={signupform} className="bg-white drop-shadow-sm rounded-2xl h-fit w-11/12 lg:w-7/12 py-8 flex flex-col items-center justify-between ">
                <TextInput type='email' reportValidity placeholder='Enter email' onChange={setEmailInput} value={emailInput} /> <br />
                <TextInput type='password' pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,64}' title='Password must contain at least one number and one uppercase and lowercase letter, password must be between 8 and 64 characters' placeholder='Choose password' onChange={setPasswordInput} reportValidity value={passwordInput} /><br />
                <TextInput placeholder='Repeat password' type='password' reportValidity title='Must be the same password as before' pattern={passwordInput} onChange={setPasswordRepeatInput} value={passwordRepeatInput} />
                {statusMessage.length > 0 && <p className='my-2 text-gray-700 font-light'>{statusMessage}</p>}
                <div className="mt-16 flex space-x-4">
                    <LinkButton onClick={performSignup} isButton title='Sign up' />
                </div>
            </form>


            <Imprint />
        </div>
    )
}

export default Signup
