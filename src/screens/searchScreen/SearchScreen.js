import React, { useEffect } from 'react'
import './searchScreen.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getVideosBySearch } from '../../redux/actions/videos.action'
import SearchVideos from '../../components/searchVideos/SearchVideos'
import Skeleton from 'react-loading-skeleton'
import BottomNavBar from '../../components/bottomNavBar/BottomNavBar'

const SearchScreen = () => {

  const {query} = useParams()
  console.log(query)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getVideosBySearch(query))
  },[query,dispatch])

  const {videos, loading, error} = useSelector(state=>state.searchedVideos) || {}
  console.log(videos)

  return (
    <>
    <Sidebar/>
    <BottomNavBar/>
    {!error?(
    <div id='searchScreen' className="w-[calc(100%-240px)]  h-[calc(100%-53px)] pt-20  bg-yt-black ml-60">
      {
      !loading ? (
        videos?.map(video => <SearchVideos video={video} key={video.id.videoId} SearchScreen/>)
      ):<Skeleton width='98%' height='12rem' count={15}/>
      }
    </div>
  ):(
    <div id='searchScreen' className="w-[calc(100%-240px)]  h-[calc(100%-53px)] pt-20  bg-yt-black ml-60">
      <Skeleton width='98%' height='12rem' count={15}/>
    </div>
  )}
    </>
  )
}

export default SearchScreen
