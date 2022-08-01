import React, { useEffect, useState } from "react"
import { Navbar, Nav, DropdownToggle, DropdownMenu, Dropdown, DropdownItem, Container, Collapse, NavbarToggler, NavItem, NavLink, NavbarBrand } from "reactstrap"

function Header(props) {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const togglee = () => setDropdownOpen((prevState) => !prevState)
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">Brand</NavbarBrand>
            <NavbarToggler
              onClick={() => {
                setIsOpen(!isOpen)
              }}
            />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink href="#">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#">Signup</NavLink>
                </NavItem>
              </Nav>
              <Dropdown className="ms-auto" isOpen={dropdownOpen} toggle={togglee} {...props}>
                <DropdownToggle color="danger" size="sm">
                  User Name
                </DropdownToggle>
                <DropdownMenu dark>
                  <DropdownItem>Mağazaya Giriş</DropdownItem>
                  <DropdownItem>LogOut</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Collapse>
          </Navbar>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header
