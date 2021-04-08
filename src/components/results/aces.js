import { usePageContent } from "hooks/use-page-content"
import ReactMarkdown from "react-markdown"
import gfm from "remark-gfm"
import * as colors from "styles/colors"
import * as config from "utils/app-config"

import { HoleInOneList } from "./hole-in-one-list"

function HoleInOne(props) {
  const pageContent = usePageContent("hole-in-one")

  return (
    <div className="card">
      <div className={`card-header bg-${props.headerColor}`}>
        <span style={{ color: colors.white, fontSize: "1.2rem", marginRight: "1rem" }}>
          {pageContent.title}
        </span>
      </div>
      <div className="card-body">
        <ReactMarkdown source={pageContent.content} plugins={[gfm]} escapeHtml={true} />
        <HoleInOneList season={config.currentSeason} />
      </div>
    </div>
  )
}

export default HoleInOne
