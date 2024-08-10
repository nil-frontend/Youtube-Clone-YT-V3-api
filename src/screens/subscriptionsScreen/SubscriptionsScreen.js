import React, { useEffect } from "react";
import "./subscriptions.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getSubscribedChannels } from "../../redux/actions/videos.action";
import SearchVideos from "../../components/searchVideos/SearchVideos";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import BottomNavBar from "../../components/bottomNavBar/BottomNavBar";

function SubscriptionsScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSubscribedChannels());
  }, [dispatch]);

  const { loading, videos,error } = useSelector(
    (state) => state.subscriptionsChannel
  ) || {};
  return (
    <>
      <Sidebar activeElement={"Subscriptions"} />
      <BottomNavBar/>
      {!error?(
      <div id="subscriptions" className="w-[calc(100%-240px)]  h-[calc(100%-53px)] pt-20  bg-yt-black ml-60 mb-14">
      {!loading ? (
            videos?.map(video => (
               <SearchVideos video={video} key={video.id} subScreen />
            ))
         ) : (
            <SkeletonTheme color='#343a40' highlightColor='#3c4147'>
               <Skeleton width='100%' height='160px' count={20} />
            </SkeletonTheme>
         )}
      </div>
      ):(
        <div id="subscriptions" className="w-[calc(100%-240px)]  h-[calc(100%-53px)] pl-4 pt-20  bg-yt-black ml-60">
          <p>
          {error.error.code === 401 ? (
            <>
            To see Subscriptions section, Please Refresh the Page or ReLogin! 
            <br/>
            Or you can Explore Other Section!
            <br/>
            <br/>
            Steps to ReLogin:
            <ol>
              <li>1. Go to the menu bar on the left side or bottom</li>
              <li>2. Click on the "Log Out" button (You have successfully logout)</li>
              <li>3. Click on the login button and SignIn with your google account</li>
              <li>4. Come to this page again and refresh/reload the page again...</li>
            </ol>
            </>
          ):(
          <p>Some Thing Went Wrong <br/> Come Back Later...</p>
          )}

            <br/><hr/> <br/>

            Error: <br/>
            error code: {`${error.error.code}`} <br/>
            user status: {`${error.error.status || "You Reached Your Daily Request Limit ☹"}`} <br/>
            Reason: {`${error.error.errors[0].reason}`} <br/>
            error message: {`${error.error.errors[0].message}`} <br/>

          </p>
        </div>
      )
      }
      
    </>
  );
}

export default SubscriptionsScreen;
