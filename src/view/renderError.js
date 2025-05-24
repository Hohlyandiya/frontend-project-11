const renderError = (urlInput, element, error) => {
  urlInput.classList.add('is-invalid')
  element.textContent = error
}

export default renderError