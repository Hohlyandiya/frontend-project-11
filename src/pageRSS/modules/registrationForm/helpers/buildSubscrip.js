// @ts-check

import { uniqueId } from 'lodash'
import { addSubscriptionsContents } from '../model/registrationForm'

const getData = (element) => {
  const beginContent = 9
  const endContent = -3
  const title = element.querySelector('title')
  const description = element.querySelector('description')
  const titleContent = title.innerHTML.slice(beginContent, endContent)
  const descriptionContent = description.innerHTML.slice(beginContent, endContent)
  return {
    title: titleContent,
    description: descriptionContent,
  }
}

export const getPosts = (treeRSS, idFeed) => {
  const items = treeRSS.querySelectorAll('item')
  const itemsArray = Array.from(items)
  const listDataPosts = itemsArray.map((item) => {
    const link = item.querySelector('link').innerHTML
    const dateCreatePost = item.querySelector('pubDate').textContent
    const timeCreatePost = new Date(dateCreatePost).getTime()
    const isPostRead = false
    const result = getData(item)
    return { idFeed, link, timeCreatePost, isPostRead, ...result }
  })

  return listDataPosts
}

const getFeed = (treeRSS, url) => {
  const id = uniqueId()
  const result = getData(treeRSS)
  return { id, url, ...result }
}

const setId = (post) => {
  const id = uniqueId()
  return { id, ...post }
}

const buildSubscrip = (response, url) => {
  const feed = getFeed(response, url)
  const posts = getPosts(response, feed.id)
    .map(post => setId(post))
  const result = {
    feed,
    posts,
  }
  addSubscriptionsContents(result)
}

export default buildSubscrip

