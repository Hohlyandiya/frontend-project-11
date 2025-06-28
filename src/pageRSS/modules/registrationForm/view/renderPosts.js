import postController from '../controllers/post'

const renderPosts = (post) => {
  const ulListGroup = document.querySelector('.posts .list-group')
  const liListGroupItem = document.createElement('li')
  const aFwBold = document.createElement('a')
  const btn = document.createElement('button')
  liListGroupItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0')
  if (post.isPostRead) {
    aFwBold.classList.add('fw-normal', 'link-secondary')
  }
  else {
    aFwBold.classList.add('fw-bold')
  }
  btn.classList.add('btn', 'btn-outline-primary', 'btn-sm')
  aFwBold.textContent = post.title
  btn.textContent = 'Просмотр'
  aFwBold.setAttribute('data-id', post.id)
  aFwBold.setAttribute('target', '_blank')
  aFwBold.setAttribute('rel', 'noopener noreferrer')
  aFwBold.setAttribute('href', post.link)
  btn.setAttribute('data-id', post.id)
  btn.setAttribute('data-bs-toggle', 'modal')
  btn.setAttribute('data-bs-target', '#modal')
  liListGroupItem.appendChild(aFwBold)
  liListGroupItem.appendChild(btn)
  ulListGroup.appendChild(liListGroupItem)
  postController()
}



export default renderPosts