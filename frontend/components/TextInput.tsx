import { Dispatch, SetStateAction, useState } from "react"

interface Props {
  placeholder?: string;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  reportValidity?: boolean;
  pattern?: string;
  title?: string;
  type?: string;
  readonly?: boolean;
}


const TextInput = ({ placeholder, value, onChange, reportValidity, title, pattern, type, readonly }: Props) => {


  return (
    <input pattern={pattern} title={title} readOnly={readonly} placeholder={placeholder} value={value} type={type} onChange={(e) => { onChange(e.target.value); reportValidity && e.target.reportValidity() }} data-cy="LinkInput" className="h-9 my-4 align-middle w-3/4 font-semibold placeholder-blue pl-5 border-none ring-2 ring-gray-300 focus:ring-blue-700 focus:ring-2 " />
  )
}

TextInput.defaultProps = {
  type : "text"
}


export default TextInput