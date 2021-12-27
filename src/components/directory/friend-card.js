import styled from "@emotion/styled/macro"

import React from "react"

import { useSettings } from "hooks/use-settings"
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

function FriendCard({ friend, clubEvent, onSelect, ...rest }) {
  const { currentSeason } = useSettings()

  if (clubEvent.registrationType === "Members Only" && !friend.isMember) {
    return (
      <FriendDetail className="text-muted">
        <FriendName>{friend.name}</FriendName>
        <IsRegistered>
          <small>Not a {currentSeason} member</small>
        </IsRegistered>
      </FriendDetail>
    )
  } else if (clubEvent.ghinRequired && !friend.ghin) {
    return (
      <FriendDetail className="text-muted">
        <FriendName>{friend.name}</FriendName>
        <IsRegistered>
          <small>Does not have a GHIN</small>
        </IsRegistered>
      </FriendDetail>
    )
  } else if (!friend.canRegister) {
    return (
      <FriendDetail className="text-muted">
        <FriendName>{friend.name}</FriendName>
        <IsRegistered>
          <small>Unavailable</small>
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
