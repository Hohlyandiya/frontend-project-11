// @ts-check

import axios from 'axios'

const getDataRSSChanel = (url) => {
  return axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`)
    .then(response => response)
    .catch(e => e)
}

export default getDataRSSChanel