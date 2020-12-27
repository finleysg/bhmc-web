import React from "react"

import { LoadingSpinner } from "components/spinners"
import { useClient } from "context/auth-context"
import { useRegistrationStatus } from "hooks/account-hooks"
import { useQuery } from "react-query"
import * as config from "utils/app-config"

import AnnouncementCard from "./announcement-card"

function AnnouncementList() {
  const client = useClient()
  const isMember = useRegistrationStatus(config.seasonEventId)

  const { data: announcements, isLoading } = useQuery("announcements", () => {
    return client("news").then((data) => data)
  })

  const filteredAnnouncements = () => {
    if (announcements && announcements.length > 0) {
      return announcements.filter((a) =>
        a.visibility === "A" || a.visibility === isMember ? "M" : "N",
      )
    }
    return []
  }

  return (
    <div>
      <LoadingSpinner loading={isLoading} />
      {!isLoading &&
        filteredAnnouncements().map((a) => {
          return <AnnouncementCard key={a.id} announcement={a} />
        })}
    </div>
  )
}

export default AnnouncementList
