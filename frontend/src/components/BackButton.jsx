import { FaArrowCircleLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'

// NOTE: here navigate the user in the history stack for a true 'back' button

const BackButton = ({url}) => {
    console.log(url)
  
  return (
    <Link to={url} className='btn btn-reverse btn-back'>
        <FaArrowCircleLeft/>Back
    </Link>
  )
}

export default BackButton