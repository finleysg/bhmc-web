import React from "react"

import AnnouncementList from "components/announcements/announcement-list"
import { QuickLinks } from "components/announcements/quick-links"
import { UpcomingEvents } from "components/calendar/upcoming-events"
import { StaticDocument } from "components/document/static-document"
import { PhotoUploader } from "components/photo/photo-uploader"
import { RandomPicList } from "components/photo/random-pic-list"
import HoleInOne from "components/results/aces"
import { LowScoreList } from "components/results/low-score-list"
import { useSettings } from "hooks/use-settings"
import * as colors from "styles/colors"

function HomePage() {
  const { currentSeason } = useSettings()
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
              <PhotoUploader />
              <RandomPicList take={1} />
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
          <div className="card">
            <div className="card-header bg-teal">
              <span style={{ color: colors.white, fontSize: "1.2rem", marginRight: "1rem" }}>
                Club Documents
              </span>
            </div>
            <div className="card-body">
              <StaticDocument code="BYLAW" documentType="O" />
              <StaticDocument code="FIN" documentType="F" />
              <StaticDocument code="HCP" documentType="O" />
              <StaticDocument code="TUT1" documentType="O" />
              <StaticDocument code="TUT2" documentType="O" />
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4">
          <HoleInOne headerColor="success" />
          <LowScoreList season={currentSeason} />
        </div>
      </div>
    </div>
  )
}

export default HomePage
