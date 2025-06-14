import onChange from 'on-change'
import renderFeeds from '../../../view/renderFeeds'
import rendertitlePosts from '../../../view/renderTitlePosts'
import renderPosts from '../../../view/renderPosts'
import renderTitleFeeds from '../../../view/renderTitleFeeds'

export const changesHistory = (state) => {
  const { feeds, posts } = state
  if (feeds.length === 1) {
    rendertitlePosts()
    renderTitleFeeds()
  }
  const ulListGroup = document.querySelectorAll('.list-group')
  ulListGroup.forEach(listGroup => listGroup.replaceChildren(''))
  feeds.forEach(feed => renderFeeds(feed))
  posts.forEach(post => renderPosts(post))
  return
}

export default changesHistory