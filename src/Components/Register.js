import { userLogin, userRegister } from "../Services/auth"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { Form, FormGroup, Label, Input, Button, Card, CardBody } from "reactstrap"

function Register() {
  const Navigate = useNavigate()
  const [getRegData, setGetRegData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  })
  function registerHandler() {
    userRegister(getRegData.name, getRegData.email, getRegData.password, getRegData.password_confirmation)
      .then(() => {
        userLogin(getRegData.email, getRegData.password)
      })
      .then(() => {
        setGetRegData((prev) => ({ name: "", email: "", password: "", password_confirmation: "" }))
        Navigate("/")
      })
  }
  return (
    <div className="container register d-flex flex-column justify-content-center align-items-center mt-5">
      <div className="title mb-5">
        <h1>Register</h1>
      </div>
      <Card
        style={{
          width: "18rem",
        }}
      >
        <CardBody>
          <Form inline>
            <FormGroup floating>
              <Input
                id="exampleEmail"
                name="name"
                placeholder="Email"
                type="text"
                value={getRegData.name}
                onChange={(e) => {
                  setGetRegData((prev) => ({ ...prev, name: e.target.value }))
                }}
              />
              <Label for="exampleEmail">Name</Label>
            </FormGroup>
            <FormGroup floating>
              <Input
                id="exampleEmail"
                name="email"
                placeholder="email"
                type="email"
                value={getRegData.email}
                onChange={(e) => {
                  setGetRegData((prev) => ({ ...prev, email: e.target.value }))
                }}
              />
              <Label for="exampleEmail">email</Label>
            </FormGroup>
            <FormGroup floating>
              <Input
                id="examplePassword"
                name="password"
                placeholder="Password"
                type="password"
                value={getRegData.password}
                onChange={(e) => {
                  setGetRegData((prev) => ({ ...prev, password: e.target.value }))
                }}
              />
              <Label for="examplePassword">Password</Label>
            </FormGroup>
            <FormGroup floating>
              <Input
                id="examplePassword_confirmation"
                name="password_confirmation"
                placeholder="Password"
                type="password"
                value={getRegData.password_confirmation}
                onChange={(e) => {
                  setGetRegData((prev) => ({ ...prev, password_confirmation: e.target.value }))
                }}
              />
              <Label for="examplePassword_confirmation">Password</Label>
            </FormGroup>
            <Button onClick={() => registerHandler()}>Submit</Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  )
}

export default Register
