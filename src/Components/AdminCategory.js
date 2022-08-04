import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import { Modal, Button, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup } from "reactstrap"
import CatTable from "./CatTable"

import { catCreate, res } from "../Services/Category"

function AdminCategory(args) {
  const [modal1, setModal1] = useState(false)
  const [modal2, setModal2] = useState(false)

  const toggle1 = () => setModal1(!modal1)
  const toggle2 = () => setModal2(!modal2)

  const [catNameValue, setCatNameValue] = useState()
  const appState = useSelector((state) => state.user)

  function mainCatHandler() {
    catCreate(appState.user.token, catNameValue, 0).then(() => {
      if (res.status == 200) {
        setModal1(!modal1)
        setCatNameValue("")
      } else {
        console.log("catCreate fail")
      }
    })
  }

  return (
    <>
      <div className="">
        <div className="modal-bts d-flex justify-content-around mt-5">
          <Button color="danger" onClick={toggle1}>
            Main Category
          </Button>
          <Button color="danger" onClick={toggle2}>
            Sub Category
          </Button>
        </div>
        <div className="category-list">
          <CatTable />
        </div>

        <Modal isOpen={modal1} toggle={toggle1} {...args}>
          <ModalHeader toggle={toggle1}></ModalHeader>
          <ModalBody>
            <h6 className="text-center text-bold">Create Main Category</h6>
            <div className="d-flex justify-content-around align-items-center">
              <FormGroup floating className="mt-2">
                <Input
                  id="maincat-modal-input"
                  name="name"
                  placeholder="Name"
                  type="text"
                  value={catNameValue}
                  onChange={(e) => {
                    setCatNameValue(e.target.value)
                  }}
                />
                <Label size="sm" for="maincat-modal-input">
                  Name
                </Label>
              </FormGroup>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => mainCatHandler()}>
              Create!!
            </Button>
            <Button color="secondary" onClick={toggle1}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={modal2} toggle={toggle2} {...args}>
          <ModalHeader toggle={toggle2}></ModalHeader>
          <ModalBody>
            <h6 className="text-center text-bold">Create Sub Category</h6>
            <div className="d-flex justify-content-around align-items-center">
              <FormGroup floating className="mt-2">
                <Input id="subcat-modal-input" name="name" placeholder="Name" type="text" />
                <Label size="sm" for="subcat-modal-input">
                  Name
                </Label>
              </FormGroup>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggle2}>
              Create!!
            </Button>
            <Button color="secondary" onClick={toggle2}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  )
}
export default AdminCategory
