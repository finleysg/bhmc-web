import React from "react"

import { Nav, NavDropdown } from "react-bootstrap"
import { GrUserSettings } from "react-icons/gr"

function UserMenu() {
  return (
    <Nav>
      <Nav.Item style={{ paddingTop: "6px" }}>
        <GrUserSettings />
      </Nav.Item>
      <NavDropdown title="User Name">
        <NavDropdown.Item eventKey={2.1}>Account Settings</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item eventKey={2.2}>Log Out</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  )
}

export { UserMenu }
