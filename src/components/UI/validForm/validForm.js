import * as yup from 'yup'
import onChange from 'on-change'
import renderError from '../../../view/renderError'
import renderValid from '../../../view/renderValid'
import i18next from 'i18next'
import resources from '../locales/index'

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
    responses: {
      errors: {
        errInvalid: 'form.errors.errInvalid',
        errRepeat: 'form.errors.errRepeat',
        errInvalidRSS: 'form.errors.errInvalidRSS',
      },
      statusValid: {
        rssValid: 'form.rssValid',
      },
    },
    activeStatus: '',
  }

  const state = onChange(initialState, () => {
    if (!state.valid) {
      renderError(elements.urlInput, elements.feedback, i18nInstance.t(state.activeStatus))
      return
    }
    renderValid(elements.urlInput, elements.feedback, i18nInstance.t(state.activeStatus))
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
        if (Object.hasOwn(state.responses.errors, response)) {
          throw new Error(response)
        }
        return response
      })
      .then((response) => {
        state.activeStatus = state.responses.statusValid[response]
        state.valid = true
      })
      .catch((response) => {
        state.activeStatus = state.responses.errors[response.message]
        state.valid = false
      })
  })
}

export default checkValidForm
