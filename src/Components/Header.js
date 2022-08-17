import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import { Navbar, Button, Nav, DropdownToggle, DropdownMenu, Dropdown, DropdownItem, Container, Collapse, NavbarToggler, NavItem, NavLink, NavbarBrand } from "reactstrap"

import { userLogout } from "../Services/auth"
import { removeTokenData, counterLogin } from "../Stores/userStore"

function Header(props) {
  const Navigate = useNavigate()
  const Dispatch = useDispatch()
  const appState = useSelector((state) => state)

  const [isOpen, setIsOpen] = useState(false)

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const togglee = () => setDropdownOpen((prevState) => !prevState)

  const changeBtns = () => {
    return (
      !appState.user.isLogin && (
        <div className="right-side-menu-btns ms-auto">
          <a className="enter-register  me-3" href="/register-user">
            Register
          </a>
          <Button
            onClick={() => {
              Navigate("/login")
            }}
          >
            Login
          </Button>
        </div>
      )
    )
  }

  useEffect(() => {
    changeBtns()
  }, [appState.user.counter])

  function logoutHandler() {
    userLogout(appState.user.token).then(() => {
      Dispatch(removeTokenData())
      Dispatch(counterLogin())
      console.log(appState.user)
    })
  }
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
                  <NavLink href="/store-management">Mağaza Yönetimi</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/admin">Admin</NavLink>
                </NavItem>
              </Nav>

              {changeBtns()}
              {appState.user.token && (
                <Dropdown className="right-side-menu ms-auto" isOpen={dropdownOpen} toggle={togglee} {...props}>
                  <DropdownToggle color="danger" size="sm">
                    {appState.user.name}
                  </DropdownToggle>
                  <DropdownMenu dark>
                    <DropdownItem>
                      <a className="enter-store" href="/store-management">
                        Mağazaya Giriş
                      </a>
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        logoutHandler()
                      }}
                    >
                      LogOut
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              )}
            </Collapse>
          </Navbar>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header
