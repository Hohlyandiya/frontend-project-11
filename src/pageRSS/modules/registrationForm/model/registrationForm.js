import * as yup from 'yup'
import onChange from 'on-change'
import i18next from 'i18next'
import resources from '../../../../locales/index'
import renderError from '../view/renderError'
import renderValid from '../view/renderValid'
import getDataRSSChanel from '../api/getDataRSSChanel'
import updatePosts from '../helpers/updatePosts'
import rendertitlePosts from '../view/renderTitlePosts'
import renderTitleFeeds from '../view/renderTitleFeeds'
import { addNewFeedAndPosts, listbuildsSubscriptions } from './postsAndFeeds'
import { uniqueId, sortBy } from 'lodash'
import parseData from '../helpers/parseData'

const defaultLanguage = 'ru'
const i18nInstance = i18next.createInstance()
i18nInstance.init({
  lng: defaultLanguage,
  debug: false,
  resources,
})

const defaultState = {
  valid: true,
  fieldsForm: {
    url: '',
  },
  subscriptionList: [],
  subscriptionsContents: {
    feeds: [],
    posts: [],
  },
}

const feedbackStatus = {
  errors: {
    errInvalid: 'form.errors.errInvalid',
    errRepeat: 'form.errors.errRepeat',
    errInvalidRSS: 'form.errors.errInvalidRSS',
    errNetwork: 'form.errors.errNetwork',
  },
  statusValid: {
    rssValid: 'form.rssValid',
  },
}

const schema = yup.object().shape({
  url: yup.string().url(),
})

const checkValidForm = (fieldsForm) => {
  return schema.validate(fieldsForm)
    .then(response => response.url)
    .catch(() => {
      throw new Error('errInvalid')
    })
}

const state = onChange(defaultState.fieldsForm, () => {
  Promise.all([checkValidForm(state), getDataRSSChanel(state.url)])
    .then((values) => {
      const [url, data] = values
      const { subscriptionList } = defaultState
      if (subscriptionList.includes(url)) {
        throw new Error('errRepeat')
      }
      parseData(data)
      const textContent = i18nInstance.t(feedbackStatus.statusValid.rssValid)
      defaultState.fieldsForm.url = ''
      defaultState.subscriptionList = [...subscriptionList, url]
      renderValid(textContent)
      if (defaultState.subscriptionList.length === 1) {
        rendertitlePosts()
        renderTitleFeeds()
      }
      listbuildsSubscriptions(defaultState.subscriptionList)
        .then(() => addNewFeedAndPosts())
      updatePosts(defaultState.subscriptionList)
    })
    .catch((error) => {
      const textContent = i18nInstance.t(feedbackStatus.errors[error.message])
      renderError(textContent)
    })
})

const subscriptionsContents = onChange(defaultState.subscriptionsContents, () => {
  addNewFeedAndPosts()
})

export const getValidForm = () => defaultState.valid

export const getUrlForm = () => state.url

export const setValidForm = (value) => {
  defaultState.valid = value
}

export const setUrlForm = (value) => {
  state.url = value
}

export const getSubscriptionList = () => defaultState.subscriptionList

export const getNumberPosts = () => defaultState.subscriptionsContents.posts.length

export const addSubscriptionsContents = (subscriptionContents) => {
  const { feeds, posts } = defaultState.subscriptionsContents
  defaultState.subscriptionsContents.feeds = [...feeds, subscriptionContents.feed]
  defaultState.subscriptionsContents.posts = [...posts, ...subscriptionContents.posts]
}

export const getSubscriptionsContents = () => defaultState.subscriptionsContents

export const addNewPost = (post) => {
  const { posts } = defaultState.subscriptionsContents
  const id = uniqueId()
  const newPost = { id, ...post }
  subscriptionsContents.posts = [newPost, ...posts]
}

export const getPost = (id) => {
  const [targetPost] = subscriptionsContents.posts.filter(post => post.id === id)
  return targetPost
}

export const setReadPost = (id) => {
  const { posts } = defaultState.subscriptionsContents
  const [targetPost] = posts.filter(post => post.id === id)
  const restPosts = posts.filter(post => post.id !== id)
  targetPost.isPostRead = true
  const result = sortBy([targetPost, ...restPosts], 'timeCreatePost').reverse()
  subscriptionsContents.posts = result
}