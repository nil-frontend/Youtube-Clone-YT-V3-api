// import React, { /*useEffect,*/ useState } from 'react'
// import { Container } from "react-bootstrap";

import Header from "./components/header/Header";
// import Sidebar from "./components/sidebar/Sidebar";
import HomeScreen from "./screens/homeScreen/HomeScreen";
import LoginScreen from './screens/loginScreen/LoginScreen';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {/*BrowserRouter,*/Route,Routes, useNavigate} from "react-router-dom"

import "./_app.scss"
// import Video from './components/video/Video';
// import WatchScreen from "./watchScreen/WatchScreen";
// import SearchScreen from "./screens/SearchScreen";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import WatchScreen from "./screens/watchScreen/WatchScreen";
import ChannelScreen from "./screens/channelScreen/ChannelScreen";
import SubscriptionsScreen from "./screens/subscriptionsScreen/SubscriptionsScreen";
import ShortsScreen from "./screens/shortsScreen/ShortsScreen";
import SearchScreen from "./screens/searchScreen/SearchScreen";
// import Sidebar from "./components/sidebar/Sidebar";





// const Layout = ({ children }) => {
//   const [sidebar, toggleSidebar] = useState(false)

//   const handleToggleSidebar = () => toggleSidebar(value => !value)

//   return (
//      <>
//         <BrowserRouter>
//     <Header />
//     <Routes>
//       <Route path="/" element={<HomeScreen />} />
//       <Route path="/video/:id" element={<Video />} />
//     </Routes>
//     </BrowserRouter>
//      </>
//   )
// }


const App = () => {

  const {accessToken, loading } = useSelector(state => state.auth)

  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !accessToken){
      navigate("/login")     // when you are not login you will be automatically redirected to this page you can't access any other page with out login
    }
  }, [accessToken, loading,navigate])
  

  // const [sidebar, toggleSidebar] = useState(false)
  // const handleToggleSidebar = () => toggleSidebar(value => !value)
  const sideBar = document.getElementById('sidebar')
  const handleToggleSidebar = () => {
    sideBar.classList.toggle('noSideBar')
  }

  return (
    <>
    {/* <BrowserRouter> */}
     <Header  handleToggleSidebar={handleToggleSidebar} />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/watch/:id" element={<WatchScreen />} />
        <Route path='/search/:query' element={<SearchScreen />} />
        <Route path='/channel/:channelId' element={<ChannelScreen/>} />
        <Route path='/:customUrl/:channelId' element={<ChannelScreen/>} />
        <Route path='/feed/subscriptions' element={<SubscriptionsScreen/>} />
        <Route path='/feed/shorts' element={<ShortsScreen/>} />
        <Route path='/login' element={<LoginScreen />} />
      </Routes>
    {/* </BrowserRouter> */}
    </>




    // <Router>
    //   <Route path='/'>
    //     <Layout>
    //        <HomeScreen />
    //     </Layout>
    //   </Route>

    //   <Route path='/auth' >
        
    //     <LoginScreen />
        
    //   </Route>

    //   <Route path='/search' >
    //     <Layout>
    //        <h1>search</h1>
    //     </Layout>
    //   </Route>
    // </Router>
  );
};

export default App;











