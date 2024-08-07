import { applyMiddleware, combineReducers } from 'redux'
import { legacy_createStore as createStore} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { authReducer } from './reducers/auth.reducer'

import {
   homeVideosReducer,
   // relatedVideoReducer,
   watchRelatedVideosReducer,
   searchedVideosReducer,
//    subscriptionsChannelReducer,
   channelVideosReducer,
   subscriptionsChannelReducer,
} from './reducers/videos.reducer'
// import { selectedVideoReducer } from './reducers/videos.reducer'
// import { channelDetailsReducer } from './reducers/channel.reducer'
// import { commentListReducer } from './reducers/comments.reducer'

import { selectedVideoReducer } from './reducers/videos.reducer'
import { bannerReducer, channelDetailsReducer } from './reducers/channel.reducer'
// import { commentListReducer } from './reducers/comments.reducer'
import { commentListReducer } from './reducers/comments.reducer'



const rootReducer = combineReducers({
    auth: authReducer,
    homeVideos: homeVideosReducer,
    selectedVideo:selectedVideoReducer,
    channelDetails:channelDetailsReducer,
    commentList:commentListReducer,
    // selectedVideo: selectedVideoReducer,
    // channelDetails: channelDetailsReducer,
    //  commentList: commentListReducer,
   //  relatedVideos: relatedVideoReducer,*
    searchedVideos: searchedVideosReducer,
    // subscriptionsChannel: subscriptionsChannelReducer,
 
    channelVideos: channelVideosReducer,
    //for watch relatedVideos
    watchRelatedVideos:watchRelatedVideosReducer,
    //for channel banner img
    banner:bannerReducer,
// 1/8/2024(last day before deploy this project)
    subscriptionsChannel: subscriptionsChannelReducer,
 })
 
 const store = createStore(
    rootReducer,
    {},
    composeWithDevTools(applyMiddleware(thunk))
 )
 
 export default store