const renderError = (urlInput, element, error) => {
  urlInput.classList.add('is-invalid')
  element.classList.add('text-danger')
  element.classList.remove('text-success')
  element.textContent = error
}

export default renderError