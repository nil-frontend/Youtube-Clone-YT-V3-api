import { CHANNEL_DETAILS_FAIL, CHANNEL_VIDEOS_REQUEST, CHANNEL_VIDEOS_SUCCESS, HOME_VIDEOS_FAIL, HOME_VIDEOS_REQUEST, HOME_VIDEOS_SUCCESS, RELATED_VIDEO_FAIL, RELATED_VIDEO_REQUEST, RELATED_VIDEO_SUCCESS, SEARCH_VIDEO_FAIL, SEARCH_VIDEO_REQUEST, SEARCH_VIDEO_SUCCESS, SELECTED_VIDEO_FAIL, SELECTED_VIDEO_REQUEST, SELECTED_VIDEO_SUCCESS, SUBSCRIPTIONS_CHANNEL_FAIL, SUBSCRIPTIONS_CHANNEL_REQUEST, SUBSCRIPTIONS_CHANNEL_SUCCESS } from "../actionType";
import request from "../../api";
// import { type } from "@testing-library/user-event/dist/type";
// import { type } from "@testing-library/user-event/dist/type";

export const getPopularVideos = () => async (dispatch,getState) => {
  try {

    dispatch({
        type: HOME_VIDEOS_REQUEST,
    })
    const {data} = await request("/videos",{
        params:{
            part:"snippet,contentDetails,statistics",
            chart:"mostPopular",
            regionCode:"IN",
            maxResults:20,
            pageToken: getState().homeVideos.nextPageToken,
        },
    })
    // console.log(res);

    dispatch({
      type: HOME_VIDEOS_SUCCESS,
      payload: {
        videos:data.items,
        nextPageToken: data.nextPageToken,
        category: 'All',
      },
    })
  } catch (error) {
    console.log(error.message);
    dispatch({
      type:HOME_VIDEOS_FAIL,
      payload:error.message,
    })
  }
};


export const getVideosByCategory = keyword => async (dispatch, getState) => {
  try {
     dispatch({
        type: HOME_VIDEOS_REQUEST,
     })
     const { data } = await request('/search', {
        params: {
           part: 'snippet',

           maxResults: 20,
           pageToken: getState().homeVideos.nextPageToken,
           q: keyword,
           type: 'video',
        },
     })

     dispatch({
        type: HOME_VIDEOS_SUCCESS,
        payload: {
           videos: data.items,
           nextPageToken: data.nextPageToken,
           category: keyword,
        },
     })
  } catch (error) {
     console.log(error.message)
     dispatch({
        type: HOME_VIDEOS_FAIL,
        payload: error.message,
     })
  }
}


export const getVideosById = (id) => async dispatch =>{
   try {
      dispatch({
         type:SELECTED_VIDEO_REQUEST,
      })

      const {data} = await request('/videos',{
         params: {
            part:'snippet,statistics',
            id:id,
         },
      })
      dispatch({
         type:SELECTED_VIDEO_SUCCESS,
         payload:data.items[0],
      })
   } catch (error) {
      console.log(error.message);
      dispatch({
         type: SELECTED_VIDEO_FAIL,
         payload: error.message,
      })
   }
};
// export const getRelatedVideos = id => async dispatch =>{
//    try {
//       dispatch({
//          type:RELATED_VIDEO_REQUEST,
//       })

//       const {data} = await request('/search',{
//          params: {
//             part:'snippet',
//             relatedToVideoId:id,
//             maxResults:10,
//             type:'video',
//          },
//       })
//       dispatch({
//          type:RELATED_VIDEO_SUCCESS,
//          payload:data.items,
//       })
//    } catch (error) {
//       console.log(error.response.data.message);
//       dispatch({
//          type: RELATED_VIDEO_FAIL,
//          payload: error.response.data.message,
//       })
//    }
// };





//for relatedVideos which does not exist in ytV3 API(watch screen videos)
export const getWatchPopularVideos = () => async (dispatch,getState) => {
   try {
 
     dispatch({
         type: RELATED_VIDEO_REQUEST,
     })
     const {data} = await request("/videos",{
         params:{
             part:"snippet,contentDetails,statistics",
             chart:"mostPopular",
             regionCode:"IN",
             maxResults:8,
             pageToken: getState().watchRelatedVideos.nextPageToken,
         },
     })
     // console.log(res);
 
     dispatch({
       type: RELATED_VIDEO_SUCCESS,
       payload: {
         videos:data.items,
         nextPageToken: data.nextPageToken,
         category: 'All',
       },
     })
   } catch (error) {
     console.log(error.message);
     dispatch({
       type:RELATED_VIDEO_FAIL,
       payload:error.message,
     })
   }
 };
 
 
 export const getWatchVideosByCategory = keyword => async (dispatch, getState) => {
   try {
      dispatch({
         type: RELATED_VIDEO_REQUEST,
      })
      const { data } = await request('/search', {
         params: {
            part: 'snippet',
 
            maxResults: 10,
            pageToken: getState().watchRelatedVideos.nextPageToken,
            q: keyword,
            type: 'video',
         },
      })
 
      dispatch({
         type: RELATED_VIDEO_SUCCESS,
         payload: {
            videos: data.items,
            nextPageToken: data.nextPageToken,
            category: keyword,
         },
      })
   } catch (error) {
      console.log(error.message)
      dispatch({
         type: RELATED_VIDEO_FAIL,
         payload: error.message,
      })
   }
 }
 


 export const getVideosBySearch = keyword => async (dispatch) => {
   try {
      dispatch({
         type: SEARCH_VIDEO_REQUEST,
      })
      const { data } = await request('/search', {
         params: {
            part: 'snippet',
 
            maxResults: 20,
            q: keyword,
            type: 'video,channel',
         },
      })
 
      dispatch({
         type: SEARCH_VIDEO_SUCCESS,
         payload: data.items,
      })
   } catch (error) {
      console.log(error.message)
      dispatch({
         type: SEARCH_VIDEO_FAIL,
         payload: error.message,
      })
   }
 }










 export const getVideosByChannel = id => async dispatch => {
   try {
      dispatch({
         type: CHANNEL_VIDEOS_REQUEST,
      })

      // 1. get upload playlist id
      const {
         data: { items },
      } = await request('/channels', {
         params: {
            part: 'contentDetails',
            id: id,
         },
      })
      const uploadPlaylistId = items[0].contentDetails.relatedPlaylists.uploads
      // 2. get the videos using the id
      const { data } = await request('/playlistItems', {
         params: {
            part: 'snippet,contentDetails',
            playlistId: uploadPlaylistId,
            maxResults: 40,
         },
      })

      dispatch({
         type: CHANNEL_VIDEOS_SUCCESS,
         payload: data.items,
      })
   } catch (error) {
      console.log(error.response.data.message)
      dispatch({
         type: CHANNEL_DETAILS_FAIL,
         payload: error.response.data,
      })
   }
}



// 1/8/2024
export const getSubscribedChannels = () => async (dispatch, getState) => {
   try {
      dispatch({
         type: SUBSCRIPTIONS_CHANNEL_REQUEST,
      })
      const { data } = await request('/subscriptions', {
         params: {
            part: 'snippet,contentDetails',

            mine: true,
            maxResults: 50,
         },
         headers: {
            Authorization: `Bearer ${getState().auth.accessToken}`,
         },
      })
      dispatch({
         type: SUBSCRIPTIONS_CHANNEL_SUCCESS,
         payload: data.items,
      })
   } catch (error) {
      console.log(error.response.data)
      dispatch({
         type: SUBSCRIPTIONS_CHANNEL_FAIL,
         payload: error.response.data,
      })
   }
}