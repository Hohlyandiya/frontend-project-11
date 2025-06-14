import axios from 'axios'

const requestRSS = (url) => {
  return axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`)
    .then((response) => {
      const tree = new DOMParser()
      return tree.parseFromString(response.data.contents, 'text/xml')
    })
    .catch(e => e)
}

export default requestRSS