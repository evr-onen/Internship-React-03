import React, { useEffect } from "react"
import { Form, FormGroup, Input, Label, Button, CardBody, Card } from "reactstrap"
import Axios from "axios"
import getToken from "jwt-decode"

function Login() {
  function login() {
    Axios.post("http://127.0.0.1:8000/api/auth/login", { email: "evr.onen@gmail.com", password: " " }).then((response) => {
      console.log(response)
    })
  }
  return (
    <div className="login d-flex justify-content-center  vh-100 align-items-center">
      <Card
        style={{
          width: "18rem",
        }}
      >
        <CardBody>
          <Form inline>
            <FormGroup floating>
              <Input id="exampleEmail" name="email" placeholder="Email" type="email" />
              <Label for="exampleEmail">Email</Label>
            </FormGroup>{" "}
            <FormGroup floating>
              <Input id="examplePassword" name="password" placeholder="Password" type="password" />
              <Label for="examplePassword">Password</Label>
            </FormGroup>{" "}
            <Button onClick={() => login()}>Submit</Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  )
}

export default Login
