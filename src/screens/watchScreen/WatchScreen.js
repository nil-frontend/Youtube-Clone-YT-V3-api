import React, { useEffect } from "react";
import "./_watchScreen.scss";
// import Sidebar from "../../components/sidebar/Sidebar";
import { Col, Row } from "react-bootstrap";
import VideoMetaData from "../../components/videoMetaData/VideoMetaData";
import Comments from "../../components/comments/Comments";
import VideoHorizontal from "../../components/videoHorizontal/VideoHorizontal";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { 
  // getPopularVideos, 
  // getRelatedVideos,
  //  getVideosByCategory,
    getVideosById, 
   getWatchPopularVideos,
   getWatchVideosByCategory} from "../../redux/actions/videos.action";
import WatchCatagoriesBar from "../../components/catagoriesBar/WatchCatagoriesBar";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "react-loading-skeleton";
import { Helmet } from "react-helmet";


const WatchScreen = () => {

  const {id} = useParams()
  const dispatch = useDispatch()

  useEffect(() =>{
    dispatch(getVideosById(id));

    // dispatch(getRelatedVideos(id))
  },[dispatch,id])

  const {video,loading} = useSelector(state=>state.selectedVideo)

// ////////////////////////////////////
//   //For category bar
//   // const dispatch = useDispatch()
//   useEffect(() => {
//     dispatch(getPopularVideos()) //here in getPopularVideos i don't pass it () and not showing the data in console 😂
//   }, [dispatch])
  

// //  const {videos, activeCategory } = useSelector(state=>state.homeVideos)
// const {videos, activeCategory, loading:relatedVideoLoading } = useSelector(state=>state.homeVideos)


//  //
//  useEffect(() => {
//   dispatch(getVideosByCategory(activeCategory))   //ihave only change this! created this!
//  },[dispatch, activeCategory])
//  //
 
//  const fetchData = () => {
//   if (activeCategory === 'All') dispatch(getPopularVideos())
//   else{
//     dispatch(getVideosByCategory(activeCategory))
//   }
  
//  }
// ///////////////////////////////////////



  //For category bar in watch screen--
  // const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getWatchPopularVideos()) //here in getPopularVideos i don't pass it () and not showing the data in console 😂
  }, [dispatch])
  

//  const {videos, activeCategory } = useSelector(state=>state.homeVideos)
const {videos, activeCategory, loading:relatedVideoLoading } = useSelector(state=>state.watchRelatedVideos)


 //
 useEffect(() => {
  dispatch(getWatchVideosByCategory(activeCategory))   //ihave only change this! created this!
 },[dispatch, activeCategory])
 //
 
 const fetchData = () => {
  if (activeCategory === 'All') dispatch(getWatchPopularVideos())
  else{
    dispatch(getWatchVideosByCategory(activeCategory))
  }
  
 }

  return (
    <>
      {/* <Sidebar /> */}
      <Row id="row">
        <Helmet>
          <title>{video?.snippet?.title}</title>
        </Helmet>
        <Col lg={8}>
          <div className="watchScreen_player">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${id}`}
              title={video?.snippet?.title}
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen   //it will not work because it is in html format you have to convert it into jsx it will be "allowFullScreen"
              allowFullScreen
            ></iframe>
          </div>
          {!loading ? (
            <VideoMetaData video={video} videoId={id} />
          ) : (
            <h6>Loading...</h6>
          )}
          <Comments videoId={id} totalComments = {video?.statistics?.commentCount} />
        </Col>
        <Col lg={4}>
        <WatchCatagoriesBar video={video} />

        <InfiniteScroll
        className=' flex flex-wrap'
        dataLength={videos.length}
        next={fetchData}
        hasMore={true}
        loader={
          <div className='spinner-border text-secondary d-block mx-auto'></div>
        }
        >
            {!relatedVideoLoading
            ?videos.map((video) => (
                <VideoHorizontal video={video} key={video.id} />
            ))
          :
          // ( <h5>Loading..!</h5> )
          <Skeleton width='98%' height='130px' count={15}/>
          }

        </InfiniteScroll>
        </Col>
      </Row>
    </>
  );
};

export default WatchScreen;













