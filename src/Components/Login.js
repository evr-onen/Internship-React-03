import { useEffect, useState } from "react"
import { Form, FormGroup, Input, Label, Button, CardBody, Card } from "reactstrap"
import Axios from "axios"
import { userLogin } from "../Services/auth"

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })
  function loginHandler() {
    userLogin(loginData.email, loginData.password)
  }

  return (
    <div className="login d-flex justify-content-center  vh-100 align-items-center flex-column">
      <div className="title mb-5">
        <h1>Login</h1>
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
                name="email"
                placeholder="Email"
                type="email"
                value={loginData.email}
                onChange={(e) => {
                  setLoginData((prev) => ({ ...prev, email: e.target.value }))
                }}
              />
              <Label for="exampleEmail">Email</Label>
            </FormGroup>{" "}
            <FormGroup floating>
              <Input
                id="examplePassword"
                name="password"
                placeholder="Password"
                type="password"
                value={loginData.password}
                onChange={(e) => {
                  setLoginData((prev) => ({ ...prev, password: e.target.value }))
                }}
              />
              <Label for="examplePassword">Password</Label>
            </FormGroup>{" "}
            <Button onClick={() => loginHandler()}>Submit</Button>
          </Form>
        </CardBody>
      </Card>
      <p>
        Henüz kayıt olmadıysanız <a href="/register-user">buradan</a> kayıt olabilirsiniz.
      </p>
    </div>
  )
}

export default Login
