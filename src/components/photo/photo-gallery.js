import { useCallback, useRef, useState } from "react"

import { OverlaySpinner } from "components/spinners"
import { usePagingData } from "hooks/use-paging-data"

import { SmallPhoto } from "./small-photo"

function PhotoGallery(props) {
  const { tag } = props
  const [url, setUrl] = useState(() => {
    if (tag) {
      return `photos/?page=1&tags=${tag}`
    } else {
      return "photos/?page=1"
    }
  })
  const { results, next, loading } = usePagingData(url)
  const loader = useRef()

  const lastPhotoRef = useCallback(
    (node) => {
      if (loading) return
      if (loader.current) loader.current.disconnect()
      loader.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && next) {
            setUrl(next)
          }
        },
        {
          root: null,
          rootMargin: "20px",
          threshold: 0,
        },
      )
      if (node) {
        loader.current.observe(node)
      }
    },
    [loading, next],
  )

  return (
    <ul style={{ listStyle: "none" }}>
      {results?.map((pic, index) => {
        if (results.length === index + 1) {
          return (
            <li key={pic.id} ref={lastPhotoRef} style={{ display: "inline-block" }}>
              <SmallPhoto pic={pic} />
            </li>
          )
        } else {
          return (
            <li key={pic.id} style={{ display: "inline-block" }}>
              <SmallPhoto pic={pic} />
            </li>
          )
        }
      })}
      {next && (
        <li>
          <OverlaySpinner isLoading={loading} />
        </li>
      )}
    </ul>
  )
}

export { PhotoGallery }
