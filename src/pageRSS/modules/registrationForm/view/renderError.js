const renderError = (error) => {
  const feedback = document.querySelector('.feedback')
  const urlInput = document.querySelector('#url-input')
  urlInput.classList.add('is-invalid')
  feedback.classList.add('text-danger')
  feedback.classList.remove('text-success')
  feedback.textContent = error
}

export default renderError
