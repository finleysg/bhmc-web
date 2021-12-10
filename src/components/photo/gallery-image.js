import { imageUrl, mobileImageUrl, webImageUrl } from "utils/image-utils"

import { TagList } from "./tag-list"

function GalleryImage(props) {
  const { pic } = props
  if (pic) {
    return (
      <div>
        <p>{pic.caption}</p>
        <picture>
          <source srcSet={mobileImageUrl(pic)} media="(max-width: 600px)" />
          <source srcSet={webImageUrl(pic)} media="(max-width: 1200px)" />
          <img src={imageUrl(pic)} alt={pic.caption} style={{ width: "100%" }} />
        </picture>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <TagList
            tags={pic.tags?.map((t) => {
              return { tagName: t.tag }
            })}
          />
          <span>{pic.year}</span>
        </div>
      </div>
    )
  }
  return null
}

export { GalleryImage }
