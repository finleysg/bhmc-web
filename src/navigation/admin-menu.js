import React from "react"

import { Nav, NavDropdown } from "react-bootstrap"
import { GrUserAdmin } from "react-icons/gr"

function AdminMenu() {
  return (
    <Nav>
      <Nav.Item style={{ paddingTop: "6px" }}>
        <GrUserAdmin />
      </Nav.Item>
      <NavDropdown title="Administration">
        <NavDropdown.Item eventKey={1.1}>Turn on Edit Mode</NavDropdown.Item>
        <NavDropdown.Item eventKey={1.2}>Reports</NavDropdown.Item>
        <NavDropdown.Item eventKey={1.3}>Document Library</NavDropdown.Item>
        <NavDropdown.Item eventKey={1.4}>Image Gallery</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item eventKey={1.5}>Admin Website</NavDropdown.Item>
        <NavDropdown.Item eventKey={1.6}>BHMC Wiki</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  )
}

export { AdminMenu }
