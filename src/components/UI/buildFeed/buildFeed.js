import { uniqueId } from 'lodash'

const getTitleAndDescriptions = (element) => {
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
  const listTitlesAndDescriptions = itemsArray.map((item) => {
    const id = uniqueId()
    const result = getTitleAndDescriptions(item)
    return { id, idFeed, ...result }
  })
  return listTitlesAndDescriptions
}

const getFeed = (treeRSS) => {
  const id = uniqueId()
  const result = getTitleAndDescriptions(treeRSS)
  return [{ id, ...result }]
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

