import "./card-table.scss"

import { Children } from "react"

import { usePageContent } from "hooks/use-page-content"
import ReactMarkdown from "react-markdown"
import gfm from "remark-gfm"
import * as colors from "styles/colors"

function CardContent(props) {
  const pageContent = usePageContent(props.contentKey)

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title text-primary">{pageContent.title}</h3>
        <div className="card-text">
          <ReactMarkdown source={pageContent.content} plugins={[gfm]} escapeHtml={true} />
        </div>
        {props.children && Children.only(props.children)}
      </div>
    </div>
  )
}

function CardContentSolid(props) {
  const pageContent = usePageContent(props.contentKey)

  return (
    <div className="card">
      <div className={`card-header bg-${props.headerColor}`}>
        <span style={{ color: colors.white, fontSize: "1.2rem", marginRight: "1rem" }}>
          {pageContent.title}
        </span>
      </div>
      <div className="card-body">
        <ReactMarkdown source={pageContent.content} plugins={[gfm]} escapeHtml={true} />
      </div>
    </div>
  )
}
export { CardContent, CardContentSolid }
