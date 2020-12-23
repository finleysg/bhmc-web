import React from "react"

import { CardContent } from "components/content"
import MyCards from "features/account/my-cards"
import MyEvents from "features/account/my-events"

function SettingsPage() {
  return (
    <div className="content__inner">
      {/* <header className="content__title">
        <h1>My Settings</h1>
      </header> */}
      <div className="row">
        <div className="col-md-6 col-12">
          <CardContent contentKey="player-settings" />
          <MyEvents />
        </div>
        <div className="col-md-6 col-12">
          <MyCards />
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
