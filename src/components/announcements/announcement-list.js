import React from "react"

import { LoadingSpinner } from "components/spinners"
import { useClient } from "context/auth-context"
import { useQuery } from "react-query"

import AnnouncementCard from "./announcement-card"

function AnnouncementList() {
  const client = useClient()

  const { data: announcements, isLoading } = useQuery("announcements", () => {
    return client("news").then((data) => data)
  })

  return (
    <div>
      <LoadingSpinner loading={isLoading} />
      {!isLoading &&
        announcements.map((a) => {
          return <AnnouncementCard key={a.id} announcement={a} />
        })}
    </div>
  )
}

export default AnnouncementList
