import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux/"

import { Modal, FormGroup, ModalHeader, ModalBody, ModalFooter, Button, Label, Input } from "reactstrap"

function AdminProduct(args) {
  const AppState = useSelector((state) => state)
  const [modal1, setModal1] = useState(false)
  const [proImg1, setProImg1] = useState()
  const [proImg2, setProImg2] = useState()
  const [proImg3, setProImg3] = useState()
  const toggle1 = () => {
    setModal1(!modal1)
  }
  const [product, setProduct] = useState({
    name: "",
    stock: 0,
    category: "",
    price: 0,
  })
  function selectMainList() {
    return AppState.cat.main?.map((item, index) => {
      return (
        <option key={index} value={item.id}>
          {item.name}
        </option>
      )
    })
  }
  console.log(AppState.cat)
  function selectSubList() {
    return AppState.cat.sub?.map((item, index) => {
      return (
        <option key={index} value={item.id}>
          {item.name}
        </option>
      )
    })
  }

  function productHandler() {}

  const allforMain = (k) => {
    let items = document.querySelectorAll(".new-product-images > .item")
    console.log(items)
    items.forEach((item) => {
      item.classList.remove("main-img")
    })
    items[k].classList.add("main-img")
  }

  return (
    <div className="container admin-product">
      <div className="top-sectioncreate-product-modal d-flex justify-content-center mt-5 w-100">
        <Button color="danger" onClick={toggle1}>
          Create Product
        </Button>
      </div>

      <Modal className="create-product-modal" isOpen={modal1} toggle={toggle1} {...args}>
        <ModalHeader toggle={toggle1}></ModalHeader>
        <ModalBody>
          <h6 className="text-center text-bold">Create Main Category</h6>
          <div className="d-flex flex-column justify-content-around align-items-center">
            <div>
              <Input className="mb-3 w-100 selectMainCat" type="select">
                <option>Select Main Category</option>
                {selectMainList()}
              </Input>
              <Input className="mb-3 w-100 selectMainCat" type="select">
                <option>Select Sub Category</option>
                {selectSubList()}
              </Input>
              <FormGroup floating className="mt-2">
                <Input id="newproduct-name" name="name" placeholder="Name" type="text" />
                <Label size="sm" for="newproduct-name">
                  Name
                </Label>
              </FormGroup>
            </div>
            <div className="new-product-images d-flex">
              <div className="text-center item main-img">
                <label htmlFor="newProductImage01">
                  <input
                    id="newProductImage01"
                    type="file"
                    onChange={(e) => {
                      setProImg1(URL.createObjectURL(e.target.files[0]))
                    }}
                  />
                  <img src={proImg1} />
                </label>
                <div className="item-btn" color="primary" onClick={() => allforMain(0)}>
                  Main
                </div>
              </div>
              <div className="text-center item">
                <label htmlFor="newProductImage02">
                  <input
                    id="newProductImage02"
                    type="file"
                    onChange={(e) => {
                      setProImg2(URL.createObjectURL(e.target.files[0]))
                    }}
                  />
                  <img src={proImg2} />
                </label>
                <div className="item-btn" color="primary" onClick={() => allforMain(1)}>
                  Main
                </div>
              </div>
              <div className="text-center item ">
                <label htmlFor="newProductImage03">
                  <input
                    id="newProductImage03"
                    type="file"
                    onChange={(e) => {
                      setProImg3(URL.createObjectURL(e.target.files[0]))
                    }}
                  />

                  <img src={proImg3} />
                </label>
                <div className="item-btn" color="primary" onClick={() => allforMain(2)}>
                  Main
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => productHandler()}>
            Create!!
          </Button>
          <Button color="secondary" onClick={toggle1}>
            Back
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default AdminProduct
