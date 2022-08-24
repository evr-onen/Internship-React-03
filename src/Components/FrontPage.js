import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getStore, storeDataResp } from "../Services/Store"
import { Card, CardBody, CardTitle, CardSubtitle, Button, ButtonGroup } from "reactstrap"
import { takeToken, takeTokenData } from "../Stores/userStore"
import { Label, Input, FormGroup } from "reactstrap"
import { getFrontCats } from "../Stores/catStore"
import { productsHome, frontPageProducts } from "../Services/Product"

let cats = [],
  arrCats = []
let checkList = []
let storeObjs = []
function FrontPage() {
  const AppState = useSelector((state) => state)
  const Dispatch = useDispatch()
  if (AppState.user.store_id) getStore(AppState.user.token, AppState.user.store_id)
  const [products, setProducts] = useState([])
  const [checks, setChecks] = useState([])
  const [searchWord, setSearchWord] = useState()
  useEffect(() => {
    frontPageProducts(AppState.user.token).then(() => {
      setTimeout(() => {
        setProducts(productsHome)
      }, 400)
    })
  }, [])

  useEffect(() => {
    cats = {}

    productsHome.map((itemm) => {
      AppState.cat.sub.map((item) => {
        if (item.id == itemm.cat_id) {
          if (cats.hasOwnProperty(item.main_id)) {
            if (cats[item.main_id].subs.every((it) => it.sub_id != itemm.cat_id)) {
              cats[item.main_id].subs.push({ sub_id: item.id, sub_name: item.name })
            }
          } else {
            cats[item.main_id] = {}
            cats[item.main_id].main_id = item.main_id
            cats[item.main_id].main_name = item.main_name
            cats[item.main_id].subs = []
            if (cats[item.main_id].subs.every((it) => it.sub_id != itemm.cat_id)) {
              cats[item.main_id].subs.push({ sub_id: item.id, sub_name: item.name })
            }
          }
        }
      })
    })
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
    console.log(storeObjs)
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
                    setSearchWord(e.target.value)
                  }}
                ></Input>
                <Button color="primary" className="mt-3">
                  Search!!
                </Button>
              </FormGroup>
            </div>
            <div className="check-cats" className="mt-5">
              {catList()}
            </div>
            <div className="select-stores">
              <FormGroup>
                <Label for="exampleSelect" className="mt-4">
                  Stores
                </Label>
                <Input id="exampleSelect" name="select" type="select">
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
    </div>
  )
}

export default FrontPage
