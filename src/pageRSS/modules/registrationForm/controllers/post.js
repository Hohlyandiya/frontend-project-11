import { getPost, setReadPost } from '../model/registrationForm'
import renderModal from '../view/renderModal'

const post = () => {
  const btns = document.querySelectorAll('.btn-sm')
  btns.forEach((btn) => {
    const idPost = btn.getAttribute('data-id')

    btn.addEventListener('click', () => {
      const currentPost = getPost(idPost)
      setReadPost(idPost)
      renderModal(currentPost)
    })

    btn.addEventListener('shown.bs.modal', () => {
      const modal = document.querySelector('.modal')
      modal.focus()
    })
  })
}

export default post