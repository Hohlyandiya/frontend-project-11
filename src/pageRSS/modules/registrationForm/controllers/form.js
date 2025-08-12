import { setUrlForm } from '../model/registrationForm'

const registrationForm = () => {
  const elements = {
    urlForm: document.querySelector('#url-input'),
    submitForm: document.querySelector('.rss-form'),
  }

  let valueInput = ''

  elements.urlForm.addEventListener('change', (e) => {
    valueInput = e.target.value.trim()
  })

  elements.submitForm.addEventListener('submit', (e) => {
    e.preventDefault()
    setUrlForm(valueInput)
  })
}

export default registrationForm
