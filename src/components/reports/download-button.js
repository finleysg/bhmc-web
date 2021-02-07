import { GrDocumentDownload } from "react-icons/gr"

function DownloadButton({ data, filename }) {
  return (
    <div className="actions">
      <a
        className="dropdown"
        href={`data:text/csv;charset=utf-8,${encodeURIComponent(data)}`}
        target="_blank"
        rel="noreferrer"
        download={filename}
      >
        <i className="actions__item">
          <GrDocumentDownload />
        </i>
      </a>
    </div>
  )
}

export default DownloadButton
