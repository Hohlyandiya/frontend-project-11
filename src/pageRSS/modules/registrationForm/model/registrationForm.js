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

const schema = yup.object().shape({
  url: yup.string().url(),
})

const checkValidForm = (fieldsForm) => {
  return schema.validate(fieldsForm)
    .then(() => true)
    .catch(e => false)
}

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

const addSubscription = (url) => {
  const { subscriptionList } = defaultState
  defaultState.subscriptionList = [...subscriptionList, url]
}

const checkUrl = (url) => {
  return getDataRSSChanel(url)
    .then((response) => {
      const { subscriptionList } = defaultState
      if (subscriptionList.includes(url)) {
        const textContent = i18nInstance.t(feedbackStatus.errors.errRepeat)
        renderError(textContent)
        return
      }
      if (response.data.status.http_code === 404) {
        const textContent = i18nInstance.t(feedbackStatus.errors.errInvalidRSS)
        renderError(textContent)
        return
      }
      const textContent = i18nInstance.t(feedbackStatus.statusValid.rssValid)
      defaultState.fieldsForm.url = ''
      addSubscription(url)
      renderValid(textContent)
    })
    .catch((e) => {
      const textContent = i18nInstance.t(feedbackStatus.errors.errNetwork)
      renderError(textContent)
    })
}

const state = onChange(defaultState.fieldsForm, () => {
  checkValidForm(state)
    .then((result) => {
      if (result) {
        checkUrl(state.url)
          .then(() => {
            const { subscriptionList } = defaultState
            if (subscriptionList.length === 1) {
              rendertitlePosts()
              renderTitleFeeds()
            }
            updatePosts(subscriptionList)
          })
        return
      }
      renderError(i18nInstance.t(feedbackStatus.errors.errInvalid))
    })
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

export const addNewPost = (idFeed, newPost) => {
  const { posts } = defaultState.subscriptionsContents
  const postsFeed = posts
    .filter(post => Object.hasOwn(post, idFeed))
    .map(post => post.timeCreatePost)
  const lastPost = Math.min(postsFeed)
  console.log(lastPost)
}