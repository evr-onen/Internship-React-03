import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux/"
import { closeModal } from "../Stores/FreeStyle"
import { productCreate } from "../Services/Product"
import { countProduct } from "../Stores/ProductStore"

import { Modal, FormGroup, ModalHeader, ModalBody, ModalFooter, Button, Label, Input } from "reactstrap"

import ProductsTable from "./ProductsTable"
function AdminProduct(args) {
  const AppState = useSelector((state) => state)
  const Dispatch = useDispatch()
  const [modal1, setModal1] = useState(false)
  const [selectedMain, setSelectedMain] = useState(0)
  const [proImg1, setProImg1] = useState()
  const [proImg2, setProImg2] = useState()
  const [proImg3, setProImg3] = useState()
  const toggle1 = () => {
    setModal1(!modal1)
  }
  const [product, setProduct] = useState({
    name: "",
    description: "lorem ipsum",
    cat_id: 0,
    main_id: 0,
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

  function selectSubList() {
    console.log(product.main_id)
    if (product.main_id === 0 || product.main_id === "Select Main Category") {
      return AppState.cat.sub?.map((item, index) => {
        return (
          <option key={index} value={item.id}>
            {item.name}
          </option>
        )
      })
    } else {
      return AppState.cat.sub?.map((item, index) => {
        return product.main_id == item.main_id ? (
          <option key={index} value={item.id}>
            {item.name}
          </option>
        ) : (
          "asdasd"
        )
      })
    }
  }
  useEffect(() => {
    const selectforMain = (e) => {
      return AppState.cat.sub?.map((item, index) => {
        if (document.querySelector(".selectMainCat").value != 0 || document.querySelector(".selectMainCat").value == item.main_id) {
          return (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          )
        }
      })
    }
  }, [])

  const allforMain = (k) => {
    let items = document.querySelectorAll(".new-product-images > .item")
    console.log(items)
    items.forEach((item) => {
      item.classList.remove("main-img")
    })
    items[k].classList.add("main-img")
  }

  function createProduct() {
    let fs = [],
      fsx = []
    // let data = new FormData()
    document.querySelectorAll(".new-product-images > .item").forEach((item) => {
      if (item.classList.contains("main-img")) fsx.push(item.querySelector("input").files[0])
      else fs.push(item.querySelector("input").files[0])
    })
    for (let i in fs) {
      fsx.push(fs[i])
    }
    // data.append("file1", fsx[0])
    // data.append("file2", fsx[1])
    // data.append("file3", fsx[2])

    // data.append("name", product.name)
    // data.append("description", product.description)
    // data.append("cat_id", product.cat_id)

    productCreate(AppState.user.token, product.name, product.description, product.cat_id, fsx[0], fsx[1], fsx[2])
    Dispatch(countProduct())
    setModal1(false)
    setProImg1([])
    setProImg2([])
    setProImg3([])
    setProduct({ name: "", description: "lorem ipsum", cat_id: 0 })
  }
  useEffect(() => {
    AppState.cat.sub.map((item) => {
      if (item.id == product.cat_id) {
        setProduct((prev) => ({ ...prev, main_id: item.main_id }))
      }
      console.log(product.main_id)
    })
  }, [product.cat_id])

  /* useEffect(() => {
    AppState.cat.sub.map((item) => {
      if (item.id == product.cat_id) {
        setProduct((prev) => ({ ...prev, main_id: item.main_id }))
      }
      console.log(product.main_id)
    })
  }, [product.main_id]) */

  return (
    <div className="container admin-product">
      <div className="top-sectioncreate-product-modal d-flex justify-content-center mt-5 w-100">
        <Button color="danger" onClick={toggle1}>
          Create Product
        </Button>
      </div>
      <div className="products-table d-flex justify-content-center align-self-center">
        <ProductsTable />
      </div>
      <Modal className="create-product-modal" isOpen={modal1} toggle={toggle1} {...args}>
        <ModalHeader toggle={toggle1}></ModalHeader>
        <ModalBody>
          <h6 className="text-center text-bold">Create Main Category</h6>
          <div className="d-flex flex-column justify-content-around align-items-center">
            <div>
              <Input
                className="mb-3 w-100 selectMainCat"
                type="select"
                value={product.main_id}
                onChange={(e) => {
                  setProduct((prev) => ({ ...prev, main_id: e.target.value }))
                }}
              >
                <option>Select Main Category</option>
                {selectMainList()}
              </Input>
              <Input
                className="mb-3 w-100 selectsubCat"
                value={product.cat_id}
                type="select"
                onChange={(e) => {
                  setProduct((prev) => ({ ...prev, cat_id: e.target.value }))
                }}
              >
                <option>Select Sub Category</option>
                {selectSubList()}
              </Input>
              <FormGroup floating className="mt-2">
                <Input
                  id="newproduct-name"
                  name="name"
                  placeholder="Name"
                  value={product.name}
                  type="text"
                  onChange={(e) => {
                    setProduct((prev) => ({ ...prev, name: e.target.value }))
                  }}
                />
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
          <Button color="primary" onClick={() => createProduct()}>
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
