import axios from 'axios'
// console.log(process.env.REACT_APP_YT_API_KEY)
const request = axios.create({
    baseURL: 'https://youtube.googleapis.com/youtube/v3/',
    params:{
        key:"AIzaSyD6V56vqW3R3EkX3sYffsftyTsVFR0nsUY",
    },
})

export default request