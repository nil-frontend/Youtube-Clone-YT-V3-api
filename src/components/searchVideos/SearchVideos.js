import React, { useEffect, useState } from "react";
import "./_SearchVideos.scss";

import { Col, Row } from "react-bootstrap";

import moment from "moment";
import numeral from "numeral";
import { useNavigate } from "react-router-dom";
import request from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { checkSubscriptionStatus, getChannelDetails } from "../../redux/actions/channel.action";

const SearchVideos = ({video,SearchScreen,subScreen}) => {

  const {
    id,
    snippet: {
       channelId,
       channelTitle,
       description,
       title,
       publishedAt,
       thumbnails: { medium },
       resourceId,
    },
    contentDetails,
  } = video
  
  const isVideo = id.kind === 'youtube#video'
  const isChannel = id.kind === 'youtube#channel'
  const isSubscription = video.kind === 'youtube#subscription'
  const _channelId = resourceId?.channelId || channelId;

  const [views, setViews] = useState(null)
  const [duration, setDuration] = useState(null)

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

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
  };
  if(isVideo){
  get_video_details()}
 }, [_videoId,isVideo])


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

//for open the channel [page on clicking the channel name in search videos]
function createCancellationToken() {
  let cancel = false;
  return {
      cancel: () => { cancel = true; },
      isCancelled: () => cancel
  };
}

 const handleVideoClick = ()=> {
  if (cancelToken.isCancelled()) return;
  // isSubscription &&(navigate(`/channel/${_channelId}`))
  isVideo?
  navigate(`/watch/${_videoId}`)
  :
  isChannel?
  navigate(`/${_customUrl}/${_channelId}`)
  :
  navigate(`/channel/${_channelId}`)
 };
 const handelVideoChannelClick = ()=> {
  cancelToken.cancel()
  if(isVideo)
  navigate(`/channel/${channelId}`)
  // setTimeout(() => cancelToken.cancel(), 2000);
 };
 const cancelToken = createCancellationToken();

 const thumbnailRound = !isVideo && 'videoHorizontal__thumbnail-channelIcon'
 const align_items_center = !isVideo && 'align-items-center' 

 

 ////to check the @channel_custom_url, subscribers & subscription status.
 const dispatch = useDispatch()

 const {snippet:channelSnippet,statistics:channelStatistics} = useSelector(state=>state.channelDetails?.channel) || {};
 const subscriptionStatus = useSelector(state=>state.channelDetails?.subscriptionStatus);
 console.log(subscriptionStatus)

 useEffect(()=>{
if(isChannel){
   dispatch(getChannelDetails(channelId))
   dispatch(checkSubscriptionStatus(channelId))
  }
 },[dispatch,channelId,isChannel])


 const _subscriberCount = channelStatistics?.subscriberCount
 const _customUrl = channelSnippet?.customUrl 

 const _subscribed = subscriptionStatus && 'subscribedBro'

  return (
    <Row className={`videoHorizontal m-1 py-2 ${align_items_center}`} onClick={handleVideoClick}>
      <Col xs={6} md={4} className="videoHorizontal__left">
        <img
          src={medium.url}
          alt="thumbnail"
          className={`videoHorizontal__thumbnail ${thumbnailRound}`}
          wrapperClassName="videoHorizontal__thumbnail-wrapper"
        />
        {/* <span className="video__top__duration">{_duration}</span> */}
        {isVideo && (
        <span className="videoHorizontal__duration">{_duration}</span>
        )}
      </Col>
      <Col xs={6} md={8} className="videoHorizontal__right p-0">
        <p className="videoHorizontal__tittle2 mb-1">{title}
        </p>
        {isVideo && (
        <div className="videoHorizontal__detls mb-2">
          {(numeral(views).format("0.a")).toUpperCase()} views •{" "}
          {moment(publishedAt).fromNow()}
        </div>
        )}
        <span id="channelMetaDataBottom" className="flex items-center">
          <span>
        <div className="videoHorizontal__channel pt-1.5 "  >
        <span className="flex items-center" onClick={handelVideoChannelClick}>
            {isVideo && (
                <img src={channelIcon?.url} alt="channel-icon" className=" hover:cursor-help" />
            )}
            {isVideo && (
            <p id="searchChannelName">{/*Channel Name*/}{channelTitle}</p>
            )}
            {isChannel && (
            <p>{_customUrl} • {(numeral(_subscriberCount).format("0.a")).toUpperCase()} subscribers</p>
            )}
            {isSubscription && (
              <p>{contentDetails.totalItemCount} Videos</p>
            )}
        </span>
        </div>
        {/* if it is a video show Video description */}
        {isVideo && (
        <div className="videoHorizontal__description pt-3 line-clamp-2 ">
          <p>{/*Channel Name*/}{description}</p>
        </div>
        )}
        {/* if it is not a video show channel description */}
        {!isVideo && (
        <div className="videoHorizontal__description pt-3 ">
          <p className="line-clamp-2">{/*Channel Name*/}{description}</p>
        </div>
        )}
        </span>
        <span className="subscribeBtn ml-auto mr-5">
        {isChannel && (
        <button className={` bg-yt-white px-3 py-2 rounded-3xl text-sm text-yt-black font-medium hover:bg-yt-sub ${_subscribed}`}>
             {subscriptionStatus? 'Subscribed' : 'Subscribe'}                                                                                 {/*// subscribed or not subscription status subscribe */}
          </button>
        )}
        </span>
        </span>
      </Col>
    </Row>
  );
};

export default SearchVideos;