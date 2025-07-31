import axios from 'axios'
import parseData from '../helpers/parseData'

const getDataRSSChanel = (url) => {
  return axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`)
    .then(response => {
      console.log(response)
      return response
    })
    .catch(e => e)
}

export default getDataRSSChanel