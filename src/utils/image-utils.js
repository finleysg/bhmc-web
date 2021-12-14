const serverUrl = process.env.REACT_APP_SERVER_URL

const getPagedPhotosUrl = (tag) => {
  if (tag) {
    return `photos/?page=1&tags=${tag}`
  } else {
    return "photos/?page=1"
  }
}

const imageUrl = (pic) => {
  if (pic.image_url.startsWith("http")) {
    return pic.image_url // production (from Amazon storage)
  }
  return `${serverUrl}${pic.image_url}`
}

const webImageUrl = (pic) => {
  if (pic.web_url.startsWith("http")) {
    return pic.web_url // production (from Amazon storage)
  }
  return `${serverUrl}${pic.web_url}`
}

const mobileImageUrl = (pic) => {
  if (pic.mobile_url.startsWith("http")) {
    return pic.mobile_url // production (from Amazon storage)
  }
  return `${serverUrl}${pic.mobile_url}`
}

export { getPagedPhotosUrl, imageUrl, mobileImageUrl, webImageUrl }
