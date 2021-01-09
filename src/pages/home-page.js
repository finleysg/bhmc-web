import React from "react"

import { CardContentSolid } from "components/content"
import AnnouncementList from "features/announcements/announcement-list"
import { QuickLinks } from "features/announcements/quick-links"
import { UpcomingEvents } from "features/calendar/upcoming-events"
import * as colors from "styles/colors"

function HomePage() {
  const scrollToTop = () => window.scrollTo(0, 0)

  React.useLayoutEffect(() => {
    scrollToTop()
  }, [])

  return (
    <div className="content__inner">
      <div className="row">
        <div className="col-xl-6 col-lg-8">
          <div className="card">
            <div className="card-body">
              <h3 className="text-success" style={{ marginBottom: "1rem" }}>
                Club News and Announcements
              </h3>
              <AnnouncementList />
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4">
          <div className="card">
            <div className="card-header bg-primary">
              <span style={{ color: colors.white, fontSize: "1.2rem", marginRight: "1rem" }}>
                Upcoming Events
              </span>
            </div>
            <div className="card-body">
              <UpcomingEvents />
            </div>
          </div>
          <div className="card">
            <div className="card-header bg-indigo">
              <span style={{ color: colors.white, fontSize: "1.2rem", marginRight: "1rem" }}>
                Quick Links
              </span>
            </div>
            <div className="card-body">
              <QuickLinks />
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4">
          <CardContentSolid contentKey="sponsors" headerColor="success" />
          <CardContentSolid contentKey="notable" headerColor="teal" />
        </div>
      </div>
    </div>
  )
}

export default HomePage
