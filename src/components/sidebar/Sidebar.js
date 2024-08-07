import React, { useState } from 'react'
import './_sidebar.scss'

import { SideBarItems } from "../../static/data";

import {
  // MdSubscriptions,
  MdExitToApp,
  // MdThumbUp,
  // MdHistory,
  // MdLibraryBooks,
  // MdHome,
  // MdSentimentDissatisfied,
} from 'react-icons/md'


import { useDispatch } from 'react-redux'
import { log_out } from '../../redux/actions/auth.action'
import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom'





const Sidebar = ({ sidebar, handleToggleSidebar,activeElement }) => {

   const [active, setActive] = useState(`${activeElement || "Home"}`);

   const navigate = useNavigate()
  const dispatch = useDispatch()
   const logOutHandler = () => {
      dispatch(log_out())
   }

   const handleFeed = (item) => {
    setActive(activeElement)
    if (item.name === "Subscriptions"){
    navigate("/feed/subscriptions");
    // setTimeout(setActive(activeElement),2000)
    }else if (item.name === "Home"){
      navigate("/");
    }else{
      navigate("/feed/shorts");
      console.log(item.name)
    }
   }
  return (
   <div id='sidebar' className="noSideBar yt-scrollbar scrollbar-hide w-60 bg-yt-black h-[calc(100vh-53px)] mt-16 pt-4.5 fixed top-0 left-0 text-yt-white p-3 overflow-scroll">
      <div className="mb-4 mt-2">
        {SideBarItems.Top.map((item, index) => {
          return (
            <div
              key={index}
              className={`h-10 flex justify-start px-3 rounded-xl items-center cursor-pointer hover:bg-yt-light-black my-1 ${
                item.name === active ? "bg-yt-light-black" : "bg-yt-black"
              }`}
              onClick={() => setActive(item.name)}
            >
              <div className='h-10 flex justify-start  rounded-xl items-center cursor-pointer hover:bg-yt-light-black my-1'
              onClick={() => handleFeed(item)}>
                <span className="mr-5">{item.icon}</span>
                <p className="p-2 text-sm font-medium">{item.name}</p>
              </div>
            </div>
          );
        })}
      </div>
      <hr className="text-yt-light-black my-2" />
      <div className="mb-4">
        {SideBarItems.Middle.map((item, index) => {
          return (
            <div
              key={index}
              className={`h-10 flex justify-start px-3 rounded-xl items-center cursor-pointer hover:bg-yt-light-black my-1 ${
                item.name === active ? "bg-yt-light-black" : "bg-yt-black"
              }`}
              onClick={() => setActive(item.name)}
            >
              <span className="mr-5">{item.icon}</span>
              <p className="p-2 text-sm font-medium">{item.name}</p>
            </div>
          );
        })}
      </div>
      <hr className="text-yt-light-black my-2" />
      <div className='h-10 my-3 py-4 flex justify-start items-center cursor-pointer rounded-xl hover:bg-yt-light-black'
      onClick={logOutHandler}
      >
        <span>
          <MdExitToApp size={23} className='my-2 mr-6 ml-4'/>
        </span>
        <p className='pr-8'>Log Out</p>
      </div>
      <hr className="text-yt-light-black my-2" />
      <h2 className="pt-1 px-3">Explore</h2>
      <div className="mb-4">
        {SideBarItems.Explore.map((item, index) => {
          return (
            <div
              key={index}
              className={`h-10 flex justify-start px-3 rounded-xl items-center cursor-pointer hover:bg-yt-light-black my-1 ${
                item.name === active ? "bg-yt-light-black" : "bg-yt-black"
              }`}
              onClick={() => setActive(item.name)}
            >
              <span className="mr-5">{item.icon}</span>
              <p className="p-2 text-sm font-medium">{item.name}</p>
            </div>
          );
        })}
      </div>
      <hr className="text-yt-light-black my-2" />
    </div>





   //  <nav
   //       className={sidebar ? 'sidebar open' : 'sidebar'}
   //       onClick={() => handleToggleSidebar(false)}>
   //       {/* <Link to='/'> */}
   //          <li>
   //             <MdHome size={23} />
   //             <span>Home</span>
   //          </li>
   //       {/* </Link> */}
   //       {/* <Link to='/feed/subscriptions'> */}
   //          <li>
   //             <MdSubscriptions size={23} />
   //             <span>Subscriptions</span>
   //          </li>
   //       {/* </Link> */}

   //       <li>
   //          <MdThumbUp size={23} />
   //          <span>Liked Video</span>
   //       </li>

   //       <li>
   //          <MdHistory size={23} />
   //          <span>History</span>
   //       </li>

   //       <li>
   //          <MdLibraryBooks size={23} />
   //          <span>Library</span>
   //       </li>
   //       <li>
   //          <MdSentimentDissatisfied size={23} />
   //          <span>I don't Know</span>
   //       </li>

   //       <hr />

   //       <li >
   //        {/* onClick={logOutHandler} */}
   //          <MdExitToApp size={23} />
   //          <span>Log Out</span>
   //       </li>

   //       <hr />
   //    </nav>
  )
}

export default Sidebar
