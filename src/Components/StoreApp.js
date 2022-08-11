import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { Form, Row, Col, FormGroup, Label, Input, Button, FormText } from "reactstrap"

import { storeCreate } from "../Services/Store"
function StoreApplication() {
  const AppState = useSelector((state) => state)
  const [storeImg, setStoreImg] = useState()
  const [brandImg, setBrandImg] = useState()
  const [appFormData, setAppFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    status: "",
    banner: [],
    logo: [],
  })

  const Navigate = useNavigate()
  function SubmitHandler(e) {
    console.log(appFormData)
    storeCreate(AppState.user.token, appFormData.name, appFormData.email, appFormData.address, appFormData.phone, AppState.user.id, appFormData.banner, appFormData.logo)
      .then(() => {
        setAppFormData({
          name: "",
          email: "",
          address: "",
          phone: "",
          status: "",
        })
        Navigate("/store-management")
      })
      .catch(() => {
        console.log("The store has not create!!")
      })
  }

  return (
    <div className="container store-app">
      <h1 className="">Store Application</h1>
      <div className="form-wrapper">
        <Form>
          <div className="topSection">
            <Label for="exampleFileBanner" sm={6}>
              <div className="wrapper">
                <img src={storeImg} />
              </div>
            </Label>

            <div className="line"></div>
            <h1>{appFormData.name}</h1>
            <Label for="exampleFileBrand" sm={6}>
              <div className="wrapper">
                <img src={brandImg} />
              </div>
            </Label>
          </div>

          <Row>
            <div className="form">
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input id="exampleEmail" name="email" placeholder="email" type="email" value={appFormData.email} onChange={(e) => setAppFormData((prev) => ({ ...prev, email: e.target.value }))} />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleName">Name</Label>
                  <Input id="exampleName" name="name" placeholder="Your Name" type="text" value={appFormData.name} onChange={(e) => setAppFormData((prev) => ({ ...prev, name: e.target.value }))} maxLength="30" />
                </FormGroup>
              </Col>
              <Col md={5}>
                <FormGroup>
                  <Label for="exampleAddress">Address</Label>
                  <Input id="exampleAddress" name="address" placeholder="1234 Main St" value={appFormData.address} onChange={(e) => setAppFormData((prev) => ({ ...prev, address: e.target.value }))} />
                </FormGroup>
              </Col>
              <Col md={2}>
                <FormGroup>
                  <Label for="exampleState">Phone</Label>
                  <Input id="exampleState" name="state" type="tel" value={appFormData.phone} onChange={(e) => setAppFormData((prev) => ({ ...prev, phone: e.target.value }))} />
                </FormGroup>
              </Col>
            </div>
          </Row>

          <FormGroup row>
            <Col sm={5}>
              <Input
                id="exampleFileBanner"
                name="file"
                type="file"
                onChange={(e) => {
                  setStoreImg(URL.createObjectURL(e.target.files[0]))
                  setAppFormData((prev) => ({ ...prev, banner: e.target.files[0] }))
                }}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={5}>
              <Input
                id="exampleFileBrand"
                name="file"
                type="file"
                onChange={(e) => {
                  setBrandImg(URL.createObjectURL(e.target.files[0]))
                  setAppFormData((prev) => ({ ...prev, logo: e.target.files[0] }))
                }}
              />
            </Col>
          </FormGroup>
          <FormGroup check>
            <Input id="exampleCheck" name="check" type="checkbox" />
            <Label check for="exampleCheck">
              Şartları okudum kabul ediyorum
            </Label>
          </FormGroup>
          <Button className="mt-3" onClick={(e) => SubmitHandler(e)}>
            Sign in
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default StoreApplication
