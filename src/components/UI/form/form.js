/* import * as yup from 'yup'
import onChange from 'on-change'
import renderError from '../../../view/renderError'
import renderValid from '../../../view/renderValid'
import i18next from 'i18next'
import resources from '../../../locales/index'
import requestRSS from '../../requestRSS/requestRSS'
import buildFeed from '../buildFeed/buildFeed'
import changesHistory from '../changeHistory/changesHistory'
import updatePosts from '../changeHistory/updatePosts'

yup.setLocale({
  string: {
    url: () => ({ key: 'errInvalid' }),
  },
})

const schema = yup.object().shape({
  url: yup.string().url(),
})

const validate = (fields) => {
  const promise = schema.validate(fields)
    .then(() => 'rssValid')
    .catch(e => e.message.key)
  return promise
}

const checkValidForm = () => {
  const defaultLanguage = 'ru'

  const i18nInstance = i18next.createInstance()
  i18nInstance.init({
    lng: defaultLanguage,
    debug: false,
    resources,
  })

  const elements = {
    urlInput: document.querySelector('#url-input'),
    formSubmit: document.querySelector('.rss-form'),
    feedback: document.querySelector('.feedback'),
  }

  const initialState = {
    valid: true,
    form: {
      url: '',
    },
    statusFeedback: {
      errors: {
        errInvalid: 'form.errors.errInvalid',
        errRepeat: 'form.errors.errRepeat',
        errInvalidRSS: 'form.errors.errInvalidRSS',
        errNetwork: 'form.errors.errNetwork',
      },
      statusValid: {
        rssValid: 'form.rssValid',
      },
      activeStatus: '',
    },
    feeds: [],
    posts: [],
  }

  const state = onChange(initialState, () => {
    if (!state.valid) {
      renderError(elements.urlInput, elements.feedback, i18nInstance.t(state.statusFeedback.activeStatus))
      return
    }
    renderValid(elements.urlInput, elements.feedback, i18nInstance.t(state.statusFeedback.activeStatus))
  })

  elements.urlInput.addEventListener('change', (e) => {
    state.form.url = e.target.value.trim()
  })

  elements.formSubmit.addEventListener('submit', (e) => {
    e.preventDefault()
    new Promise((resolve, reject) => {
      const response = validate(state.form)
      resolve(response)
    })
      .then((response) => {
        if (Object.hasOwn(state.statusFeedback.errors, response)) {
          throw new Error(response)
        }
        return response
      })
      .then((response) => {
        state.statusFeedback.activeStatus = state.statusFeedback.statusValid[response]
        state.valid = true
        return requestRSS(state.form.url)
      })
      .then((response) => {
        if (response.code === 'ERR_NETWORK') {
          throw new Error('errNetwork')
        }
        return buildFeed(response, state.form.url)
      })
      .then((buildFeed) => {
        const { feed, posts } = buildFeed
        state.feeds = [...initialState.feeds, feed]
        state.posts = [...initialState.posts, ...posts]
      })
      .then(() => {
        const listFeedsAndPosts = {
          feeds: state.feeds,
          posts: state.posts,
        }
        changesHistory(listFeedsAndPosts)
        updatePosts(listFeedsAndPosts)
      })
      .catch((response) => {
        state.statusFeedback.activeStatus = state.statusFeedback.errors[response.message]
        state.valid = false
      })
  })
}

export default checkValidForm
 */