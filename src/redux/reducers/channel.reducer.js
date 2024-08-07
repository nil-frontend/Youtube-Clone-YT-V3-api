import { CHANNEL_DETAILS_FAIL, CHANNEL_DETAILS_REQUEST, CHANNEL_DETAILS_SUCCESS, FETCH_BANNER_FAILURE, FETCH_BANNER_REQUEST, FETCH_BANNER_SUCCESS, SET_SUBSCRIPTION_STATUS } from "../actionType"

export const channelDetailsReducer = (
    state={
       loading:true,
       channel:{},
       subscriptionStatus: false,
    },
 action
 ) =>{
    const{ payload, type} = action
    switch (type){
       case CHANNEL_DETAILS_REQUEST:
          return{
             ...state,
             loading:true,
          }
       case CHANNEL_DETAILS_SUCCESS:
          return{
             ...state,
             channel:payload,
             loading:false,
             
          }   
       case CHANNEL_DETAILS_FAIL:
          return{
             ...state,
            //  channel:null,
             loading:false,
             error:payload,
            }   
            case SET_SUBSCRIPTION_STATUS:
            return {
            ...state,
            subscriptionStatus:payload
            }
       default:
          return state
    }
 }


 //for channel banner img
 export const bannerReducer = (
   state = {
     loading: true,
     bannerUrl: '',
     error: '',
   },
   action
 ) => {
   const { payload, type } = action;
   switch (type) {
     case FETCH_BANNER_REQUEST:
       return {
         ...state,
         loading: true,
       };
     case FETCH_BANNER_SUCCESS:
       return {
         ...state,
         bannerUrl: payload,
         loading: false,
       };
     case FETCH_BANNER_FAILURE:
       return {
         ...state,
         bannerUrl: '',
         loading: false,
         error: payload,
       };
     default:
       return state;
   }
 };