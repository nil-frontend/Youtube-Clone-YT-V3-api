import React, { useState } from 'react'
import './_catagoriesBar.scss'
import { useDispatch } from 'react-redux'
import { getPopularVideos, getVideosByCategory } from '../../redux/actions/videos.action'
// import { useDispatch } from 'react-redux'
// import {
//    getPopularVideos,
//    getVideosByCategory,
// } from '../../redux/actions/videos.action'


const keywords = [
  'All',
  'React js',
  'Angular js',
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

const CatagoriesBar = () => {

  const [activeElement, setActiveElement] = useState('All')

  const dispatch = useDispatch()
  const handleClick = (value) => {
    setActiveElement(value)
    if (value === "All"){
      dispatch(getPopularVideos())
    }else{
      dispatch(getVideosByCategory(value))
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

export default CatagoriesBar
