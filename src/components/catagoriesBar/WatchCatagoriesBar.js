import React, { useState } from 'react'
import './_catagoriesBar.scss'
import { useDispatch, /*useSelector*/ } from 'react-redux'
import { getWatchPopularVideos, getWatchVideosByCategory } from '../../redux/actions/videos.action'
// import { useDispatch } from 'react-redux'
// import {
//    getPopularVideos,
//    getVideosByCategory,
// } from '../../redux/actions/videos.action'

// const video = useSelector(state=>state.selectedVideo);


const WatchCatagoriesBar = ({video}) => {
// const _snippet = video?.snippet
// const title = _snippet;
const {channelTitle} = video?.snippet || {};

const keywords = [
  'All',
  `from ${channelTitle}`,
  'React js',
  'Angular js',
  'Crypto',
  'Trading',
  'React Native',
  'use of API',
  'Redux',
  'Music',
  'Algorithm Art ',
  'Guitar',
  'Bengali Songs',
  'Coding',
  'Cricket',
  'Football',
  'Real Madrid',
  'Gatsby',
  'Poor Coder',
  'WWE',
  'Shwetabh',
]
  const [activeElement, setActiveElement] = useState('All')

  const dispatch = useDispatch()
  const handleClick = (value) => {
    setActiveElement(value)
    if (value === "All"){
      dispatch(getWatchPopularVideos())
    }else{
      dispatch(getWatchVideosByCategory(value))
      console.log(value);
    }
  }
  return (
    
    <div className='categoriesBar'>
         {keywords.map((value, i) => (
            <span
               onClick={() => handleClick(value)}
               key={i}
               className={activeElement === value ? 'active' : ''}>
               {value}
            </span>
         ))}
      </div>
  )
}

export default WatchCatagoriesBar