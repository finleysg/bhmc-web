import { GalleryImage } from "components/photo/gallery-image"
import { OverlaySpinner } from "components/spinners"
import { usePhoto } from "hooks/photo-hooks"
import { useParams } from "react-router"

function GalleryImagePage() {
  const { id } = useParams()
  const { data: pic, status } = usePhoto(+id)

  return (
    <div className="content__inner">
      <OverlaySpinner loading={status === "loading"} />
      <GalleryImage pic={pic} />
    </div>
  )
}

export default GalleryImagePage
