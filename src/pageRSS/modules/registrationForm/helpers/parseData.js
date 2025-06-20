const parseData = (data) => {
  const tree = new DOMParser()
  return tree.parseFromString(data.data.contents, 'text/xml')
}

export default parseData