import styled from "@emotion/styled/macro"

import React from "react"

import { useRandomPhotos } from "hooks/photo-hooks"

import { SmallPhoto } from "./small-photo"

const PicContainer = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  li {
    display: block;
    padding: 10px;
  }
`

function RandomPicList(props) {
  const { tag, take } = props
  const { data } = useRandomPhotos({ take, tag })

  return (
    <PicContainer>
      {data?.map((pic) => (
        <li key={pic.id}>
          <SmallPhoto pic={pic} />
          <p className="text-muted">
            {pic.caption} (<strong>{pic.year}</strong>)
          </p>
        </li>
      ))}
    </PicContainer>
  )
}

export { RandomPicList }
