import React, { useEffect, useState } from "react";
import "./_videoHorizontal.scss";

import { Col, Row } from "react-bootstrap";

import moment from "moment";
import numeral from "numeral";
import { useNavigate } from "react-router-dom";
import request from "../../api";

const VideoHorizontal = ({video}) => {

  const {
    id,
    snippet: {
      //  channelId,
       channelTitle,
       title,
       publishedAt,
       thumbnails: { medium },
    },
    contentDetails,
  } = video
  
  const [views, setViews] = useState(null)
  const [duration, setDuration] = useState(null)

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

  // const [channelIcon, setChannelIcon] = useState(null)

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


//  useEffect(() => {
//   const get_channel_icon = async () => {
//      const {
//         data: { items },
//      } = await request('/channels', {
//         params: {
//            part: 'snippet',
//            id: channelId,
//         },
//      })
//      setChannelIcon(items[0].snippet.thumbnails.default)
//   }
//   get_channel_icon()
// }, [channelId])
 const handleVideoClick = ()=> {
  navigate(`/watch/${_videoId}`);
  window.scrollTo(0, 0);
 };

  return (
    <Row className="videoHorizontal m-1 py-2 align-align-items-center" onClick={handleVideoClick}>
      <Col xs={6} md={4} className="videoHorizontal__left">
        <img
          src={medium.url}
          alt="thumbnail"
          className="videoHorizontal__thumbnail"
          wrapperClassName="videoHorizontal__thumbnail-wrapper"
        />
        {/* <span className="video__top__duration">{_duration}</span> */}
        <span className="videoHorizontal__duration">{_duration}</span>
      </Col>
      <Col xs={6} md={8} className="videoHorizontal__right p-0">
        <p className="videoHorizontal__tittle mb-1">{title}
        </p>
        <div className="videoHorizontal__channel">
          {/* <img src="" alt="" /> */}
          <p>{/*Channel Name*/}{channelTitle}</p>
        </div>

        <div className="videoHorizontal__detls">
          {(numeral(views).format("0.a")).toUpperCase()} views •{" "}
          {moment(publishedAt).fromNow()}
        </div>
      </Col>
    </Row>
  );
};

export default VideoHorizontal;
