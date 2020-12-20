import React from "react"

import { CardContent } from "components/content"

function AboutPage() {
  return (
    <div className="content__inner">
      <header className="content__title">
        <h1>About the Men's Club</h1>
      </header>
      <div className="row">
        <div className="col-12">
          <CardContent contentKey="about-us" />
        </div>
      </div>
    </div>
  )
}

export default AboutPage
