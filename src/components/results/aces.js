import { usePageContent } from "hooks/use-page-content"
import { useSettings } from "hooks/use-settings"
import ReactMarkdown from "react-markdown"
import gfm from "remark-gfm"
import * as colors from "styles/colors"

import { HoleInOneList } from "./hole-in-one-list"

function HoleInOne(props) {
  const pageContent = usePageContent("hole-in-one")
  const { currentSeason } = useSettings()

  return (
    <div className="card">
      <div className={`card-header bg-${props.headerColor}`}>
        <span style={{ color: colors.white, fontSize: "1.2rem", marginRight: "1rem" }}>
          {pageContent.title}
        </span>
      </div>
      <div className="card-body">
        <ReactMarkdown plugins={[gfm]}>{pageContent.content}</ReactMarkdown>
        <HoleInOneList season={currentSeason} />
      </div>
    </div>
  )
}

export default HoleInOne
