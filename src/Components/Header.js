import React, { useEffect, useState } from "react"
import { Navbar, Nav, DropdownToggle, DropdownMenu, Dropdown, DropdownItem, Container, Collapse, NavbarToggler, NavItem, NavLink, NavbarBrand } from "reactstrap"

function Header(props) {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const togglee = () => setDropdownOpen((prevState) => !prevState)
  return (
    <div className="header">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">Brand</NavbarBrand>
            <NavbarToggler
              onClick={() => {
                setIsOpen(!isOpen)
              }}
            />
            <Collapse className="navbar-btns" isOpen={isOpen} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink href="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#">Mağaza Yönetimi</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/admin">Admin</NavLink>
                </NavItem>
              </Nav>
              <a className="enter-register ms-auto" href="/register-user">
                Register
              </a>
              <a className="enter-login ms-3" href="/login">
                Login
              </a>
              <Dropdown isOpen={dropdownOpen} toggle={togglee} {...props}>
                <DropdownToggle color="danger" size="sm">
                  User Name
                </DropdownToggle>
                <DropdownMenu dark>
                  <DropdownItem>
                    <a className="enter-store" href="/store-management">
                      Mağazaya Giriş
                    </a>
                  </DropdownItem>
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
