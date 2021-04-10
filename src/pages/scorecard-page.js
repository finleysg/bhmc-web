import React from "react"

import { CardContent } from "components/card/content"
import { Tab, Tabs } from "components/tabs"
import { useParams } from "react-router-dom"

function Scorecards({ rotation }) {
  return <CardContent contentKey={rotation} />
}

function ScorecardPage() {
  const { rotation } = useParams()

  return (
    <div className="content__inner">
      <div>
        <Tabs>
          <Tab to={`/scorecards/east-west`}>East West</Tab>
          <Tab to={`/scorecards/west-north`}>West North</Tab>
          <Tab to={`/scorecards/north-east`}>North East</Tab>
        </Tabs>
        <Scorecards rotation={rotation} />
      </div>
    </div>
  )
}

export default ScorecardPage
