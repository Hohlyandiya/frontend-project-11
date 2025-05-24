const renderValid = (urlInput, element) => {
  urlInput.classList.remove('is-invalid')
  element.textContent = ''
}

export default renderValid