import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { editModalData, productCounter } from "../Stores/FreeStyle"
import { takeAdminProducts, countProduct } from "../Stores/ProductStore"
import { productUpdate } from "../Services/Product"

import { Table, Modal, FormGroup, ModalHeader, ModalBody, ModalFooter, Button, Label, Input } from "reactstrap"

import { getProducts, getallproducts, productDestroy } from "../Services/Product"
let modalData = {}
function ProductsTable(args) {
  const AppState = useSelector((state) => state)
  const Dispatch = useDispatch()

  const [modal1, setModal1] = useState(false)
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

  useEffect(() => {
    getProducts(AppState.user.token).then(() => {
      Dispatch(takeAdminProducts(getallproducts))
    })
  }, [AppState.product.productCounter])

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
    console.log(product.cat_mainid)
    if (product.cat_mainid === 0 || product.cat_mainid === "Select Main Category") {
      return AppState.cat.sub?.map((item, index) => {
        return (
          <option key={index} value={item.id}>
            {item.name}
          </option>
        )
      })
    } else {
      return AppState.cat.sub?.map((item, index) => {
        return product.cat_mainid == item.main_id ? (
          <option key={index} value={item.id}>
            {item.name}
          </option>
        ) : (
          "asdasd"
        )
      })
    }
  }

  const allforMain = (k) => {
    let items = document.querySelectorAll(".new-product-images > .item")
    console.log(items)
    items.forEach((item) => {
      item.classList.remove("main-img")
    })
    items[k].classList.add("main-img")
  }
  console.log(AppState)

  function editProductSubmit() {
    let fs = [],
      fsx = []
    document.querySelectorAll(".new-product-images > .item").forEach((item) => {
      if (item.classList.contains("main-img")) fsx.push(item.querySelector("input").files[0])
      else fs.push(item.querySelector("input").files[0])
    })
    for (let i in fs) {
      fsx.push(fs[i])
    }

    productUpdate(AppState.user.token, product.id, product.name, product.description, product.cat_id, fsx[0], fsx[1], fsx[2], product.ids[0], product.ids[1], product.ids[2])
    Dispatch(countProduct())
    setModal1(false)
  }

  function editHandler(e, id, name, catid) {
    setModal1(true)
    let catname, catmain_id, catmain_name

    let ids = []
    let paths = []

    AppState.cat.sub.map((item) => {
      if (item.id === catid) {
        catname = item.name
        catmain_id = item.main_id
        catmain_name = item.main_name
      }
    })

    e.target
      .closest("tr")
      .querySelectorAll(".imgs-wrapper img")
      .forEach((el) => {
        ids.push(el.getAttribute("alt"))
        paths.push(el.getAttribute("src"))
      })
    modalData = { id, name, cat: { catid, catname, catmain_id, catmain_name }, ids, paths }
    Dispatch(editModalData(modalData))

    setProImg1(paths[0])
    setProImg2(paths[1])
    setProImg3(paths[2])
    setProduct({
      id: modalData.id,
      name: modalData.name,
      description: "lorem ipsum",
      cat_id: modalData.cat.catid,
      cat_mainid: modalData.cat.catmain_id,
      ids: modalData.ids,
      paths: modalData.paths,
    })
  }
  function listProductsItems(data) {
    return data.map((item, index) => {
      return (
        <tr key={index} onClick={(e) => editHandler(e, item.id, item.name, item.cat_id)}>
          <th scope="row">{index + 1}</th>
          <td>
            {item.images.map((it, ind) => {
              return (
                <div key={ind} className="imgs-wrapper">
                  <img src={"http://127.0.0.1:8000" + it.path} alt={it.id} />
                </div>
              )
            })}
          </td>
          <td>{item.name}</td>
          <td>{AppState.cat.sub.map((subby, index) => (item.cat_id === subby.id ? subby.name : ""))}</td>
        </tr>
      )
    })
  }
  function deleteProduct() {
    productDestroy(AppState.user.token, modalData.id)
    Dispatch(countProduct())
    setModal1(false)
    console.log(modalData.id)
  }

  useEffect(() => {
    AppState.cat.sub.map((item) => {
      if (item.id == product.cat_id) {
        setProduct((prev) => ({ ...prev, main_id: item.main_id }))
      }
    })
  }, [product.cat_id])

  return (
    <>
      <div className="table mt-5 w-100 ">
        <Table hover className="mx-auto w-50">
          <thead>
            <tr>
              <th>#</th>
              <th>Images</th>
              <th>Name</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>{listProductsItems(AppState.product.forAdmin)}</tbody>
        </Table>
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
                value={product.cat_mainid}
                onChange={(e) => {
                  setProduct((prev) => ({ ...prev, cat_mainid: e.target.value }))
                }}
              >
                <option>Select Main Category</option>
                {selectMainList()}
              </Input>
              <Input
                className="mb-3 w-100 selectMainCat"
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
          <Button color="primary" onClick={() => editProductSubmit()}>
            Edit!!
          </Button>
          <Button color="danger" onClick={() => deleteProduct()}>
            DELETE!!
          </Button>
          <Button color="secondary" onClick={toggle1}>
            Back
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default ProductsTable
