import React, { useEffect, useRef, useState } from "react";
import "./_header.scss";
import logo from "../../assets/yt-logo-white.png";
// import logos from "../../assets/YouTube_full-color_icon_(2017).svg.png";
import logos from "../../assets/ytlogoproN-removebg-preview.png"
import { FaBars } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
// import { MdNotifications, MdApps } from "react-icons/md";
// import { useHistory } from 'react-router-dom'
// import { useSelector } from 'react-redux'

import { MdMic } from "react-icons/md";
import { BiVideoPlus } from "react-icons/bi";
import { FaRegBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { log_out, login } from "../../redux/actions/auth.action";
import { IoLogOutSharp } from "react-icons/io5";
// import LoginScreen from "../../screens/loginScreen/LoginScreen";

const Header = ({ handleToggleSidebar }) => {

  // const search = () => {
  //   document.getElementById("inp").style.borderColor = "#1C62B9";
  //   // document.getElementById("inp").style.borderColor = "#334075";
  //   // document.getElementById("inp").style.borderColor = "#163863";
  // }
  const dispatch = useDispatch()
  const [input, setInput] = useState('')

  const navigate = useNavigate();

  const {accessToken} = useSelector(state => state.auth)

  const handleSearch = (e)=> {
    e.preventDefault();
    if(accessToken){
    navigate(`/search/${input}`)
    window.scrollTo(0, 0);
  }else{
    dispatch(login());
  }
  }

  const goHome = ()=> {
    if(accessToken){
      navigate("/")
    }else{
      dispatch(login());
    } 
  }

  const {name,photoURL} = useSelector(state => state.auth?.user) || {}
  const userPhoto = photoURL || "https://cdn-icons-png.flaticon.com/256/1144/1144760.png"

  const header = useRef(null)
  const acc = useRef(null);
  const logOutHandler = () => {
    dispatch(log_out())
    if(acc.current){
      acc.current.classList.add("none");
    }
  }
  const accInfo = () => {
    if(acc.current){
      acc.current.classList.toggle("none");
    }
  }
  useEffect(()=>{
    document.body.addEventListener("click", (event) => {
      if(header.current && !event.composedPath().includes(header.current)){
        acc.current.classList.add("none");
      }
    })
  })

  return (
    <div ref={header} class="header">
      <div className="header__menu">
      <FaBars  size={26}
      onClick={() => handleToggleSidebar()}
       />
      </div>
      <img src={logo} alt="youtube" className="header__logo" onClick={goHome} />
      <img src={logos} alt="yt" className="header__small" onClick={goHome} />
      <form id="inp"onSubmit={handleSearch}>
        <input  type="text" placeholder="Search" value={input} onChange={e=>setInput(e.target.value)} />
        <button type="submit">
          <AiOutlineSearch size={24} />
        </button>
      </form>
      <div id="mic" className='header__mic text-yt-white bg-yt-light w-10 h-10 items-center flex justify-center rounded-full ml-4 hover:bg-yt-light-black cursor-pointer'>
            <MdMic className="text-center" size={26} />
      </div>
      <div className="header__icons">
        <div className="header__icons__iov mr-2  w-10 hover:bg-yt-light-black rounded-full cursor-pointer">
          <BiVideoPlus size={30} />
        </div>
        <div className="header__icons__iob mx-3 pr-2 pl-2.5 pt-2.5 pb-2.5 w-10 hover:bg-yt-light-black rounded-full cursor-pointer">
          <FaRegBell size={23} className="text-center text-yt-white" />
        </div>

        {/* <LoginScreen/> */}
        {/* <MdNotifications size={28} />
        <MdApps size={28} /> */}
        <img
          src={userPhoto}
          alt="aobotar"
          onClick={accInfo}
        />
      </div>
        <div id="acc" ref={acc} className=" bg-yt-light-black rounded-lg fixed flex flex-col right-0 top-20 p-2 -z-50">
          <div className="flex flex-row py-2">
            {/* <img
             src={userPhoto}
             alt="aobotar"
             className="w-4"
            /> */}
            <p>{name}</p>
          </div>
          <div className="flex flex-row border-yt-gray border-t-2 py-2" onClick={logOutHandler}>
            Log Out <IoLogOutSharp size={24}/>
          </div>
        </div>
    </div>
  );
};

export default Header;
