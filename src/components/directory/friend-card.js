import styled from "@emotion/styled/macro"

import React from "react"

import * as colors from "styles/colors"

const FriendDetail = styled.div({
  border: `1px solid ${colors.gray300}`,
  padding: "4px",
  marginBottom: "8px",
  overflow: "hidden",
})

const FriendName = styled.p({
  marginBottom: "2px",
  fontWeight: "bold",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
})

const IsRegistered = styled.p({
  marginBottom: 0,
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
})

function FriendCard({ friend, registered, onSelect, ...rest }) {
  if (registered) {
    return (
      <FriendDetail className="text-muted">
        <FriendName>{friend.name}</FriendName>
        <IsRegistered>
          <small>Signed up</small>
        </IsRegistered>
      </FriendDetail>
    )
  } else {
    return (
      <FriendDetail
        className="text-light-blue"
        aria-roledescription="button"
        style={{ cursor: "pointer" }}
        onClick={() => onSelect(friend)}
        {...rest}
      >
        <FriendName>{friend.name}</FriendName>
        <IsRegistered>
          <small>Available</small>
        </IsRegistered>
      </FriendDetail>
    )
  }
}

export default FriendCard
