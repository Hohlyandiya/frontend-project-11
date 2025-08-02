import { getPost, setReadPost } from '../model/registrationForm'
import renderModal from '../view/renderModal'
import 'bootstrap'

const post = () => {
  const btns = document.querySelectorAll('.btn-sm')
  btns.forEach((btn) => {
    const idPost = btn.getAttribute('data-id')

    btn.addEventListener('shown.bs.modal', () => {
    })

    btn.addEventListener('click', () => {
      const currentPost = getPost(idPost)
      setReadPost(idPost)
      renderModal(currentPost)
    })
  })
}

export default post