import React from 'react'
import './shortsScreen.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import BottomNavBar from '../../components/bottomNavBar/BottomNavBar'

function ShortsScreen() {
  return (
    <>
    <Sidebar activeElement={"Shorts"}/>
    <BottomNavBar/>
    <div id='shortsScreen' className="w-[calc(100%-240px)]  h-[calc(100%-53px)] pt-20  bg-yt-black ml-60">
        <p className='flex justify-center flex-col'>This Section is now on Maintenance!
            <br/>
            Come Back Later...
            <svg className='h-96' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path fill="#121417" stroke="#121417" stroke-width="9" transform-origin="center" d="m148 84.7 13.8-8-10-17.3-13.8 8a50 50 0 0 0-27.4-15.9v-16h-20v16A50 50 0 0 0 63 67.4l-13.8-8-10 17.3 13.8 8a50 50 0 0 0 0 31.7l-13.8 8 10 17.3 13.8-8a50 50 0 0 0 27.5 15.9v16h20v-16a50 50 0 0 0 27.4-15.9l13.8 8 10-17.3-13.8-8a50 50 0 0 0 0-31.7Zm-47.5 50.8a35 35 0 1 1 0-70 35 35 0 0 1 0 70Z"><animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="1" values="0;120" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform></path></svg>
        </p>
    </div>
    </>
  )
}

export default ShortsScreen
