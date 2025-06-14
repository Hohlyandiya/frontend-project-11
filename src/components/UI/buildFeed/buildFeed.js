import { uniqueId } from 'lodash'

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

const getPosts = (treeRSS, idFeed) => {
  const items = treeRSS.querySelectorAll('item')
  const itemsArray = Array.from(items)
  const listDataPosts = itemsArray.map((item) => {
    const link = item.querySelector('link').innerHTML
    const id = uniqueId()
    const result = getData(item)
    return { id, idFeed, link, ...result }
  })

  return listDataPosts
}

const getFeed = (treeRSS) => {
  const id = uniqueId()
  const result = getData(treeRSS)
  return { id, ...result }
}

const buildFeed = (response) => {
  const feed = getFeed(response)
  const posts = getPosts(response, feed.id)
  const buildFeed = {
    feed,
    posts,
  }
  return buildFeed
}

export default buildFeed

