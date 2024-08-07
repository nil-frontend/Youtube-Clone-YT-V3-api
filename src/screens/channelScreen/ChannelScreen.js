import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Video from "../../components/video/Video";
import {
  checkSubscriptionStatus,
  fetchBanner,
  getChannelDetails,
} from "../../redux/actions/channel.action";
import { getVideosByChannel } from "../../redux/actions/videos.action";
// import { FaEnvelope, FaGlobe, FaUsers, FaPlayCircle, FaChartLine, FaInfoCircle, FaHome } from 'react-icons/fa'; // Import icons from react-icons
import { AiOutlineGlobal, AiOutlinePlaySquare } from "react-icons/ai";
import { RiUserVoiceLine } from "react-icons/ri";
import { IoIosInformationCircleOutline, IoIosTrendingUp } from "react-icons/io";
import { IoEarthOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";

import numeral from "numeral";

import "./channelScreen.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import moment from "moment";
import BottomNavBar from "../../components/bottomNavBar/BottomNavBar";

const ChannelScreen = () => {
  const { channelId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkSubscriptionStatus(channelId));
    dispatch(getVideosByChannel(channelId));
    dispatch(getChannelDetails(channelId));
    dispatch(fetchBanner(channelId));
  }, [dispatch, channelId]);

  const { videos, loading } = useSelector((state) => state.channelVideos) || {};
  const { snippet, statistics } =
    useSelector((state) => state.channelDetails.channel) || {};
    const subscriptionStatus = useSelector(state=>state.channelDetails?.subscriptionStatus);

  const _customUrl = snippet?.customUrl;
  const description = snippet?.description;
  const publishedAt = snippet?.publishedAt;
  const channelCreationTime = moment(publishedAt).format('MMM D YYYY');
  const country = snippet?.country;
  
  const viewCount = statistics?.viewCount;
  const _viewCount = (numeral(viewCount).format("0,0"));
  const subscriberCount = statistics?.subscriberCount;
  const _subscriberCount = (numeral(subscriberCount).format("0.a")).toUpperCase();
  const videoCount = statistics?.videoCount;
  const _videoCount = (numeral(videoCount).format("0,0"));


  const _subscribed = subscriptionStatus && 'subscribedBro'

  const {
    loading: bannerLoading,
    bannerUrl,
    error,
  } = useSelector((state) => state.banner) || {};
  const errorMessage = !bannerUrl? (error?.error?.message):("---Something went wrong in the banner URL Please refresh the page---") ;
  

  const aboutSection = document.querySelector("#aboutSec")
  const toggleAbout = () => {
    aboutSection.classList.toggle("aboutBlock");
  }

  const noBanner = bannerUrl === "" && ("noBanner"); //if the bannerUrl is empty then the class "noBanner" will add to banner section and the banner section will {display none !important[declared in scss file]}(Vanish!)
  return (
    <>
      <Sidebar />
      <BottomNavBar/>
      <div id="channelScreen" className="w-[calc(100%-240px)]  h-[calc(100%-53px)] pt-20  bg-yt-black ml-60 mb-14">
        <div className="flex flex-col relative mt-1">
          <div className={`banner rounded-2xl overflow-hidden ${noBanner}`}>
            <div className="w-full overflow-hidden rounded-2xl">
              <div className="w-full">
                {!bannerLoading ? (
                  <img src={bannerUrl} alt={`${errorMessage}`} />
                ) : (
                  <h1>{/*error*/}</h1>
                )}
              </div>
            </div>
          </div>
          {/* <div className="px-5 py-2 my-2 d-flex justify-content-between align-items-center channelHeader">
            <div className="d-flex align-items-center">
              <img src={snippet?.thumbnails?.default?.url} alt="" />

              <div className="ml-3 channelHeader__details">
                <h3>{snippet?.title}</h3>
                <span>
                  {numeral(statistics?.subscriberCount).format("0.a")}{" "}
                  subscribers
                </span>
              </div>
            </div>

            <button>Subscribe</button>
          </div> */}
          {/* Recreating this channel meta data section */}
          <div id="channelTop" className="flex flex-row items-center py-4">
            <div className="mr-4">
              <div id='befImg' className="rounded-full overflow-hidden m-0.5 w-40 h-40 flex items-center">
                <img src={snippet?.thumbnails?.high?.url} alt="Channel Logo" className="h-full w-full "/>
              </div>
            </div>
            <div className="flex flex-col h-40 w-full justify-between">
              <p id="channelName" className="self-start text-4xl font-bold text-yt-white ">{snippet?.title}</p>
              <div>
                <p>{`${_customUrl} • ${_subscriberCount} subscribers • ${(numeral(videoCount).format("0.a")).toUpperCase()} videos`}</p>
              </div>
              <div className="flex items-center">
                <p className="line-clamp-1 w-2/4 -mr-9">
                  {description}
                </p>
                <p className="font-bold text-yt-white cursor-pointer" onClick={toggleAbout}>...more</p>
              </div>
              <div>
                <button className={` bg-yt-white px-3 py-2 rounded-3xl text-sm text-yt-black font-medium hover:bg-yt-sub ${_subscribed}`}>
                  {subscriptionStatus? 'Subscribed' : 'Subscribe'}                                                                                 {/*// subscribed or not subscription status subscribe */}
                </button>
              </div>
            </div>
          </div>


          <div id="aboutSec" className="fixed bg-yt-light-black text-white p-6 rounded-2xl mr-80 ml-80 z-50 mt-4 mx-[min(3rem)] scale-0">  {/* for using none, it is display none we have to make it toggle on click the cross button*/}
            <div className="w-full flex flex-row mb-4">
            <h2 className="text-2xl font-bold">About</h2>
            <div id="cross" className="ml-auto p-2.5 rounded-full cursor-not-allowed" onClick={toggleAbout}>
              <RxCross1 size={25} className=" ml-auto"/>
            </div>
            </div>
            <div className="h-4/5">
            <p className="mb-2">
              {/* "Hey Everyone! This is Ujjwal here! Welcome to "Techno Gamerz"
              YouTube Channel! I created this channel for android games i upload
              daily videos about mobile related games and gaming news so if
              you’re interested in playing games so this channel is helpful for
              you. Please SUBSCRIBE to Techno Gamerz, Thanks. If you are looking
              for somebody to make a review of your products or product of your
              company, such as: phones, tablets, PC, gadgets or even apps, you
              can contact us so we can make a deal... For Business enquiries:
              technogamerzofficial@gmail.com" */}
              {description}
            </p>
            <h3 className="text-xl font-bold mb-4">Channel details</h3>

            <div className="flex items-center mb-3">
              <AiOutlineGlobal className="ico" />
              <a
                className="hover:underline"
                href={`https://www.youtube.com/${_customUrl}`} target="main"
              >
                www.youtube.com/{_customUrl}
              </a>
            </div>
            <div className="flex items-center mb-3">
              <RiUserVoiceLine className="ico" />
              <p>{_subscriberCount} subscribers</p>
            </div>
            <div className="flex items-center mb-3">
              <AiOutlinePlaySquare className="ico" />
              <p>{_videoCount} videos</p>
            </div>
            <div className="flex items-center mb-3">
              <IoIosTrendingUp className="ico" />
              <p>{_viewCount} views</p>
            </div>
            <div className="flex items-center mb-3">
              <IoIosInformationCircleOutline className="ico" />
              <p>Joined {channelCreationTime}</p>
            </div>
            <div className="flex items-center mb-3">
              <IoEarthOutline className="ico" />
              <p>{country}</p>
            </div>
          </div>
          </div>
        </div>
<hr></hr>
        <Container>
          <Row className="mt-4">
            {!loading
              ? videos?.map((video) => (
                  <Col md={3} lg={3}>
                    <Video video={video} channelScreen />
                  </Col>
                ))
              : [...Array(16)].map(() => (
                  <Col md={3} lg={3}>
                    <SkeletonTheme color="#343a40" highlightColor="#3c4147">
                      <Skeleton width="100%" height="140px" />
                    </SkeletonTheme>
                  </Col>
                ))}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ChannelScreen;
