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
  })
  console.log(AppState.user)
  const Navigate = useNavigate()
  function SubmitHandler(e) {
    storeCreate(AppState.user.token, appFormData.name, appFormData.email, appFormData.address, appFormData.phone, AppState.user.id)
      .then(() => {
        setAppFormData({
          name: "",
          email: "",
          address: "",
          phone: "",
          status: "",
        })
        /* Navigate("/store-management") */
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
          <Row>
            <Label for="exampleFile" sm={6}>
              <div className="wrapper">
                <img src={storeImg} />
              </div>
            </Label>
            <Label for="exampleFile" sm={6}>
              <div className="wrapper">
                <img src={brandImg} />
              </div>
            </Label>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input id="exampleEmail" name="email" placeholder="email" type="email" value={appFormData.email} onChange={(e) => setAppFormData((prev) => ({ ...prev, email: e.target.value }))} />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleName">Name</Label>
                <Input id="exampleName" name="name" placeholder="Your Name" type="text" value={appFormData.name} onChange={(e) => setAppFormData((prev) => ({ ...prev, name: e.target.value }))} />
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
          </Row>

          <FormGroup row>
            <Col sm={5}>
              <Input
                id="exampleFile"
                name="file"
                type="file"
                onChange={(e) => {
                  setStoreImg(URL.createObjectURL(e.target.files[0]))
                }}
              />
              <FormText>Store Banner Image</FormText>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={5}>
              <Input
                id="exampleFile"
                name="file"
                type="file"
                onChange={(e) => {
                  setBrandImg(URL.createObjectURL(e.target.files[0]))
                }}
              />
              <FormText>Store Brand Image</FormText>
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
