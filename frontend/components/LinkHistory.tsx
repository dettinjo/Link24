import { ClipboardCopyIcon, CogIcon, XIcon, DuplicateIcon, PencilIcon, ChevronDownIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react';
import Modal from 'react-modal';
import LinkButton from '../components/LinkButton'
import TextInput from './TextInput';




interface Props {
  linkHistoryArray: [linkObject];
  deleteLink: (arg0: string) => void
  updateLink: (arg0: string, arg1: string) => void
}
interface linkObject {
  _id: string;
  original: string;
  slug: string;
  clicks: number;
  expiresAt: string;
}

const LinkHistory = ({ linkHistoryArray, deleteLink, updateLink }: Props) => {
  const router = useRouter()
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editUrlInput, setEditUrlInput] = useState("");
  const [selectedLink, setSelectedLink] = useState<linkObject | null>(null)
  const updatelinkform = useRef<HTMLFormElement>(null)
  const [statusMessage, setStatusMessage] = useState("")

  function parseDate(str: string) {
    const ymd = str.split('-');
    const year = parseInt(ymd[0])
    const month = parseInt(ymd[1])
    const day = parseInt(ymd[2])
    const date = new Date(year, month, day)
    const string = `${day}.${month}.${year}`
    // const UTC = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    return string
  }

  // function datediff(input: any) {
  //   const today = new Date().toJSON().slice(0, 10)
  //   const parsedToday = parseDate(today)
  //   const parsedInput = parseDate(input)
  //   console.log("today", today, parsedToday)
  //   console.log("today", parsedToday, "input", parsedInput)
  //   return Math.floor((parsedInput - parsedToday) / (1000 * 60 * 60 * 24));
  // }



  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const performUpdateLink = () => {
    if (selectedLink && updatelinkform?.current?.checkValidity()) {
      setStatusMessage("")
      updateLink(selectedLink._id, editUrlInput);
      setEditModalOpen(false);
      setSelectedLink(null)
    } else {
      setStatusMessage("Invalid URL")
    }
  }



  return (
    <div className='bg-[#F3F3F3] w-screen h-screen flex flex-col justify-center items-center px-1 md:px-22'>
      <h3 className='align-left w-full px-5 font-bold text-2xl mt-10 text-gray-800 mb-5'>Your link history</h3>
      <table className="bg-white drop-shadow-sm rounded-2xl w-11/12 text-gray-800 hidden md:table">
        <thead className="border-b text-left h-16 font text-xl">
          <tr className="px-10">
            <th className='text-blue-700 pl-5'>Slug</th>
            <th className='w-min'></th>
            <th className='pl-5 text-blue-700'>URL</th>
            <th className='w-min'></th>
            <th className='w-min'>Expiry</th>
            <th className='w-min'>Clicks</th>
            <th className='w-min pr-5'></th>
          </tr>
        </thead>
        <tbody>
          {linkHistoryArray?.slice(0).reverse().map((element: linkObject) =>
            <tr className=' font-light h-12' key={element._id}>
              <td className='pl-5'> <p>{element.slug}</p></td>
              <td className="px-0 "><DuplicateIcon onClick={() => navigator.clipboard.writeText(`${"localhost:3000/" + element.slug}`)} className="cursor-pointer h-5 w-5 px-0" /></td>
              <td ><a onClick={() => navigator.clipboard.writeText(element.original)}>{element.original}</a></td>
              <td><PencilIcon onClick={() => { setSelectedLink(element); setEditModalOpen(true); setEditUrlInput(element.original) }} className="h-5 w-5 cursor-pointer" /></td>
              <td>{parseDate(element.expiresAt.substring(0, 10))}</td>
              <td className='font-bold'>{element.clicks}</td>
              <td className='pr-2' ><XIcon onClick={() => { setSelectedLink(element); setDeleteModalOpen(true) }} className="h-5 w-5 cursor-pointer" /></td>
            </tr>
          )}
        </tbody>
      </table>

      {linkHistoryArray?.slice(0).reverse().map((element: linkObject) =>
        <div key={element._id} className='md:hidden  text-left w-full px-5'>
          <h3 className='font-medium text-lg w-full flex items-center justify-between  text-blue-700' onClick={() => { element._id === selectedLink?._id ? setSelectedLink(null) :  setSelectedLink(element) }} key={element._id}>{element.slug} <ChevronDownIcon className=' h-8    w-8 focus:rotate-180  text-gray-800'/> </h3>
          {element._id === selectedLink?._id &&
            <div className='flex flex-col items-start sm:items-center mt-2 sm:flex-row mb-5'>
              <div className='flex items-start flex-wrap '>
              <p className='mr-5 font-medium max-w-sm overflow-hidden ' >{element.original}</p>
              <p className='mr-5 font-light'>Expiry: {parseDate(element.expiresAt.substring(0, 10))}</p>
              <p className='font-light'>Clicks:{element.clicks}</p>
              </div>
              <div className='flex items-end sm:ml-12 mt-3 sm:mt-0'>
                <ClipboardCopyIcon onClick={() => navigator.clipboard.writeText(`${"localhost:3000/" + element.slug}`)} className="cursor-pointer h-7 w-7 mr-5 px-0" />
                <CogIcon onClick={() => { setSelectedLink(element); setEditModalOpen(true); setEditUrlInput(element.original) }} className="h-7 w-7 mr-5 cursor-pointer" />
                <XIcon onClick={() => { setSelectedLink(element); setDeleteModalOpen(true) }} className="h-7 w-7 cursor-pointer" />
              </div>
             
            </div>
          }

        </div>
      )}

      <Modal isOpen={deleteModalOpen} onRequestClose={() => setDeleteModalOpen(false)} style={customStyles} contentLabel="Example Modal">
        <h3 >Delete link</h3>
        <p>Are you sure you want to delete Redirect for {selectedLink?.slug}</p>
        <div className=' flex justify-center gap-2'>
          <LinkButton onClick={() => { if (selectedLink) { deleteLink(selectedLink._id); setDeleteModalOpen(false); setSelectedLink(null) } }} title="Delete" isButton isSecondary />
          <LinkButton onClick={() => setDeleteModalOpen(false)} title="Abort" isButton />
        </div>
      </Modal>
      <Modal isOpen={editModalOpen} onRequestClose={() => setEditModalOpen(false)} style={customStyles} contentLabel="Example Modal">
        <div className='p-5'>
        <h3 className='font-bold' >Edit link</h3>
        <form ref={updatelinkform}>
          <p className='font-light'>/{selectedLink?.slug}</p>
          <TextInput value={editUrlInput} onChange={setEditUrlInput} pattern="^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$" title='Enter a valid URL' reportValidity />
          {statusMessage.length > 0 && statusMessage}
          <div className=' flex justify-start gap-2'>
            <LinkButton onClick={() => { performUpdateLink() }} title="Update" isButton isSecondary />
            <LinkButton onClick={() => setEditModalOpen(false)} title="Abort" isButton />
          </div>
        </form>
        </div>
      </Modal>

    </div>

  )
}

LinkHistory.defaultProps = {

}


export default LinkHistory
