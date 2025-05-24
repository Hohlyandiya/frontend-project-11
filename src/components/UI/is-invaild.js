import * as yup from 'yup'
import onChange from 'on-change'
import renderError from '../../view/renderError'
import renderValid from '../../view/renderValid'

const schema = yup.object().shape({
  websiteUrl: yup.string().trim().required('Ссылка должна быть валидным URL').url(),
})

const validate = (fields) => {
  const promise = schema.validate(fields)
    .then(() => '')
    .catch(e => e.message)
  return promise
}

const validForm = () => {
  const elements = {
    urlInput: document.querySelector('#url-input'),
    formSubmit: document.querySelector('.rss-form'),
    feedback: document.querySelector('.feedback'),
  }

  const initialState = {
    valid: true,
    form: {
      websiteUrl: '',
    },
    error: '',
  }

  const state = onChange(initialState, () => {
    console.log(state)
    if (!state.valid) {
      renderError(elements.urlInput, elements.feedback, state.error)
      return
    }
    renderValid(elements.urlInput, elements.feedback)
  })

  validate(state.form)

  elements.urlInput.addEventListener('change', (e) => {
    state.form.websiteUrl = e.target.value
  })

  elements.formSubmit.addEventListener('submit', (e) => {
    e.preventDefault()
    new Promise((resolve, reject) => {
      const error = validate(state.form)
      resolve(error)
    })
      .then(error => state.error = error)
      .then(() => state.valid = state.error.length === 0 ? true : false)
  })
}

export default validForm

//https://lorem-rss.hexlet.app/feed