import styled from "@emotion/styled/macro"
import Dialog from "@reach/dialog"

import React from "react"

import { IconActionButton } from "components/button/buttons"
import { GoScreenFull } from "react-icons/go"
import { RiCloseFill } from "react-icons/ri"
import { useNavigate } from "react-router-dom"
import * as colors from "styles/colors"
import { isMobile, isSmall } from "styles/media-queries"
import { mobileImageUrl } from "utils/image-utils"

import { GalleryImage } from "./gallery-image"

const containerCss = {
  position: "absolute",
  top: 3,
  right: 3,
}

const PhotoButton = styled.a`
  padding: 2px;
  border: 0;
  cursor: pointer;
  color: ${colors.gray400};
  background-color: transparent;
  font-size: 1.2rem;
  height: 20px;
  width: 20px;
  border-radius: 20px;
  &:hover {
    background-color: ${colors.gray100};
    color: ${(props) => props.color};
  }
`

function OpenFullImage({ color, ...rest }) {
  return (
    <div css={containerCss}>
      <PhotoButton color={color} {...rest}>
        <GoScreenFull />
      </PhotoButton>
    </div>
  )
}

function SmallPhoto(props) {
  const [showFullImage, setShowFullImage] = React.useState(false)
  const { pic } = props
  const navigate = useNavigate()

  const close = () => setShowFullImage(false)
  const open = () => {
    if (isMobile() || isSmall()) {
      navigate(`/gallery/${pic.id}`)
    } else {
      setShowFullImage(true)
    }
  }

  return (
    <div
      style={{
        maxHeight: "300px",
        maxWidth: "400px",
        margin: "10px",
        textAlign: "center",
        position: "relative",
      }}
    >
      <img
        src={mobileImageUrl(pic)}
        alt={pic.caption}
        style={{
          maxWidth: "360px",
          maxHeight: "280px",
          objectFit: "contain",
          position: "relative",
        }}
      />
      <OpenFullImage onClick={open} color={colors.blue} />
      {showFullImage && (
        <Dialog onDismiss={close} aria-label={pic.caption}>
          <div style={{ position: "relative" }}>
            <GalleryImage pic={pic} />
            <div style={{ position: "absolute", top: "0", right: "0" }}>
              <IconActionButton onAction={close} label="close" color={colors.black}>
                <RiCloseFill />
              </IconActionButton>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  )
}

export { SmallPhoto }
