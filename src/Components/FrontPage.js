import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getStore, storeDataResp } from "../Services/Store"
import { Card, CardBody, CardTitle, CardSubtitle, Button, ButtonGroup } from "reactstrap"
import { takeToken, takeTokenData } from "../Stores/userStore"

import { productsHome, frontPageProducts } from "../Services/Product"

function FrontPage() {
  const AppState = useSelector((state) => state)
  const Dispatch = useDispatch()
  if (AppState.user.store_id) getStore(AppState.user.token, AppState.user.store_id)
  const [products, setProducts] = useState([])

  console.log(AppState.user)
  useEffect(() => {
    frontPageProducts(AppState.user.token).then(() => {
      setProducts(productsHome)
    })
  }, [])

  function takecats() {}
  const getstoreprice = (tttt) => {
    tttt.sort(function (a, b) {
      return a.price - b.price
    })
  }

  function productsList() {
    console.log(products)
    return products?.map((item, index) => {
      if (item.product_to_store.length != 0) {
        let ttt = item.product_to_store.sort((a, b) => {
          return a.price - b.price
        })

        return (
          <Card
            style={{
              width: "18rem",
            }}
            className="m-3"
            key={index}
          >
            <img alt="Card image" src={"http://localhost:3000/" + item.images[0].path} />
            <CardBody className="d-flex flex-column">
              <CardTitle className="text-center" tag="h5">
                {item.name}
              </CardTitle>
              <CardSubtitle className="mb-2 text-muted text-center" tag="h6">
                {AppState.cat.sub.map((it) => (it.id == item.cat_id ? it.name : ""))}
              </CardSubtitle>
              <CardSubtitle className="mb-2 text-muted text-center" tag="h6">
                {ttt[0].price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".") + " ₺"}
              </CardSubtitle>
              <CardSubtitle className="mb-2 text-muted text-center" tag="h6">
                {/* {item.product_to_store?.store_id} */}
              </CardSubtitle>
              <Button className="mx-auto mt-4">Add to Card</Button>
            </CardBody>
          </Card>
        )
      }
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
        <div className="col-9 main-menu p-3">{productsList()}</div>
      </div>
    </div>
  )
}

export default FrontPage
