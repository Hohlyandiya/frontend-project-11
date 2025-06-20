import getDataRSSChanel from '../api/getDataRSSChanel'
import handleSubscriptions from '../model/postsAndFeeds'
import { getSubscriptionList, getSubscriptionsContents } from '../model/registrationForm'
import { getPosts } from './buildSubscrip'
import parseData from './parseData'

const findNewPost = (subscrip) => {
  return getDataRSSChanel(subscrip)
    .then((response) => {
      const { feeds, posts } = getSubscriptionsContents()
      const parseDOM = parseData(response)
      const test = getPosts()
      console.log(parseDOM)
    })
}

const updatePosts = (subscriptionList) => {
  const numberCurrentSubscriptions = getSubscriptionList().length
  if (subscriptionList.length !== numberCurrentSubscriptions) {
    return
  }
  const subscriptions = getSubscriptionList()
  subscriptions.map((subscrip) => {
    findNewPost(subscrip)
  })

  //handleSubscriptions(subscriptionList)
  setTimeout(() => {
    updatePosts(subscriptionList)
  }, 5000)
}

export default updatePosts