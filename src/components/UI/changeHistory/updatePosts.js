import requestRSS from '../../requestRSS/requestRSS'

const updatePosts = (data) => {
  //while (requestRSS(data.feeds) !== )
  const feeds = data.feeds
  feeds.forEach((feed) => {
    const url = feed.url
    requestRSS(url)
      .then(response => console.log(response))
  })
}

export default updatePosts