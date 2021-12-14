/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react"
import styled from "@emotion/styled/macro"
import { Dialog as ReachDialog } from "@reach/dialog"
import VisuallyHidden from "@reach/visually-hidden"

import React from "react"

import { CircleButton } from "components/button/buttons"
import * as mq from "styles/media-queries"

// This is to call all handlers, including the one we're adding.
const callAll =
  (...fns) =>
  (...args) =>
    fns.forEach((fn) => fn && fn(...args))

const ModalContext = React.createContext()

const Dialog = styled(ReachDialog)({
  maxWidth: "450px",
  borderRadius: "3px",
  paddingBottom: "3.5em",
  boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.2)",
  margin: "20vh auto",
  [mq.small]: {
    width: "100%",
    margin: "10vh auto",
  },
})

function Modal(props) {
  const [isOpen, setIsOpen] = React.useState(false)

  return <ModalContext.Provider value={[isOpen, setIsOpen]} {...props} />
}

function ModalDismissButton({ children: child }) {
  const [, setIsOpen] = React.useContext(ModalContext)
  return React.cloneElement(child, {
    onClick: callAll(() => setIsOpen(false), child.props.onClick),
  })
}

function ModalOpenButton({ children: child }) {
  const [, setIsOpen] = React.useContext(ModalContext)
  return React.cloneElement(child, {
    onClick: callAll(() => setIsOpen(true), child.props.onClick),
  })
}

function ModalContentsBase(props) {
  const [isOpen, setIsOpen] = React.useContext(ModalContext)
  return <Dialog isOpen={isOpen} onDismiss={() => setIsOpen(false)} {...props} />
}

function ModalContents({ title, children, ...props }) {
  return (
    <ModalContentsBase {...props}>
      <div css={{ display: "flex", justifyContent: "flex-end" }}>
        <ModalDismissButton>
          <CircleButton>
            <VisuallyHidden>Close</VisuallyHidden>
            <span aria-hidden>×</span>
          </CircleButton>
        </ModalDismissButton>
      </div>
      <h3 css={{ textAlign: "center", fontSize: "2em" }}>{title}</h3>
      {children}
    </ModalContentsBase>
  )
}

export { Modal, ModalContents, ModalDismissButton, ModalOpenButton }
