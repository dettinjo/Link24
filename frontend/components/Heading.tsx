import LinkButton from '../components/LinkButton'
interface Props {
    title?: string;
}


const Heading = ({ title }:Props) => {

   
    return (
        
            <h2 className="text-4xl md:text-5xl font-bold text-grey-700 px-10 py-20 text-gray-800">
            {title} </h2>
        
    )
    } 



Heading.defaultProps = {
    title: "Let`s short links together "
}



export default Heading
