import styled from "@emotion/styled"

import React from "react"

import { isAdmin } from "components/button/admin-buttons"
import { IconActionButton } from "components/button/buttons"
import { OverlaySpinner } from "components/spinners"
import { useGroups } from "hooks/account-hooks"
import { useCreatePhoto } from "hooks/photo-hooks"
import { MdCamera } from "react-icons/md"
import * as colors from "styles/colors"

import { PhotoUploadForm } from "./photo-upload-form"

const UploadContainer = styled.div({
  position: "absolute",
  top: 3,
  right: 50,
})

function PhotoUploader(props) {
  const { season, defaultTags } = props
  const [upload, setUpload] = React.useState(false)
  const { mutate: savePhoto, isLoading } = useCreatePhoto()
  const groups = useGroups()

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

  if (isAdmin(groups)) {
    if (!upload) {
      return (
        <UploadContainer>
          <IconActionButton
            label="Upload a picture"
            color={colors.deepPurple}
            onAction={() => setUpload(true)}
          >
            <MdCamera style={{ fontSize: "3rem" }} />
          </IconActionButton>
        </UploadContainer>
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
