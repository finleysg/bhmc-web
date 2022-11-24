import styled from "@emotion/styled/macro"

import React from "react"

import Modal from "react-bootstrap/Modal"
import { GoScreenFull } from "react-icons/go"
import { useNavigate } from "react-router-dom"
import * as colors from "styles/colors"
import { isMobile, isSmall } from "styles/media-queries"
import { mobileImageUrl } from "utils/image-utils"

import { GalleryImage } from "./gallery-image"

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
    <div className="mt-1">
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
          maxWidth: "100%",
          maxHeight: "240px",
          objectFit: "contain",
          position: "relative",
        }}
      />
      <OpenFullImage onClick={open} color={colors.blue} />
      <Modal
        show={showFullImage}
        onHide={close}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>&nbsp;</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <GalleryImage pic={pic} />
        </Modal.Body>
      </Modal>
    </div>
  )
}

export { SmallPhoto }
