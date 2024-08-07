import React from 'react'
import './bottomNavBar.scss'
import { MdHomeFilled, MdSubscriptions } from "react-icons/md";
import { SiYoutubeshorts } from 'react-icons/si';
import { useDispatch, /*useSelector*/ } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { SiYoutubeshorts } from "react-icons/si";
import { IoLogOutSharp } from "react-icons/io5";
import { log_out } from '../../redux/actions/auth.action';

function BottomNavBar() {

    // const {photoURL} = useSelector(state => state.auth?.user) || {}
    // const userPhoto = photoURL || "https://cdn-icons-png.flaticon.com/256/1144/1144760.png"

    const navigation = useNavigate()
    const dispatch = useDispatch()
    const navClick = (value) => {
        // console.log("object")
        if(value === "home"){
            navigation('/');
        }else if(value === "shorts"){
            navigation('/feed/shorts')
        }
        else if(value === "subscriptions"){
            navigation('/feed/subscriptions')
        }else{
            dispatch(log_out());
        }
    }
  return (
    <nav className='w-full h-auto z-50 bg-yt-black fixed bottom-0 flex items-center justify-around none'>
        <div id='home' className=' cursor-pointer' onClick={() => navClick("home")}>
            <MdHomeFilled size={24} />
            <p>Home</p>
        </div>
        <div onClick={() => navClick("shorts")}>
            <SiYoutubeshorts size={24} />
            <p>Shorts</p>
        </div>
        <div onClick={() => navClick("subscriptions")}>
            <MdSubscriptions size={24} />
            <p>Subscriptions</p>
        </div>
        <div onClick={() => navClick()}>
            {/* <img src={userPhoto} alt=''/> */}
            <IoLogOutSharp size={24}/>
            <p>Log Out</p>
        </div>
    </nav>
  )
}

export default BottomNavBar