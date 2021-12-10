/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react"

import React from "react"

import { IconActionButton } from "components/button/buttons"
import { OverlaySpinner } from "components/spinners"
import { useAuth } from "context/auth-context"
import { useCreatePhoto } from "hooks/photo-hooks"
import { MdCamera } from "react-icons/md"
import * as colors from "styles/colors"

import { PhotoUploadForm } from "./photo-upload-form"

const containerCss = {
  position: "absolute",
  top: 3,
  right: 50,
}

function PhotoUploader(props) {
  const { season, defaultTags } = props
  const [upload, setUpload] = React.useState(false)
  const { mutate: savePhoto, isLoading } = useCreatePhoto()
  const { user } = useAuth()

  const handleSave = (values) => {
    const form = new FormData()
    form.append("year", values.year)
    form.append("caption", values.caption)
    form.append("raw_image", values.file, values.file.name)
    form.append("tags", values.tags.map((tagName) => tagName).join("|"))

    savePhoto(form, {
      onSuccess: () => {
        setUpload(false)
      },
    })
  }

  if (user.is_staff) {
    if (!upload) {
      return (
        <div css={containerCss}>
          <IconActionButton
            label="Upload a picture"
            color={colors.deepPurple}
            onAction={() => setUpload(true)}
          >
            <MdCamera style={{ fontSize: "3rem" }} />
          </IconActionButton>
        </div>
      )
    } else {
      return (
        <div>
          <OverlaySpinner loading={isLoading} />
          <PhotoUploadForm
            year={season}
            defaultTags={defaultTags}
            onSave={handleSave}
            onCancel={() => setUpload(false)}
          />
        </div>
      )
    }
  }

  return null
}

export { PhotoUploader }
