import { usePageContent } from "hooks/use-page-content"
import ReactMarkdown from "react-markdown"
import gfm from "remark-gfm"

function CardContent(props) {
  const pageContent = usePageContent(props.contentKey)

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">{pageContent.title}</h4>
        <div className="card-text">
          <ReactMarkdown source={pageContent.content} plugins={[gfm]} escapeHtml={true} />
        </div>
      </div>
    </div>
  )
}

export { CardContent }
