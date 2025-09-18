import { type } from "os";
import React, { LegacyRef } from "react";

interface Props {
    title: string;
    onClick?: () => void;
    isButton?: boolean;
    isSecondary?: boolean;
    href?: string
}

const LinkButton = ({ title, onClick, isButton, isSecondary, href }: Props, ref: LegacyRef<HTMLAnchorElement> | undefined) => {
    return (
        <>
            {isButton ?
                <button onClick={(e) => { e.preventDefault(); onClick && onClick() }} data-cy="button" className={`${isSecondary ? "sec" : "prim"} px-5 my-2 py-2 align-middle bg-center bg-blue-700 text-white border-none bg-contain bg-no-repeat`} >{title} </button>
                :
                <a ref={ref} onClick={onClick} href={href} className={isSecondary ? "sec" : "prim"} >{title}</a>}
        </>
    )
}



export default React.forwardRef(LinkButton)
