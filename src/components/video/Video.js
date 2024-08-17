import React, { useEffect, useState } from 'react'
import './_video.scss'
import request from '../../api'
import moment from 'moment'
import numeral from 'numeral'
import {useNavigate} from 'react-router-dom'

const Video = ({video,channelScreen}) => {

  const {
    id,
    snippet: {
       channelId,
       channelTitle,
       title,
       publishedAt,
       thumbnails: { medium },
    },
    contentDetails,
  } = video


  const [views, setViews] = useState(null)
  const [duration, setDuration] = useState(null)

  const seconds = moment.duration(duration).asSeconds()
  const _duration =moment.utc(seconds * 1000).format('mm:ss')

  const [channelIcon, setChannelIcon] = useState(null)

  const _videoId = id?.videoId || contentDetails?.videoId || id;

  const navigate = useNavigate()

 useEffect(() => {
  const get_video_details = async () => {
     const {
        data: { items },
     } = await request('/videos', {
        params: {
           part: 'contentDetails,statistics',
           id: _videoId,
        },
     })
     console.log(items);
     setDuration(items[0].contentDetails.duration)
     setViews(items[0].statistics.viewCount)
  }
  get_video_details()
 }, [_videoId])


 useEffect(() => {
  const get_channel_icon = async () => {
     const {
        data: { items },
     } = await request('/channels', {
        params: {
           part: 'snippet',
           id: channelId,
        },
     })
     setChannelIcon(items[0].snippet.thumbnails.default)
  }
  get_channel_icon()
}, [channelId])
 const handleVideoClick = ()=> {
  navigate(`/watch/${_videoId}`);
  window.scrollTo(0, 0);
 };

 const mr0 = channelScreen && ("mr-0")
  return (

    // <div className="pt-3 pl-2 pr-0 flex flex-wrap grid-cols-yt  gap-y-4">
    <div id='videosSection' className={`flex flex-col min-w-[170px] mx-w-[270px] cursor-pointer mb-4 mr-8 ${mr0}`} onClick={handleVideoClick}>
      <div className="relative w-full">
        <img
          // src="https://i.ytimg.com/vi/di2w3aXPfVM/maxresdefault.jpg"
          src={medium.url}
          alt=""
          className="h-full w-full overflow-hidden rounded-2xl"
        />
        <p className="absolute right-2 top-[85%] px-1 text-xs bg-yt-time-dur text-yt-white rounded">
          {/* 25:55 */}
          {_duration}
        </p>
      </div>
      <div className="flex mt-3">
        {/* <img src="https://yt3.ggpht.com/ytc/AOPolaTHupz_OgSOIeYnGyefqzByN06X1JxrDcapKOctaw=s48-c-k-c0x00ffffff-no-rj" alt="" className="h-9 w-9 rounded-full" /> */}
        <img src={channelIcon?.url} className='w-9 h-9 rounded-full' alt=''/>
        <div className="ml-2">
        <h2 className="title font-medium text-yt-white text-sm mt-0 mb-0 items-center line-clamp-2">
          {/* {title.length <= 70 ? title : `${title.substring(0, 60)}...`} */}
          {/* TINDER IN REAL LIFE But GIRLS PROPOSE This time😂 */}
          {title}
        </h2>
        <h3 className="text-yt-gray text-xs mt-1 flex items-center">
        {/* Fukra Insaan */}
        {channelTitle}
            <span className="p-1">
              {/* <MdVerified /> */}
            </span>
          </h3>
          <p className="text-yt-gray m-0 font-medium text-xs">
          {/* 3.7M Views • 3 days ago */}
          {(numeral(views).format("0.a")).toUpperCase()} Views • {moment(publishedAt).fromNow()}
          </p>
        </div>
      </div>
      
    </div>
    // </div>

    // <div className='video'>
    //   <div className="video__top">
    //     <img src="https://i.ytimg.com/vi/di2w3aXPfVM/maxresdefault.jpg" alt="" />
    //     <span className='video__top__duration'>25:55</span>
    //   </div>
    //   <div className="video__title">
    //     TINDER IN REAL LIFE But GIRLS PROPOSE This time😂
    //   </div>
    //   <div className="video__details">
    //     <p>
    //       3.7M views • 3days ago
    //     </p>
    //   </div>
    //   <div className="video__channel">
    //     <img src="https://yt3.ggpht.com/ytc/AOPolaTHupz_OgSOIeYnGyefqzByN06X1JxrDcapKOctaw=s48-c-k-c0x00ffffff-no-rj" alt="" />
    //     <p>
    //       Fukra Insaan
    //     </p>
    //   </div>
    // </div>
  )
}

export default Video
