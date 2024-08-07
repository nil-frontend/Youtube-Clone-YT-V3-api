import React, { useEffect } from "react";
import "./_videoMetaData.scss";

import moment from "moment";
import numeral from "numeral";
import { MdThumbUp, MdThumbDown } from "react-icons/md";

import { BiLike, BiDislike } from "react-icons/bi";

import { useRef } from "react";
import ShowMoreText from "react-show-more-text";
import { useDispatch, useSelector } from "react-redux";
import { checkSubscriptionStatus, getChannelDetails } from "../../redux/actions/channel.action";
import { useNavigate } from "react-router-dom";
import HelmetCustom from "../HelmetCustom";


// import { RiShareForwardLine } from "react-icons/ri";
// import { HiDotsHorizontal, HiDownload } from "react-icons/hi";

const VideoMetaData = ({video, videId}) => {

  const {channelId, channelTitle, description, title, publishedAt} = video?.snippet || {};
  const {viewCount, likeCount,} = video?.statistics || {};

  const dispatch = useDispatch()

  const {snippet:channelSnippet,statistics:channelStatistics} = useSelector(state=>state.channelDetails?.channel) || {}
  const subscriptionStatus = useSelector(state=>state.channelDetails?.subscriptionStatus)
  const customUrl = channelSnippet?.customUrl

  useEffect(()=>{

    dispatch(getChannelDetails(channelId))
    dispatch(checkSubscriptionStatus(channelId))
  },[dispatch,channelId])

  // const nonlike = document.getElementById("nonlike");
  // const like = document.getElementById("like");
  // const nondislike = document.getElementById("nondislike");
  // const dislike = document.getElementById("dislike");

  // nonlike.addEventListener("click", () => {
  //   nonlike.classList.toggle("none");
  //   like.classList.toggle("none");
  // });

  const nonlikeRef = useRef(null);
  const likeRef = useRef(null);
  const nondislikeRef = useRef(null);
  const dislikeRef = useRef(null);

  const like = () =>{
    if (nonlikeRef.current && likeRef.current && nonlikeRef.current && likeRef.current ){
      nonlikeRef.current.classList.toggle("none");
      likeRef.current.classList.toggle("none");

      nondislikeRef.current.classList.remove("none");
      dislikeRef.current.classList.add("none");

    }
  };

  const dislike = () =>{
    if (nonlikeRef.current && likeRef.current && nonlikeRef.current && likeRef.current){
      nondislikeRef.current.classList.toggle("none");
      dislikeRef.current.classList.toggle("none");

      nonlikeRef.current.classList.remove("none");
      likeRef.current.classList.add("none");
    }
  };

  const navigate= useNavigate();

  const goChannel = () =>{
    navigate(`/channel/${channelId}`)
  };
  const goCustomUrl = () =>{
    navigate(`/${customUrl}/${channelId}`)
  };

  return (
    <div className="videoMetaData py-2">
      <HelmetCustom title={title} description={description} />
      <div className="videoMetaData__top">
        <h2 className="text-yt-white font-semibold mt-3 mb-1 text-lg">
          {title}
        </h2>
        {/* <div className="d-flex justify-content-between align-item-center py-1">
          <span>
            {numeral(10000000).format("0.a")} Views •{" "}
            {moment("2023-05-06").fromNow()}
          </span>

          <div>
            <span className="mr3">
              <MdThumbUp size={26} />
              {numeral(10000000).format("0.a")}
            </span>
            <span className="mr3">
              <MdThumbDown size={26} />
            </span>
          </div>
        </div> */}
      </div>
{/* / */}
      <div className="flex mt-2">
        <div className="flex items-center w-full">
          {/* <div> */}
          <img
            // src={data?.logo}
            // alt={data?.channel}
            src={channelSnippet?.thumbnails?.default?.url}          /*channel icon*/ 
            alt="ch_logo"
            className="rounded-full w-10 h-10 cursor-alias"
            onClick={goCustomUrl}
          />
          <div className="px-3">
            <h3 className="text-yt-white font-medium text-base whitespace-nowrap cursor-pointer" onClick={goChannel}>
              {/* {data?.channel && data?.channel.length <= 25
                ? data?.channel
                : `${data?.channel && data?.channel.substr(0, 20)}...`} */}
                {channelTitle}
            </h3>
            <p className="text-sm text-yt-gray">
              {(numeral(channelStatistics?.subscriberCount).format("0.a")).toUpperCase()} subscribers
              {/* {data?.subscribers}  */}
            </p>
          </div>
          <button className="bg-yt-white px-3 py-2 rounded-3xl text-sm text-yt-black font-medium hover:bg-yt-sub">
            {subscriptionStatus? 'Subscribed' : 'subscribe'}                                                                                  {/*subscribed or not subscription status*/}
          </button>
          {/* </div> */}
          <div className="flex ml-auto">
            <div className="flex bg-yt-light-black items-center rounded-full h-10 mx-1 hover:bg-yt-light-1">
              <div className="likebtn" onClick={like}>
              <div className="flex px-3 items-center border-r-2 border-r-yt-light-1[xnox] border-r-yt-gray cursor-pointer">
                <span ref={nonlikeRef} > <BiLike className="text-yt-white text-2xl" id="nonlike" /> </span>
                <span ref={likeRef} className="none"> <MdThumbUp className="text-yt-white text-2xl" id="like"/> </span>
                <p className="text-yt-white pl-2 pr-3 text-sm font-semibold">
                  {/* 300K */}
                  {(numeral(likeCount).format("0.a")).toUpperCase()}                 {/*//Number of likes👍 in video*/}
                </p>
              </div>
              </div>
              <div className="dislikebtn" onClick={dislike}>
              <div className="cursor-pointer pl-4 pr-5">
                <span ref={nondislikeRef}> <BiDislike className="text-[22px] font-extralight text-yt-white" id="nondislike"/> </span>
                <span ref={dislikeRef} className="none"><MdThumbDown className="text-[22px] font-extralight text-yt-white" id="dislike"/> </span>
              </div>
              </div>
            </div>
            {/* <div className="flex bg-yt-light-black items-center rounded-2xl h-10 mx-1 cursor-pointer hover:bg-yt-light-1">
              <div className="flex px-3 items-center cursor-pointer">
                <RiShareForwardLine className="text-2xl text-yt-white font-thin" />
                <p className="text-yt-white pl-2 pr-3 text-sm font-semibold">
                  Share
                </p>
              </div>
            </div>
            <div className="flex bg-yt-light-black items-center rounded-2xl h-10 mx-1 cursor-pointer hover:bg-yt-light-1">
              <div className="flex px-3 items-center cursor-pointer">
                <HiDownload className="text-2xl text-yt-white font-thin" />
                <p className="text-yt-white pl-2 pr-3 text-sm font-semibold">
                  Download
                </p>
              </div>
            </div> */}

            {/* <div className="flex bg-yt-light-black hover:bg-yt-light-1 cursor-pointer items-center rounded-full justify-center w-10 h-10 text-yt-white">
              <HiDotsHorizontal />
            </div> */}
          </div>
        </div>
      </div>

      {/* <div className="py-3 my-2 videoMetaData__channel d-flex justify-content-between align-items-center">
        <div className="d-flex">
          <img
            src="https://yt3.ggpht.com/yti/AOXPAcXTOeZJLMBFLAvfnXrCl5Yk1vlk7GyiDyvLO_1H=s88-c-k-c0x00ffffff-no-rj"
            alt="ch_logo"
            className="rounded-circle mr-3 w-10 h-10"
          />
          <div className="d-flex flex-column">
            <span>Channel Name</span>
            <span>{numeral(10000000).format("0.a")} Subscribers</span>
          </div>
        </div>
        <button className="btn border-0 p-2 m-2">Subscribe</button>
      </div> */}
{/* / */}
      {/* <div className="max-w-4xl bg-yt-light-black mt-4 rounded-2xl text-sm p-3 text-yt-white"> */}
      <div className="description {max-w-4xl} bg-yt-light-black mt-4 rounded-2xl text-sm p-3 text-yt-white">
        <div className="flex">
          <p className="disVwTm font-medium pr-3">
            {/* {data?.views} */}
            {(numeral(viewCount).format("0.a")).toUpperCase()}  {/*//viewCount*/}
            <span className="disVwTm pl-1 text-xs">Views</span>
          </p>
          <p className="disVwTm font-medium pr-3">
            {/* {data?.uploadTime} */}
            {moment(publishedAt).fromNow()}                   {/*//date*/}
          </p>
        </div>
        <span className="text-left font-medium">
          <ShowMoreText
            lines={2}
            more="more"
            less="show less"
            anchorClass="showMoreText"
            className="cursor-pointer"
            expand={false}
          >
            {description}
          </ShowMoreText>
        </span>
      </div>
{/* / */}
      {/* <div className="videoMetaData__description">
        <ShowMoreText 
        lines={2} 
        more="SHOW MORE"
        less="SHOW LESS"
        anchorClass="showMoreText"
        expand={false}>
          Lorem ipsum,[60] dolor sit amet consectetur adipisicing elit. Quis,
          nostrum. Accusamus consequatur, minima deleniti eum eligendi
          reiciendis dignissimos cum vel facilis placeat vitae facere
          architecto, iure consequuntur exercitationem ducimus libero delectus
          animi. Nemo, accusantium. Odit sint earum rerum tempora, consectetur
          blanditiis nobis? Aliquam consectetur laboriosam architecto cumque
          assumenda tenetur, et doloremque natus iure maxime doloribus quaerat
          recusandae eum. Esse, alias?
        </ShowMoreText>
      </div> */}
    </div>
  );
};

export default VideoMetaData;
