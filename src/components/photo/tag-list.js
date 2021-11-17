import styled from "@emotion/styled/macro"

import React from "react"

import Badge from "react-bootstrap/Badge"
import { TiTimes } from "react-icons/ti"

const TagContainer = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  li {
    display: inline;
    padding-right: 5px;
  }
`

const TagRemover = styled.a`
  color: white;
  cursor: pointer;
`

function Tag(props) {
  const { tag, removeTag } = props
  return (
    <Badge variant="info">
      {tag.name}{" "}
      {tag.canRemove && (
        <TagRemover onClick={() => removeTag(tag)}>
          <TiTimes size={16} />
        </TagRemover>
      )}
    </Badge>
  )
}

function TagList(props) {
  const { tags, removeTag } = props
  return (
    <TagContainer className="mb-2 mt-1">
      {tags &&
        tags.map((tag) => (
          <li key={tag.id}>
            <Tag tag={tag} removeTag={() => removeTag(tag)} />
          </li>
        ))}
    </TagContainer>
  )
}

export { Tag, TagList }
