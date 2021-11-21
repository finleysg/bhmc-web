import React from "react"

import { PhotoUploader } from "components/photo/photo-uploader"
import { RandomPicList } from "components/photo/random-pic-list"
import * as colors from "styles/colors"

function EventPhotos({ clubEvent }) {
  const [tags, setTags] = React.useState([])

  React.useEffect(() => {
    if (clubEvent.defaultTag) {
      const defaultTags = []
      defaultTags.push(clubEvent.defaultTag)
      setTags(defaultTags)
    }
  }, [clubEvent])

  return (
    <div className="card">
      <div className={`card-header bg-info`}>
        <span style={{ color: colors.white, fontSize: "1.2rem", marginRight: "1rem" }}>
          Event Photos
        </span>
      </div>
      <div className="card-body">
        <PhotoUploader defaultTags={tags} />
        <RandomPicList tag={clubEvent.defaultTag} take={1} />
      </div>
    </div>
  )
}

export default EventPhotos
