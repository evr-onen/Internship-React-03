import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Input, Label, Button } from "reactstrap"

import { storeData } from "../Stores/StoreStore"
import { getStore, storeDataResp } from "../Services/Store"

import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap"

function StoreManagement() {
  const [activeTab, setActiveTab] = useState("1")
  const AppState = useSelector((state) => state)
  const Dispatch = useDispatch()
  console.log(AppState)
  const [appFormData, setAppFormData] = useState({
    banner: "",
    logo: "",
  })
  useEffect(() => {
    getStore(AppState.user.token, AppState.user.store_id).then(() => {
      console.log(storeDataResp.data)
      Dispatch(storeData(storeDataResp.data))
    })
  }, [])
  console.log(appFormData.logo)
  return (
    <div className="container store-management">
      <h1 className="">Store Application</h1>
      <div className="form-wrapper">
        <div className="topSection">
          {appFormData.logo != "" || appFormData.banner != "" ? (
            <div className="imageSaveBtns">
              <Button color="success" size="sm">
                Save
              </Button>
              <Button color="success" size="sm">
                Cancel
              </Button>
            </div>
          ) : (
            ""
          )}

          <Label for="exampleFileBanner" sm={6}>
            <div className="wrapper">{!appFormData.banner ? <img src={"http://127.0.0.1:8000" + AppState.stores.storeData.banner_path} /> : <img src={appFormData.banner} />}</div>
          </Label>

          <div className="line"></div>
          <h1>{AppState.stores.storeData.name}</h1>
          <Label for="exampleFileBrand" sm={6}>
            <div className="wrapper">{!appFormData.logo ? <img src={"http://127.0.0.1:8000" + AppState.stores.storeData.logo_path} /> : <img src={appFormData.logo} />}</div>
          </Label>
        </div>

        <Input
          id="exampleFileBanner"
          name="file"
          type="file"
          onChange={(e) => {
            setAppFormData((prev) => ({ ...prev, banner: URL.createObjectURL(e.target.files[0]) }))
          }}
        />

        <Input
          id="exampleFileBrand"
          name="file"
          type="file"
          onChange={(e) => {
            setAppFormData((prev) => ({ ...prev, logo: URL.createObjectURL(e.target.files[0]) }))
          }}
        />
      </div>
      <div className="store-lists mt-5">
        <Nav tabs>
          <NavItem>
            <NavLink className={activeTab == "1" ? "active" : ""} onClick={() => setActiveTab("1")}>
              Products
            </NavLink>
          </NavItem>
          {AppState.user.userSpec == 1 && (
            <NavItem>
              <NavLink className={activeTab == "2" ? "active" : ""} onClick={() => setActiveTab("2")}>
                Workers
              </NavLink>
            </NavItem>
          )}
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">Product Content</TabPane>
          <TabPane tabId="2">Worker Content</TabPane>
        </TabContent>
      </div>
    </div>
  )
}

export default StoreManagement
