import styled from "@emotion/styled/macro"

import React from "react"

import { useRandomPhotos } from "hooks/photo-hooks"

const PicContainer = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  li {
    display: block;
    padding: 10px;
  }
`

const serverUrl = process.env.REACT_APP_SERVER_URL

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

function RandomPicList(props) {
  const { tag, take } = props
  const { data, status } = useRandomPhotos({ take, tag })

  console.log(status)
  console.log(data)
  return (
    <PicContainer>
      {data?.map((pic) => (
        <li key={pic.id}>
          <picture>
            <source srcSet={mobileImageUrl(pic)} media="(max-width: 600px)" />
            <source srcSet={webImageUrl(pic)} media="(max-width: 1200px)" />
            <img src={imageUrl(pic)} alt={pic.caption} style={{ width: "100%" }} />
          </picture>
          <p className="text-muted">{pic.caption}</p>
        </li>
      ))}
    </PicContainer>
  )
}

export { RandomPicList }
