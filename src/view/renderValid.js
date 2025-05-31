const renderValid = (urlInput, element, status) => {
  urlInput.classList.remove('is-invalid')
  element.classList.remove('text-danger')
  element.classList.add('text-success')
  element.textContent = status
}

export default renderValid