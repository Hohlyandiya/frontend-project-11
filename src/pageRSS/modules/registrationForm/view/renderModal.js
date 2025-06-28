const renderModal = (post) => {
  const modalTitle = document.querySelector('.modal-title')
  const modalBody = document.querySelector('.modal-body')
  const buttonFullArticle = document.querySelector('.full-article')
  modalTitle.textContent = post.title
  modalBody.textContent = post.description
  buttonFullArticle.setAttribute('href', post.link)
}

export default renderModal