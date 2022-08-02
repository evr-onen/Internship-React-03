import { useEffect, useState } from "react"
import { Nav, NavItem, NavLink, TabContent, TabPane, Row, Col } from "reactstrap"

function Admin() {
  const [activeTab, setActiveTab] = useState("1")

  return (
    <div className="admin container">
      <Nav tabs>
        <NavItem>
          <NavLink className={activeTab == "1" ? "active" : ""} onClick={() => setActiveTab("1")}>
            Dashboard
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={activeTab == "2" ? "active" : ""} onClick={() => setActiveTab("2")}>
            Products
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={activeTab == "3" ? "active" : ""} onClick={() => setActiveTab("3")}>
            Categories
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={activeTab == "4" ? "active" : ""} onClick={() => setActiveTab("4")}>
            Stores
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">Tab 1 Content</TabPane>
        <TabPane tabId="2">Tab 2 Content</TabPane>
        <TabPane tabId="3">Tab 3 Content</TabPane>
        <TabPane tabId="4">Tab 4 Content</TabPane>
      </TabContent>
    </div>
  )
}

export default Admin
