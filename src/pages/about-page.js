import React from "react"

import { CardContent } from "components/card/content"
import { PhotoUploader } from "components/photo/photo-uploader"
import { RandomPicList } from "components/photo/random-pic-list"

import SeriousGolf from "../assets/img/FiveNorthGreen.jpg"

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
              <h4 className="card-title text-success">Serious Golf</h4>
              <picture>
                <source srcSet={SeriousGolf} media="(max-width: 600px)" />
                <source srcSet={SeriousGolf} media="(max-width: 1200px)" />
                <img
                  src={SeriousGolf}
                  style={{ maxWidth: "100%", height: "auto", display: "block", margin: "auto" }}
                  alt="Serious Golf"
                />
              </picture>
            </div>
          </div>
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
