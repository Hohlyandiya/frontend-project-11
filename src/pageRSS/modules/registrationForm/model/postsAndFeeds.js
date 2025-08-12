import renderPosts from '../view/renderPosts'
import renderFeeds from '../view/renderFeeds'
import getDataRSSChanel from '../api/getDataRSSChanel'
import parseData from '../helpers/parseData'
import buildSubscrip from '../helpers/buildSubscrip'
import { getSubscriptionsContents } from './registrationForm'

export const listbuildsSubscriptions = (listSubscriptions) => {
  const listbuildsSubscriptions = listSubscriptions
    .map(subscripUrl => getDataRSSChanel(subscripUrl)
      .then(response => parseData(response))
      .then(parseDOM => buildSubscrip(parseDOM, subscripUrl)))
  return Promise.all(listbuildsSubscriptions)
}

export const addNewFeedAndPosts = () => {
  const { feeds, posts } = getSubscriptionsContents()
  const ulListGroup = document.querySelectorAll('.list-group')
  ulListGroup.forEach(listGroup => listGroup.replaceChildren(''))
  feeds.forEach(feed => renderFeeds(feed))
  posts.forEach(post => renderPosts(post))
}
