const renderValid = (status) => {
  const feedback = document.querySelector('.feedback')
  const urlInput = document.querySelector('#url-input')
  urlInput.classList.remove('is-invalid')
  urlInput.value = ''
  feedback.classList.remove('text-danger')
  feedback.classList.add('text-success')
  feedback.textContent = status
}

export default renderValid