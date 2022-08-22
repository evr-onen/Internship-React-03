import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Input, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from "reactstrap"

import { storeData } from "../Stores/StoreStore"
import { takeProduct } from "../Stores/ProductStore"
import { takeStoredProducts, refreshStoredProducts, storedProductCount } from "../Stores/StoreProduct"
import { getStore, storeDataResp, storeImageUpdate, storeImgResp } from "../Services/Store"
import { countTmp } from "../Stores/tmp"
import { storeProductCreate, storeProductUpdate, createResponse, updatedProductRes, getAllStoreProductsRes, getstoreProducts, storeProductDestroy, delProductRes } from "../Services/StoreProduct"
import { getProducts, getallproducts } from "../Services/Product"
import { workerAppCreate, getWorkerApps, getAllWorkers, workerAppDestroy } from "../Services/tmp"

import { Nav, NavItem, NavLink, TabContent, TabPane, Table } from "reactstrap"

function StoreManagement(args) {
  const AppState = useSelector((state) => state)
  useEffect(() => {
    getstoreProducts(AppState.user.token, AppState.user.store_id).then(() => {
      Dispatch(takeStoredProducts(getAllStoreProductsRes))
    })
    getStore(AppState.user.token, AppState.user.store_id).then(() => {
      Dispatch(storeData(storeDataResp.data))
    })
    getProducts(AppState.user.token).then(() => {
      Dispatch(takeProduct(getallproducts))
    })
  }, [])
  console.log(AppState)
  const [modal, setModal] = useState(false)
  const [modal2, setModal2] = useState(false)
  const toggle2 = () => setModal2(!modal2)
  const toggle = () => setModal(!modal)
  const [activeTab, setActiveTab] = useState("1")
  const [workerAppMail, setWorkerAppMail] = useState("")
  const Dispatch = useDispatch()
  const resetProduct = {
    id: 0,
    cat_id: 0,
    main_id: 0,
    product_id: 0,
    price: 0,
    stock: 0,
  }
  const [workers, setWorkers] = useState([])
  const [product, setProduct] = useState(resetProduct)
  const [sendAppId, setSendAppId] = useState(0)
  const [appFormData, setAppFormData] = useState({
    banner: "",
    logo: "",
  })
  const [images, setImages] = useState({
    banner: [],
    logo: [],
  })

  const storeProductList = () => {
    return AppState.stores.storeData?.products?.map((item, index) => {
      return (
        <tr
          key={index}
          onClick={() => {
            editModal(item.product_id, item.price, item.stock, item.product.cat_id, item.id)
          }}
        >
          <th scope="row">{index + 1}</th>
          <td>{item.name}</td>
          <td>{AppState.cat.sub.map((it) => (it.id == item.product.cat_id ? `${it.name}  /  ${it.main_name}` : ""))} </td>
          <td>{item.price}</td>
          <td>{item.stock}</td>
        </tr>
      )
    })
  }

  function cancelBtn() {
    setAppFormData({ banner: "", logo: "" })
  }

  function doneBtnEdit() {
    storeImageUpdate(AppState.user.token, AppState.user.store_id, images.banner, images.logo).then(() => {
      Dispatch(storeData(storeImgResp))

      setAppFormData({ banner: "", logo: "" })
      setImages({ banner: [], logo: [] })
    })
  }

  function createStoreProduct() {
    storeProductCreate(AppState.user.token, AppState.user.store_id, product.product_id, product.price, product.stock).then(() => {
      Dispatch(refreshStoredProducts(createResponse))
      toggle()
      Dispatch(storeData(createResponse))
    })
  }
  function updateStoreProduct() {
    storeProductUpdate(AppState.user.token, product.id, AppState.user.store_id, product.product_id, product.price, product.stock).then(() => {
      Dispatch(refreshStoredProducts(updatedProductRes))
      toggle()
      Dispatch(storeData(updatedProductRes))
    })
  }
  function deleteSubmit() {
    storeProductDestroy(AppState.user.token, product.id, AppState.user.store_id).then(() => {
      Dispatch(refreshStoredProducts(delProductRes.data))
      Dispatch(storeData(delProductRes.data))
      setModal(false)
      console.log(delProductRes)
    })
  }
  function selectMainList() {
    return AppState.cat.main?.map((item, index) => {
      return (
        <option key={index} value={item.id}>
          {item.name}
        </option>
      )
    })
  }

  function selectProductList() {
    if (product.main_id === 0 || product.main_id === "Select Main Category") {
      return AppState.product.products?.map((item, index) => {
        return (
          <option key={index} value={item.id}>
            {item.name}
          </option>
        )
      })
    } else {
      return AppState.product.products?.map((item, index) => {
        return product.cat_id == item.cat_id ? (
          <option key={index} value={item.id}>
            {item.name}
          </option>
        ) : (
          "bana ne bana ne"
        )
      })
    }
  }

  function selectSubList() {
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
    AppState.cat.sub.map((item) => {
      if (item.id == product.cat_id) {
        setProduct((prev) => ({ ...prev, main_id: item.main_id }))
      }
    })
  }, [product.cat_id])

  useEffect(() => {
    AppState.product.products.map((item) => {
      if (item.id == product.product_id) {
        setProduct((prev) => ({ ...prev, cat_id: item.cat_id }))
      }
    })
  }, [product.product_id])
  function createProductModal() {
    setModal(true)
    setTimeout(() => {
      //Modal açılmadan çalıstıgından kullandım. 1 bile olsa yeterli aslında nedense
      document.querySelector(".delete-btn").remove()
    }, 20)
  }
  function editModal(product_id, price, stock, cat_id, id) {
    setModal(true)
    setTimeout(() => {
      setProduct({ cat_id, main_id: 0, product_id, price, stock, id })

      AppState.cat.sub.map((it) => (it.id == cat_id ? setProduct((prev) => ({ ...prev, main_id: it.main_id })) : ""))

      document.querySelector(".storeProduct-modal .modal-footer .create-btn").textContent = "Edit"
    }, 20)
  }

  function editCreateSubmit() {
    if (document.querySelector(".storeProduct-modal .modal-footer .create-btn").textContent === "Edit") {
      updateStoreProduct()
    } else {
      createStoreProduct()
    }
  }

  function cancelWorkerAppModal(e) {
    setSendAppId(e.target.parentElement.id)
    setModal2(true)
    setTimeout(() => {
      document.querySelector(".createCancel-modalbtn").textContent = "Cancel"
      document.querySelector("#worker-email").remove()
      document.querySelector(".modal-body label").remove()
      document.querySelector(".modal-body").innerHTML = `
      <h4 className="text-align"> Are You Sure !!</h4>  
      `
    }, 200)
  }

  useEffect(() => {
    getWorkerApps(AppState.user.token, AppState.user.store_id).then(() => {
      setWorkers(getAllWorkers)
    })
  }, [AppState.tmp.count])

  function workerAppList() {
    return workers?.map((item, index) => {
      return (
        <tr
          id={item.id}
          key={index}
          onClick={(e) => {
            cancelWorkerAppModal(e)
          }}
        >
          <th scope="row">{index + 1}</th>
          <td>{item.user?.name}</td>
          <td></td>
          <td></td>
          <td>{item.status == 1 ? "Pending" : "Active"}</td>
        </tr>
      )
    })
  }

  function submitWorkerApp() {
    if (document.querySelector(".createCancel-modalbtn").textContent == "Send Application") {
      workerAppCreate(AppState.user.token, AppState.user.store_id, workerAppMail).then(() => {
        Dispatch(countTmp())
        setModal2(false)
      })
    } else {
      console.log("delete")
      workerAppDestroy(AppState.user.token, sendAppId).then(() => {
        Dispatch(countTmp())
        setModal2(false)
      })
    }
  }
  return (
    <div className="container store-management">
      <h1 className="">Store Management</h1>
      <div className="form-wrapper">
        <div className="topSection">
          {appFormData.logo != "" || appFormData.banner != "" ? (
            <div className="imageSaveBtns">
              <Button color="success" size="sm" className="done-btn" onClick={() => doneBtnEdit()}>
                Save
              </Button>
              <Button color="success" size="sm" className="cancel-btn" onClick={() => cancelBtn()}>
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
            setImages((prev) => ({ ...prev, banner: e.target.files[0] }))
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
          <TabPane tabId="1">
            <Table className="productTable" hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                </tr>
              </thead>
              <tbody>
                {storeProductList()}
                <tr className="createProduct" onClick={() => createProductModal()}>
                  <th colSpan="5">+</th>
                </tr>
              </tbody>
            </Table>
          </TabPane>
          <TabPane tabId="2">
            <Table className="productTable" hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>e-mail</th>
                  <th>Phone</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {workerAppList()}
                <tr
                  className="createProduct"
                  onClick={() => {
                    setModal2(true)
                  }}
                >
                  <th colSpan="5">+</th>
                </tr>
              </tbody>
            </Table>
          </TabPane>
        </TabContent>
      </div>
      <Modal
        className="storeProduct-modal"
        isOpen={modal}
        toggle={() => {
          setTimeout(() => {
            setProduct(resetProduct)
          }, 200)
          toggle()
        }}
        {...args}
      >
        <ModalHeader
          toggle={() => {
            setTimeout(() => {
              setProduct(resetProduct)
            }, 200)
            toggle()
          }}
        >
          Create Product for Your Store
        </ModalHeader>
        <ModalBody>
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
          <FormGroup className="mt-2">
            <Label className="mt-4" for="productName">
              Product Name
            </Label>
            <Input
              className="select-product"
              id="newproduct-name"
              name="productName"
              type="select"
              value={product.product_id}
              onChange={(e) => {
                setProduct((prev) => ({ ...prev, product_id: e.target.value }))
              }}
            >
              <option>Select Product</option>
              {selectProductList()}
            </Input>
            <Label className="mt-4" for="productPrice">
              Price
            </Label>
            <Input
              id="productPrice"
              name="Price"
              placeholder="Price"
              type="number"
              value={product.price}
              onChange={(e) => {
                setProduct((prev) => ({ ...prev, price: e.target.value }))
              }}
            />
            <Label className="mt-4" for="productPrice">
              Stock
            </Label>
            <Input
              id="productStock"
              name="Stock"
              placeholder="Stock"
              type="number"
              value={product.stock}
              onChange={(e) => {
                setProduct((prev) => ({ ...prev, stock: e.target.value }))
              }}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            className="create-btn"
            color="primary"
            onClick={() => {
              editCreateSubmit()
            }}
          >
            Create
          </Button>{" "}
          <Button
            className="delete-btn"
            color="danger"
            onClick={() => {
              deleteSubmit()
            }}
          >
            Delete
          </Button>{" "}
          <Button
            color="secondary"
            onClick={() => {
              setTimeout(() => {
                setProduct(resetProduct)
              }, 200)
              toggle()
            }}
          >
            back
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={modal2} toggle={toggle2} {...args}>
        <ModalHeader>Make Worker</ModalHeader>
        <ModalBody>
          <FormGroup floating>
            <Input
              id="worker-email"
              name="email"
              placeholder="e-mail"
              type="text"
              value={workerAppMail}
              onChange={(e) => {
                setWorkerAppMail(e.target.value)
              }}
            />
            <Label for="worker-email">e-mail</Label>
          </FormGroup>{" "}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={(e) => submitWorkerApp(e)} className="createCancel-modalbtn">
            Send Application
          </Button>{" "}
          <Button color="secondary" onClick={toggle2}>
            Back
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default StoreManagement
