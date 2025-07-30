// @js-check

import getDataRSSChanel from '../api/getDataRSSChanel'
import { addNewPost, getSubscriptionList, getSubscriptionsContents } from '../model/registrationForm'
import { getPosts } from './buildSubscrip'
import parseData from './parseData'

const getNewPosts = (url) => {
  return getDataRSSChanel(url)
    .then((response) => {
      const { feeds } = getSubscriptionsContents()
      const [feed] = feeds.filter(feed => feed.url === url)
      const idFeed = feed.id
      const parseDOM = parseData(response)
      return getPosts(parseDOM, idFeed)
    })
}

const updatePosts = (subscriptionList) => {
  setTimeout(() => {
    const numberCurrentSubscriptions = getSubscriptionList().length
    if (subscriptionList.length !== numberCurrentSubscriptions) {
      return
    }
    const subscriptions = getSubscriptionList()
    const allListPosts = subscriptions.map(url => getNewPosts(url))
    Promise.all(allListPosts)
      .then((result) => {
        const { posts } = getSubscriptionsContents()
        const [allPost] = result
        const timeCreateNewPosts = allPost.map(post => post.timeCreatePost)
        const lastNewPost = Math.max(...timeCreateNewPosts)
        const timeCreatePosts = posts.map(post => post.timeCreatePost)
        const lastPost = Math.max(...timeCreatePosts)
        const [newPost] = allPost.filter(post => post.timeCreatePost === lastNewPost)
        if (lastNewPost !== lastPost) {
          addNewPost(newPost)
        }
      })
    updatePosts(subscriptionList)
  }, 5000)
}

export default updatePosts