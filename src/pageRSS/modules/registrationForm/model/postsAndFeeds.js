import renderPosts from '../view/renderPosts'
import renderFeeds from '../view/renderFeeds'
import getDataRSSChanel from '../api/getDataRSSChanel'
import parseData from '../helpers/parseData'
import buildSubscrip from '../helpers/buildSubscrip'

const listbuildsSubscriptions = (listSubscriptions) => {
  const listbuildsSubscriptions = listSubscriptions
    .map(subscripUrl => getDataRSSChanel(subscripUrl)
      .then(response => parseData(response))
      .then(parseDOM => buildSubscrip(parseDOM, subscripUrl)))
  return Promise.all(listbuildsSubscriptions)
}

export const handleSubscriptions = (listSubscriptions) => {
  return listbuildsSubscriptions(listSubscriptions)
    .then((result) => {
      const ulListGroup = document.querySelectorAll('.list-group')
      ulListGroup.forEach(listGroup => listGroup.replaceChildren(''))
      result.forEach((dataSubscriptions) => {
        const { feed, posts } = dataSubscriptions
        renderFeeds(feed)
        posts.forEach(post => renderPosts(post))
      })
    })
}

export default handleSubscriptions