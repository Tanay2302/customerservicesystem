import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { register,reset } from '../features/auth/authSlice'

function Register() {
    const [formdata,setformdata]=useState({
        name:'',
        email:'',
        password:'',
        password2:''
    })
    const {name,email,password,password2}=formdata
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {user,isLoading,isError,isSuccess,message}=useSelector(state=>state.auth)
    useEffect(()=>{
        if(isError){
            toast.error(message)
        }
        if(isSuccess||user){
            navigate('/')

        }
        dispatch(reset())

    },[isError,isSuccess,user,message,navigate,dispatch ])
    const onChange=(e)=>{
        setformdata({...formdata,[e.target.name]:e.target.value})

    }
    const onsubmit=(e)=>{
        e.preventDefault()
        if(password!==password2){
            toast.error('passwords do not match')
        }
        else{
            const userdata={
                name,
                email,
                password
            }
            dispatch(register(userdata))
        }

    }
    if(isLoading){
      return <>loading</>
    }
  return (
    <>
      <section className='heading'>
        <h1>
            <FaUser/> Register
            <p>Please create an account</p>

        </h1>

      </section>
      <section className='form'>
        <form onSubmit={onsubmit}>
        <div className='form-group'>
            <input type='text'
              className='form-control'
              id='name'
              name='name'
              value={name}
              onChange={onChange}
              placeholder='Enter your name'
              required
              />
        </div>
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
            <input type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={password2}
              onChange={onChange}
              placeholder='Confirm your password'
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

export default Register
