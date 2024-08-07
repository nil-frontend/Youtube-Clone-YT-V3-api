import React, { useEffect } from 'react'
import {BsPersonCircle} from 'react-icons/bs'
import './_loginScreen.scss'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/actions/auth.action'
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {

  const accessToken = useSelector(state=>state.auth.accessToken)

  const dispatch = useDispatch()

  const handleLogin = () => {
    dispatch(login())
  }
  
  const navigate = useNavigate()

  useEffect(() => {
    if (accessToken) {
       navigate('/')
    }
  }, [accessToken, navigate])

  
  return (
    <div className='divo mt-20  pt-28'>
        <div className='logbtn flex justify-center items-center rounded-full bg-yt-light-dark text-yt-white p-2 mt-2 cursor-pointer'
        onClick={handleLogin}
        >
          <BsPersonCircle size={22} className='mr-2 text-log-txt-color'/>
          <div className='pr-1 text-log-txt-color'>
            Login
          </div>
        </div>
    </div>
  )
}

export default LoginScreen
