import React from 'react'
import { useState,useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { login,reset } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'


function Login() {
    const [formdata,setformdata]=useState({
      
        email:'',
        password:'',
        
    })
    const {email,password}=formdata
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {user,isLoading,isError,isSuccess,message}=useSelector(state=>state.auth)
    

    const onChange=(e)=>{
        setformdata({...formdata,[e.target.name]:e.target.value})

    }
    useEffect(()=>{
      if(isError){
        toast.error(message)
    }
    if(isSuccess||user){
        navigate('/')

    }
    dispatch(reset())

    },[isError,isSuccess,user,message,navigate,dispatch])

    const onsubmit=(e)=>{
        e.preventDefault()
        const userdata={
            email,
            password
        }
        dispatch(login(userdata))
    
    }
    if(isLoading){
      return <>loading</>
    }
  return (
    <>
      <section className='heading'>
        <h1>
            <FaSignInAlt/> Login
            <p>Login to your account</p>

        </h1>

      </section>
      <section className='form'>
        <form onSubmit={onsubmit}>
       
        <div className='form-group'>
            <input type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              onChange={onChange}
              placeholder='Enter your email'
              required
              />
        </div>
        <div className='form-group'>
            <input type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              onChange={onChange}
              placeholder='Enter your password'
              required
              />
        </div>
       
        <div className='form-group'>
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>

      </section>
    </>
  )
}

export default Login
