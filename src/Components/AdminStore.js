import React, { useEffect, useState } from "react"

import { useSelector, useDispatch } from "react-redux"
import { takePendingStores, takeDependingStores, countStore } from "../Stores/StoreStore"

import { Table, Nav, NavItem, NavLink, TabContent, TabPane, Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap"
import { getStores, allStoresRes, catDestroy, acceptStore } from "../Services/Store"

let storePending = [],
  storeDepending = []
function AdminStore(args) {
  const AppState = useSelector((state) => state)
  const Dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState("1")
  const [modal1, setModal1] = useState(false)
  const [theStore, setTheStore] = useState({})
  const toggle1 = () => setModal1(!modal1)

  useEffect(() => {
    getStores(AppState.user.token).then(() => {
      allStoresRes.data.map((item, index) => {
        if (item.status === 1) {
          storePending.push(item)
        } else {
          storeDepending.push(item)
        }
      })

      Dispatch(takePendingStores(storePending))
      console.log(storePending)
      Dispatch(takeDependingStores(storeDepending))
    })
    storePending = []
    storeDepending = []
  }, [AppState.stores.storeCounter])

  const pendingStoresList = () => {
    return AppState.stores?.pending.map((item, index) => {
      return (
        <tr key={index} id="storePendingItems" onClick={(e) => openModalStore(e, item.id, item.store_to_user.id)}>
          <th scope="row">{index + 1}</th>
          <td> {item.name}</td>
          <td> {item.email}</td>
          <td> {item.store_to_user.name}</td>
          <td> {item.store_to_user.email}</td>
        </tr>
      )
    })
  }
  console.log(AppState.stores.depending)
  const dependingStoresList = () => {
    return AppState.stores.depending?.map((item, index) => {
      return (
        <tr key={index}>
          <th scope="row">{index + 1}</th>
          <td> {item.name}</td>
          <td> {item.email}</td>
          <td> {item.store_to_user.name}</td>
          <td> {item.store_to_user.email}</td>
        </tr>
      )
    })
  }
  function openModalStore(e, id, user_id) {
    setModal1(true)
    setTheStore({
      store_id: id,
      user_id: user_id,
    })
  }
  function acceptHandler() {
    acceptStore(AppState.user.token, theStore.store_id, theStore.user_id).then(() => {
      console.log("store accepted!!")
      Dispatch(countStore())
      setModal1(false)
    })
  }

  function cancelHandler() {
    catDestroy(AppState.user.token, theStore.store_id).then(() => {
      console.log("store deleted!!")
      Dispatch(countStore())
      setModal1(false)
    })
  }
  return (
    <>
      <Nav tabs vertical className="w-25">
        <NavItem className="mt-4">
          <NavLink className={activeTab == "1" ? "active text-center" : "text-center"} onClick={() => setActiveTab("1")}>
            Pending Stores
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={activeTab == "2" ? "active text-center" : "text-center"} onClick={() => setActiveTab("2")}>
            All Stores
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab} className="w-75">
        <TabPane tabId="1">
          <Table responsive size="sm" hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Store Name</th>
                <th>Store email</th>
                <th>Name</th>
                <th>e-mail</th>
              </tr>
            </thead>
            <tbody>{pendingStoresList()}</tbody>
          </Table>
        </TabPane>
        <TabPane tabId="2">
          <Table responsive size="sm" striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Store Name</th>
                <th>Store email</th>
                <th>Name</th>
                <th>e-mail</th>
              </tr>
            </thead>
            <tbody>{dependingStoresList()}</tbody>
          </Table>
        </TabPane>
      </TabContent>
      <Modal isOpen={modal1} toggle={toggle1} {...args}>
        <ModalHeader toggle={toggle1}></ModalHeader>
        <ModalBody>
          <h6 className="text-center text-bold">Accepting Store??!!</h6>
          <div className="d-flex justify-content-around align-items-center">
            {theStore.store_id}
            <br />
            {theStore.user_id}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={(e) => acceptHandler(e)}>
            OK
          </Button>
          <Button color="danger" onClick={(e) => cancelHandler(e)}>
            Cancel
          </Button>
          <Button color="secondary" onClick={toggle1}>
            Back
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default AdminStore
