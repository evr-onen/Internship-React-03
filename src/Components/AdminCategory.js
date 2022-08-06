import React, { useEffect, useState } from "react"

import { useSelector, useDispatch } from "react-redux"
import { countAddMain } from "../Stores/catStore"

import { Modal, Button, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup } from "reactstrap"

import CatTable from "./CatTable"
import { catCreate, res } from "../Services/Category"

function AdminCategory(args) {
  const [modal1, setModal1] = useState(false)
  const [modal2, setModal2] = useState(false)

  const toggle1 = () => {
    setModal1(!modal1)
  }
  const toggle2 = () => setModal2(!modal2)

  const Dispatch = useDispatch()

  const [catNameValue, setCatNameValue] = useState("")
  const appState = useSelector((state) => state)

  function catHandler(mainId = 0) {
    catCreate(appState.user.token, catNameValue, mainId).then(() => {
      if (res.status == 200) {
        setModal1(false)
        setModal2(false)
        setCatNameValue("")
        Dispatch(countAddMain())
      } else {
        console.log("catCreate fail")
      }
    })
  }
  function selectMainList() {
    return appState.cat.main?.map((item, index) => {
      return (
        <option key={index} value={item.id}>
          {item.name}
        </option>
      )
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
            <Button color="primary" onClick={() => catHandler()}>
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
            <div className="d-flex flex-column justify-content-around align-items-center">
              <Input className="mb-3 w-50 selectMainCat" type="select">
                <option>Select Main menu</option>
                {selectMainList()}
              </Input>
              <FormGroup floating className="mt-2">
                <Input
                  id="subcat-modal-input"
                  name="name"
                  placeholder="Name"
                  type="text"
                  value={catNameValue}
                  onChange={(e) => {
                    setCatNameValue(e.target.value)
                  }}
                />
                <Label size="sm" for="subcat-modal-input">
                  Name
                </Label>
              </FormGroup>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={(e) => {
                catHandler(e.target.parentElement.previousElementSibling.querySelector(".selectMainCat").value)
              }}
            >
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
