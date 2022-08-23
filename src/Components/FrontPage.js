import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getStore, storeDataResp } from "../Services/Store"
import { Card, CardBody, CardTitle, CardSubtitle, Button, ButtonGroup } from "reactstrap"
import { takeToken, takeTokenData } from "../Stores/userStore"

import { getFrontCats } from "../Stores/catStore"
import { productsHome, frontPageProducts } from "../Services/Product"

let cats = [],
  arrCats = [],
  checks = []
function FrontPage() {
  const AppState = useSelector((state) => state)
  const Dispatch = useDispatch()
  if (AppState.user.store_id) getStore(AppState.user.token, AppState.user.store_id)
  const [products, setProducts] = useState([])
  const [checks, setChecks] = useState([])

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
      setChecks(filtered)
    } else {
      setChecks((prev) => [...prev, targetValue])
    }
    let allChecks = parente
    if (parente.querySelectorAll("input").every((item) => checks.indexOf(item.value) != -1)) {
      parente.parentElement.querySelector("input").checked = true
    }
    console.log(parente.querySelectorAll("input"))
  }
  function catList() {
    return AppState.cat.frontCats.map((item, index) => {
      return (
        <div className="cat-wrapper" key={item.main_name + index}>
          {" "}
          <input id={item.main_name + item.main_id} type="checkbox" value={item.main_id} />
          <label htmlFor={item.main_name + item.main_id} className="unsel">
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
  return (
    <div>
      <div className="frontpage container d-flex">
        <div className="col-3 side-menu">
          <div className="side-menu-wrapper">
            <div className="select-price"></div>
            <div className="check-cats">{catList()}</div>
            <div className="select-stores"></div>
          </div>
        </div>
        <div className="col-9 main-menu p-3 d-flex flex-wrap">{productsList()}</div>
      </div>
      {/* {console.log(tree)} */}
    </div>
  )
}

export default FrontPage
