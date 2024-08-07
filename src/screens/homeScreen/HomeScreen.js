import React, { useEffect } from 'react'
import './home.scss'
// import { Col, Container, Row } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
import CatagoriesBar from '../../components/catagoriesBar/CatagoriesBar'
import Video from '../../components/video/Video'
import Sidebar from '../../components/sidebar/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { getPopularVideos, getVideosByCategory,  } from '../../redux/actions/videos.action'
// import { CategoryItems } from '../../static/data'

import InfiniteScroll from 'react-infinite-scroll-component'
// import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import SkeletonVideo from '../../components/skeletons/SkeletonVideo'
import BottomNavBar from '../../components/bottomNavBar/BottomNavBar'



const HomeScreen = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getPopularVideos()) //here in getPopularVideos i don't pass it () and not showing the data in console 😂
  }, [dispatch])
  

//  const {videos, activeCategory } = useSelector(state=>state.homeVideos)
const {videos, activeCategory, loading } = useSelector(state=>state.homeVideos)

 const fetchData = () => {
  if (activeCategory === 'All') dispatch(getPopularVideos())
  else{
    dispatch(getVideosByCategory(activeCategory))
  }
  
 }
  

  return (
    <>
    <Sidebar/>
    <BottomNavBar/>
      <div id='homeScreen' className="w-[calc(100%-240px)]  h-[calc(100%-53px)] pt-20  bg-yt-black ml-60">
        {/* <div className=' fixed z-10 top-16 pt-2 bg-yt-black'> */}
        <CatagoriesBar />
        {/* </div> */}
        {/* <div className="flex flex-row px-3 overflow-x-scroll relative scrollbar-hide ">
        {CategoryItems.map((item, i) => (
            <h2
              className="text-yt-white font-normal text-sm py-2 px-4 break-keep whitespace-nowrap bg-yt-light mr-3 cursor-pointer rounded-lg hover:bg-yt-light-1 focus:bg-yt-white active:bg-yt-white"
              key={i}
            >
              {item}
            </h2>
          ))}
        </div> */}
        {/* <div className="pt-3 pl-2 pr-0 flex flex-wrap grid-cols-yt  gap-y-4"> */}
        
        <InfiniteScroll
        className='infinite flex flex-wrap pl-1 mt-4 mr-4'
        dataLength={videos.length}
        next={fetchData}
        hasMore={true}
        loader={
          <div className='spinner-border text-secondary d-block mx-auto'></div>
        }
        >


          {!loading
          ?videos.map((video) => (
          <Col lg={3} md={4}>
            <Video video={video} key={video.id} />
          </Col>
        ))
      :
      // (<h1>loading</h1>)
      [...Array(20)].map(() => (
        <Col lg={3} md={4}>
          {/* <Skeleton height={180} width='100%'/> */}
          <SkeletonVideo/>
        </Col>
      ))
      }
        </InfiniteScroll>
        {/* </div> */}


         {/* {
            // videos.length ===0 ? (
            //   <div className="h-[86vh]"></div>
            // ) : (
            //   videos.map((video, i)=>(
            //     <Link to={`/video/${video.id}`} key={video.id}>
            //       <Video {...video} />
            //     </Link>
            //   ))
            // )
          } */}
        
      </div>
    </>

    // <Container>
    //   <Catagories />
    //   <Row className='mr-14'>
    //     {[...new Array(20)].map(() => (
    //       <Col lg={3} md={4}>
    //         <Video />
    //       </Col>
    //     ))}
    //   </Row>
    // </Container>
  )
}

export default HomeScreen
