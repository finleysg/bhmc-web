/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/core"

import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { rgba } from "styles/rgba"

function Footer() {
  return (
    <Navbar
      sticky="bottom"
      css={{
        borderTop: `1px solid ${rgba("#000000", 0.1)}`,
      }}
    >
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/calendar">Event Calendar</Nav.Link>
        <Nav.Link href="/contact-us">Contact Us</Nav.Link>
      </Nav>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          Crafted with care by{" "}
          <a href="https://zoomdoggy.com" rel="noreferrer" target="_blank">
            Zoomdoggy Design
          </a>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  )
}

function FooterAlt(props) {
  return (
    <footer className={"footer" + (props.transparent ? " footer-transparent" : "")}>
      <div className="container-fluid">
        <Nav className="pull-left">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/calendar">Event Calendar</Nav.Link>
          <Nav.Link href="/contact-us">Contact Us</Nav.Link>
        </Nav>
        <p className="copyright pull-right">
          Crafted with care by{" "}
          <a href="https://zoomdoggy.com" rel="noreferrer" target="_blank">
            Zoomdoggy Design
          </a>
        </p>
      </div>
    </footer>
  )
}

export { Footer, FooterAlt }
