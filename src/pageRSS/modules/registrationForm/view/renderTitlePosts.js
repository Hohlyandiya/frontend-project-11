const rendertitlePosts = () => {
  const posts = document.querySelector('.posts')
  const divCard = document.createElement('div')
  const divCardBody = document.createElement('div')
  const h2CardTitle = document.createElement('h2')
  const ulListGroup = document.createElement('ul')
  divCard.classList.add('card', 'border-0')
  divCardBody.classList.add('card-body')
  h2CardTitle.classList.add('card-title', 'h4')
  ulListGroup.classList.add('list-group', 'border-0', 'rounded-0')
  h2CardTitle.textContent = 'Посты'
  divCardBody.appendChild(h2CardTitle)
  divCard.appendChild(divCardBody)
  divCard.appendChild(ulListGroup)
  posts.appendChild(divCard)
}

export default rendertitlePosts