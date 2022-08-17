import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getStore, storeDataResp } from "../Services/Store"
import { Card, CardBody, CardTitle, CardSubtitle, Button, ButtonGroup } from "reactstrap"
import { takeToken, takeTokenData } from "../Stores/userStore"

import { getstoreProducts, getAllStoreProductsRes } from "../Services/StoreProduct"

function FrontPage() {
  const AppState = useSelector((state) => state)
  const Dispatch = useDispatch()
  if (AppState.user.store_id) getStore(AppState.user.token, AppState.user.store_id)
  const [products, setProducts] = useState([])

  console.log(AppState.user)
  useEffect(() => {
    getstoreProducts(AppState.user.token).then(() => {
      setProducts(getAllStoreProductsRes)
    })
  }, [])
  function takecats() {}
  console.log(products)
  function productsList() {
    return products?.map((item, index) => {
      return (
        <Card
          style={{
            width: "18rem",
          }}
          className="m-3"
          key={index}
        >
          <img alt="Card image" src="https://picsum.photos/300/200" />
          <CardBody className="d-flex flex-column">
            <CardTitle className="text-center" tag="h5">
              {item.store_to_product?.name}
            </CardTitle>
            <CardSubtitle className="mb-2 text-muted text-center" tag="h6">
              {AppState.cat.sub.map((it) => (it.id == item.store_to_product.cat_id ? it.name : ""))}
            </CardSubtitle>
            <CardSubtitle className="mb-2 text-muted text-center" tag="h6">
              {item.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")} ₺
            </CardSubtitle>
            <CardSubtitle className="mb-2 text-muted text-center" tag="h6">
              {item.store_id}
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
        <div className="col-9 main-menu p-3">{productsList()}</div>
      </div>
    </div>
  )
}

export default FrontPage
