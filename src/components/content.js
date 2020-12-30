import { usePageContent } from "hooks/use-page-content"
import ReactMarkdown from "react-markdown"
import gfm from "remark-gfm"
import * as colors from "styles/colors"

function CardContent(props) {
  const { title } = props.title ?? true
  const pageContent = usePageContent(props.contentKey)

  return (
    <div className="card">
      <div className="card-body">
        {title && <h4 className="card-title">{pageContent.title}</h4>}
        <div className="card-text">
          <ReactMarkdown source={pageContent.content} plugins={[gfm]} escapeHtml={true} />
        </div>
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
