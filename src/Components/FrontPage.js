import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getStore, storeDataResp } from "../Services/Store"
import { Card, CardBody, CardTitle, CardSubtitle, Button, ButtonGroup } from "reactstrap"
import { takeToken, takeTokenData } from "../Stores/userStore"

function FrontPage() {
  const AppState = useSelector((state) => state)
  const Dispatch = useDispatch()
  if (AppState.user.store_id) getStore(AppState.user.token, AppState.user.store_id)
  console.log(AppState.user)
  return (
    <div>
      <div className="frontpage container d-flex">
        <div className="col-3 side-menu">raining cats and dogs</div>
        <div className="col-9 main-menu p-3">
          <Card
            style={{
              width: "18rem",
            }}
          >
            <img alt="Card image" src="https://picsum.photos/300/200" />
            <CardBody className="d-flex flex-column">
              <CardTitle className="text-center" tag="h5">
                Product 01
              </CardTitle>
              <CardSubtitle className="mb-2 text-muted text-center" tag="h6">
                Laptop
              </CardSubtitle>
              <Button className="mx-auto mt-4">Add to Card</Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default FrontPage
