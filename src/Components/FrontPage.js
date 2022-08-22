import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getStore, storeDataResp } from "../Services/Store"
import { Card, CardBody, CardTitle, CardSubtitle, Button, ButtonGroup } from "reactstrap"
import { takeToken, takeTokenData } from "../Stores/userStore"

import { productsHome, frontPageProducts } from "../Services/Product"

let cat = {},
  cats = []
let items = {},
  arrCats = []
function FrontPage() {
  const AppState = useSelector((state) => state)
  const Dispatch = useDispatch()
  if (AppState.user.store_id) getStore(AppState.user.token, AppState.user.store_id)
  const [products, setProducts] = useState([])

  useEffect(() => {
    frontPageProducts(AppState.user.token).then(() => {
      setProducts(productsHome)
    })
    makeCatsObj()
  }, [])

  function makeCatsObj() {
    cat = {}
    cats = []
    items = {}
    arrCats = []
    products.map((item) => {
      cat.sub_id = item.cat_id
      AppState.cat.sub.map((it) => {
        if (it.id == item.cat_id) {
          cat.sub_name = it.name
          cat.main_id = it.main_id
          cat.main_name = it.main_name
        }
      })
      cats.push(cat)
    })

    console.log(cats)
    setTimeout(() => {
      cats.forEach((cat) => {
        let mainID = cat.main_id
        if (items.hasOwnProperty(toString(cat.main_id))) {
          // if (items[cat.main_id].subs.every((item) => item.id != cat.sub_id)) {
          items[cat.main_id].subs.push({ id: cat.sub_id, name: cat.sub_name })

          //   console.log("çalısiyı buu")
          // } else {
          //   console.log("asdasd")
          // }
          /*  if (items[cat.main_id].subs.map(cat.sub_id) == -1) {
            
          } */
          console.log("+")
        } else {
          items[cat.main_id] = {}
          items[cat.main_id].main_id = cat.main_id
          items[cat.main_id].main_name = cat.main_name
          items[cat.main_id].subs = []
          items[cat.main_id].subs.push({ id: cat.sub_id, name: cat.sub_name })
          console.log("-")
        }
      })

      for (let i in items) {
        arrCats.push(items[i])
      }
      console.log(items)
    }, 2)
  }

  // function catList() {
  //   return items.map((item, index) => {
  //     return (
  //       <div className="cat-wrapper">
  //         {" "}
  //         <label htmlFor="{item.main_name + item.main_id}">
  //           {item.main_name}
  //           <input id={item.main_name + item.main_id} type="checkbox" value={item.main_id} />
  //         </label>
  //       </div>
  //     )
  //   })
  // }
  function catList() {
    // for (let i in items) {

    // }
    return items.map((item, index) => {
      return (
        <div className="cat-wrapper">
          {" "}
          <label htmlFor="{item.main_name + item.main_id}">
            {item.main_name}
            <input id={item.main_name + item.main_id} type="checkbox" value={item.main_id} />
          </label>
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
            <div className="check-cats"></div>
            <div className="select-stores"></div>
          </div>
        </div>
        <div className="col-9 main-menu p-3 d-flex flex-wrap">{productsList()}</div>
      </div>
    </div>
  )
}

export default FrontPage
