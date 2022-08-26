import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getStore, storeDataResp } from "../Services/Store"
import { Card, CardBody, CardTitle, CardSubtitle, Button, ButtonGroup } from "reactstrap"
import { takeToken, takeTokenData } from "../Stores/userStore"
import { Label, Input, FormGroup } from "reactstrap"
import { getFrontCats } from "../Stores/catStore"
import { productsHome, frontPageProducts } from "../Services/Product"
import { useNavigate } from "react-router-dom"
import ReactPaginate from "react-paginate"
import ReactDOM from "react-dom"

let cats = [],
  arrCats = []
let checkList = []
let storeObjs = []
let url = new URL(window.location)
let para = window.location.search
function FrontPage() {
  const Navigate = useNavigate()
  const AppState = useSelector((state) => state)
  const Dispatch = useDispatch()
  if (AppState.user.store_id) getStore(AppState.user.token, AppState.user.store_id)
  const [products, setProducts] = useState([])
  const [checks, setChecks] = useState([])
  const [searchWord, setSearchWord] = useState("")
  const [storeSelect, setStoreSelect] = useState(0)

  useEffect(() => {
    frontPageProducts(AppState.user.token, decodeURI(url.search)).then(() => {
      setTimeout(() => {
        console.log(productsHome.data)
        setProducts(productsHome.data)
      }, 400)
    })
  }, [])

  useEffect(() => {
    cats = {}
    let productsHomeArr
    if (productsHome.data != undefined) {
      productsHomeArr = Object.values(productsHome.data)
    }

    /* setTimeout(() => {
      if (Object.is(productsHome.data)) productsHomeArr = Object.values(productsHome.data)
    }, 400) */
    /* console.log(productsHomeArr) */
    for (let i in productsHomeArr) /* .map((itemm) =>  */ {
      AppState.cat.sub.map((item) => {
        if (item.id == productsHomeArr[i].cat_id) {
          if (cats.hasOwnProperty(item.main_id)) {
            if (cats[item.main_id].subs.every((it) => it.sub_id != productsHomeArr[i].cat_id)) {
              cats[item.main_id].subs.push({ sub_id: item.id, sub_name: item.name })
            }
          } else {
            cats[item.main_id] = {}
            cats[item.main_id].main_id = item.main_id
            cats[item.main_id].main_name = item.main_name
            cats[item.main_id].subs = []
            if (cats[item.main_id].subs.every((it) => it.sub_id != productsHomeArr[i].cat_id)) {
              cats[item.main_id].subs.push({ sub_id: item.id, sub_name: item.name })
            }
          }
        }
      })
    }
    for (let i in cats) {
      arrCats.push(cats[i])
    }
    Dispatch(getFrontCats(arrCats))
    arrCats = []
  }, [products])

  function checboxEvents(e) {
    let parente = e.target.parentElement.parentElement
    let targetValue = e.target.previousElementSibling.value

    if (checks.indexOf(targetValue) != -1) {
      let filtered = checks.filter((item) => item != targetValue)
      checkList = filtered

      setChecks(filtered)
    } else {
      checkList.push(targetValue)
      setChecks((prev) => [...prev, targetValue])
      let uniqArr = checkList.filter((x, i, a) => a.indexOf(x) == i)
      setChecks(uniqArr)
    }

    let allChecks = parente.querySelectorAll("input")

    if (Array.from(allChecks).every((item) => checkList.indexOf(item.value) != -1)) {
      parente.parentElement.querySelector("input").checked = true
    } else {
      parente.parentElement.querySelector("input").checked = false
    }
  }

  function pressMainCat(e) {
    let checkArr = []
    if (e.target.previousSibling.checked === false) {
      Array.from(e.target.parentElement.querySelectorAll(".subs-item input")).forEach((item) => {
        item.checked = true
        if (checks.indexOf(item.value) == -1) {
          checkArr.push(item.value)
          setChecks((prev) => [...prev, item.value])
        }
      })
    } else {
      let filtered = checks
      Array.from(e.target.parentElement.querySelectorAll(".subs-item input")).map((item) => {
        console.log("item : ", item)

        filtered.splice(filtered.indexOf(item.value), 1)
        item.checked = false
      })
      setChecks(filtered)
    }
  }

  function catList() {
    return AppState.cat.frontCats.map((item, index) => {
      return (
        <div className="cat-wrapper" key={item.main_name + index}>
          {" "}
          <input id={item.main_name + item.main_id} type="checkbox" value={item.main_id} />
          <label
            htmlFor={item.main_name + item.main_id}
            className="unsel"
            onMouseDown={(e) => {
              e.preventDefault()
            }}
            onClick={(e) => {
              pressMainCat(e)
            }}
          >
            {item.main_name}
          </label>
          <div className="subs-item">
            {item.subs.map((it, ind) => {
              return (
                <div key={ind}>
                  <input id={it.sub_id} type="checkbox" value={it.sub_id} />
                  <label
                    htmlFor={it.sub_id}
                    className="unsel"
                    onMouseDown={(e) => {
                      e.preventDefault()
                    }}
                    onClick={(e) => {
                      checboxEvents(e)
                    }}
                  >
                    {it.sub_name}
                  </label>
                </div>
              )
            })}
          </div>
        </div>
      )
    })
  }
  function productsList() {
    return products?.map((item, index) => {
      return (
        <Card
          style={{
            width: "12rem",
          }}
          className="m-3"
          key={index}
        >
          {console.log(item.store)}
          <img alt="Card image" src={"http://127.0.0.1:8000" + item.images[0].path} />
          <CardBody className="d-flex flex-column">
            <CardTitle className="text-center" tag="h5">
              {item.name}
            </CardTitle>
            <CardSubtitle className="mb-2 text-muted text-center" tag="h6">
              {AppState.cat.sub.map((it) => (it.id == item.cat_id ? it.name : ""))}
            </CardSubtitle>
            <CardSubtitle className="mb-2 text-muted text-center" tag="h6">
              {item.store[0].pivot.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".") + " ₺"}
            </CardSubtitle>
            <CardSubtitle className="mb-2 text-muted text-center" tag="h6">
              {/* {item.product_to_store?.store_id} */}
            </CardSubtitle>
            <Button className="mx-auto mt-4">Add to Card</Button>
          </CardBody>
        </Card>
      )
    })
  }
  let storesProduct

  function storeData() {
    storesProduct = products?.map((i) =>
      i?.store?.map((t) => {
        return {
          name: t.name,
          id: t.id,
        }
      })
    )
    storeObjs = []
    storesProduct.flat().forEach((item) => {
      if (storeObjs.every((i) => item.id != i.id)) {
        storeObjs.push(item)
      }
    })
  }
  function storeList() {
    storeData()
    return storeObjs.map((item, index) => {
      return (
        <option key={index} value={item.id}>
          {item.name}
        </option>
      )
    })
  }

  useEffect(() => {
    url.searchParams.set("page", 1)
    if (checks.length !== 0) {
      url.searchParams.set("cats", checks.toString())
    } else {
      url.searchParams.delete("cats")
    }
    if (searchWord != "") {
      url.searchParams.set("search", searchWord)
    } else {
      url.searchParams.delete("search")
    }
    if (storeSelect !== 0) {
      url.searchParams.set("store", storeSelect)
    } else {
      url.searchParams.delete("store")
    }
    Navigate(url.search)

    let para = window.location.search
    frontPageProducts(AppState.user.token, decodeURI(url.search)).then(() => {
      setTimeout(() => {
        setProducts(productsHome.data)
        console.log(productsHome)
      }, 400)
    })
  }, [checks, searchWord, storeSelect])

  //paginate//

  const handlePageClick = (event) => {
    let para = window.location.search
    url.searchParams.set("page", event.selected + 1)
    Navigate(url.search)
    let goToPage = event.selected
    frontPageProducts(AppState.user.token, decodeURI(url.search)).then(() => {
      // setTimeout(() => {
      let productCont = []

      setProducts(Object.values(productsHome.data))

      // }, 100)
    })
  }

  const [pagCount, setPagCount] = useState(2)
  var itemsPerPage = 1

  useEffect(() => {
    setPagCount(Math.ceil(productsHome.total / parseInt(itemsPerPage)))
    catList()
  }, [products])

  return (
    <div>
      <div className="frontpage container d-flex">
        <div className="col-3 side-menu">
          <div className="side-menu-wrapper">
            <div className="select-price"></div>
            <div className="input-search">
              <FormGroup>
                <Label for="exampleSelect" className="mt-4">
                  Search
                </Label>
                <Input
                  id="exampleSelect"
                  name="select"
                  type="text"
                  value={searchWord}
                  onChange={(e) => {
                    setTimeout(setSearchWord(e.target.value), 1000)
                  }}
                ></Input>
                <Button color="primary" className="mt-3">
                  Search!!
                </Button>
              </FormGroup>
            </div>
            <div className="check-cats mt-5">{catList()}</div>
            <div className="select-stores">
              <FormGroup>
                <Label for="exampleSelect" className="mt-4">
                  Stores
                </Label>
                <Input
                  id="exampleSelect"
                  name="select"
                  type="select"
                  value={storeSelect}
                  onChange={(e) => {
                    setStoreSelect(e.target.value)
                  }}
                >
                  <option>All Products</option>
                  {storeList()}
                </Input>
              </FormGroup>
            </div>
          </div>
        </div>
        <div className="col-9 main-menu p-3 d-flex flex-wrap">{productsList()}</div>
      </div>
      {/* {console.log(tree)} */}
      <div id="pagin">
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          pageCount={pagCount}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          // forcePage={urll == null ? 0 :(urll-1)}
        />
      </div>
    </div>
  )
}

export default FrontPage
