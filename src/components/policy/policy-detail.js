import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

function PolicyDetail({ policy }) {
  const { title, description } = policy
  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title text-primary">{title}</h4>
        <div className="card-text">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{description}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

export { PolicyDetail }
