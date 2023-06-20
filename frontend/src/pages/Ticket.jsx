import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { getTicket,closeTicket } from '../features/tickets/ticketSlice'
import { getNotes,createNote,reset as notesReset } from '../features/notes/noteSlice'
import BackButton from '../components/BackButton'
import { useParams } from 'react-router-dom'
import { useEffect,useState } from 'react'
import { toast } from 'react-toastify'
import Modal from 'react-modal'
import { FaPlus } from 'react-icons/fa'

import { useNavigate } from 'react-router-dom'
import NoteItem from '../components/NoteItem'
const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
  },
}

Modal.setAppElement('#root')
function Ticket() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [noteText, setNoteText] = useState('')
  const {ticket,isSuccess,isLoading,isError,message}=useSelector((state)=>state.ticket)
  const {notes,isSuccess:notesIsLoading}=useSelector((state)=>state.notes)
  const params=useParams()
  const dispatch=useDispatch()
  const ticketId=params.ticketId
  const navigate=useNavigate()
  console.log(ticketId)
  useEffect(()=>{
    if(isError){
      toast.error(message)

    }
    dispatch(getNotes(ticketId))
    
    dispatch(getTicket(ticketId))
    
    
  },[isError,message,ticketId])
  const onTicketClose=()=>{
    dispatch(closeTicket(ticketId))
    toast.success('ticket closed')
    navigate('/')
  }
  const openModal = () => setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)
  const onNoteSubmit=(e)=>{
    e.preventDefault()
    dispatch(createNote({noteText,ticketId}))
    closeModal()

  }
  if(isLoading||notesIsLoading){
    return <h1>Loading</h1>
  }
  if(isError){
    return <h1> something went wrong</h1>
  }
  return (
   

    <div className='ticket-page'>
    <header className='ticket-header'>
      <BackButton url='/tickets' />
      <h2>
        Ticket ID: {ticket._id}
        <span className={`status status-${ticket.status}`}>
          {ticket.status}
        </span>
      </h2>
      <h3>
      Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
        </h3>
        <h3>Product: {ticket.product}</h3>
        <div className='ticket-desc'>
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes</h2>
        </header>
        
        <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Add Note'
      >
        <h2>Add Note</h2>
        <button className='btn-close' onClick={closeModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className='form-group'>
            <textarea
              name='noteText'
              id='noteText'
              className='form-control'
              placeholder='Note text'
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className='form-group'>
            <button className='btn' type='submit'>
              Submit
            </button>
          </div>
        </form>
      </Modal>
        {ticket.status !== 'closed' && (
        <button onClick={openModal} className='btn'>
          <FaPlus /> Add Note
        </button>
      )}
       
        {notes ? (
        notes.map((note) => <NoteItem key={note._id} note={note} />)
      ) : (
        <h3>loading</h3>
      )}
        
       
        {ticket.status !== 'closed' && (
        <button onClick={onTicketClose} className='btn btn-block btn-danger'>
          Close Ticket
        </button>
      )}
        </div>
  )
}

export default Ticket
