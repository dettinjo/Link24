import React from "react";
import Heading from "./Heading";
import LinkButton from "./LinkButton";
import Link from "next/link";
import { useRouter } from "next/router";

const PageHead = (props: { isLoggedIn?: boolean; logUserOut?: () => void }) => {
  let { isLoggedIn } = props;
  const router = useRouter()

  if (isLoggedIn) {
    return <div className="flex justify-between w-screen px-8 pt-8">
      <Link href={"/"}>
        <a className="text-blue-700 text-4xl font-bold">Link24</a>
      </Link>
      <Link passHref href={"/login"}>
        <LinkButton onClick={props.logUserOut} title='Logout' isSecondary />
      </Link>

    </div>
  } else {
    return <div className="flex justify-between inline w-screen px-8 pt-8">
      <Link href={"/"}>
        <a className="text-blue-700 text-4xl font-bold">Link24</a>
      </Link>
      <div className="flex items-center">
        <Link passHref href={"/login"}><LinkButton title='Login' isSecondary /></Link>
        <div className="h-3/5 border-solid border-r-2 border-grey-700  sm:mx-5 mx-3"></div>
        <Link passHref href={"/signup"}><LinkButton isSecondary title='Sign up' /></Link>
      </div>
    </div>
  }
};

export default PageHead;