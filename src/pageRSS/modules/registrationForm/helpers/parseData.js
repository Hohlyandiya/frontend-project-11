const parseData = (data) => {
  const parser = new DOMParser()
  const content = data.data.contents
  const doc = parser.parseFromString(content, 'text/xml')
  const error = doc.querySelector('parsererror')
  if (error) {
    throw new Error('errInvalidRSS')
  }
  return doc
}

export default parseData
