const renderFeeds = (feed) => {
  const ulListGroup = document.querySelector('.feeds .list-group')
  const liListGroupItem = document.createElement('li')
  const h3TitleFeeds = document.createElement('h3')
  const pContent = document.createElement('p')
  liListGroupItem.classList.add('list-group-item', 'border-0', 'border-end-0')
  h3TitleFeeds.classList.add('h6', 'm-0')
  pContent.classList.add('m-0', 'small', 'text-black-50')
  h3TitleFeeds.textContent = feed.title
  pContent.textContent = feed.description
  liListGroupItem.appendChild(h3TitleFeeds)
  liListGroupItem.appendChild(pContent)
  ulListGroup.appendChild(liListGroupItem)
}

export default renderFeeds