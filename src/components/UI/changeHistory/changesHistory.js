import onChange from 'on-change'
import renderFeeds from '../../../view/renderFeeds'
import rendertitlePosts from '../../../view/renderTitlePosts'
import renderPosts from '../../../view/renderPosts'
import renderTitleFeeds from '../../../view/renderTitleFeeds'

const addNewFeed = (state, newFeed) => {
  const { feeds, posts } = state
  console.log('begin')
  const test = [...feeds, ...newFeed.feed]
  console.log(test)
  posts = [posts, ...newFeed.posts]
  return 0
}

const changesHistory = (newFeed) => {
  const initialState = {
    feeds: [],
    posts: [],
  }

  const state = onChange(initialState, () => {
    const { feeds, posts } = state
    if (feeds.length === 1) {
      //rendertitlePosts()
      renderTitleFeeds()
    }
    feeds.forEach(feed => renderFeeds(feed))
    //posts.forEach(post => renderPosts(post))
    return
  })

  console.log(state)

  state.feeds = [...state.feeds, ...newFeed.feed]
  //state.posts = [...state.feeds, ...newFeed.feed]
  console.log(state)
}

export default changesHistory