import React from "react"

import { CardContent } from "components/card/content"
import { PhotoUploader } from "components/photo/photo-uploader"
import { RandomPicList } from "components/photo/random-pic-list"

function AboutPage() {
  return (
    <div className="content__inner">
      <div className="row">
        <div className="col-md-6 col-12">
          <CardContent contentKey="about-us" />
        </div>
        <div className="col-md-6 col-12">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title text-success">Serious Golf, Serious Fun</h4>
              <PhotoUploader />
              <RandomPicList take={3} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
