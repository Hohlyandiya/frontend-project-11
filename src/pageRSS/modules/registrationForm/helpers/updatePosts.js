import handleSubscriptions from '../model/postsAndFeeds'
import { getSubscriptionList } from '../model/registrationForm'

const updatePosts = (subscriptionList) => {
  const numberCurrentSubscriptions = getSubscriptionList().length
  if (subscriptionList.length !== numberCurrentSubscriptions) {
    return
  }
  handleSubscriptions(subscriptionList)
  setTimeout(() => {
    updatePosts(subscriptionList)
  }, 5000)
}

export default updatePosts