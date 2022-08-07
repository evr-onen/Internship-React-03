import { BrowserRouter, Routes, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import Axios from "axios"
import { setDataLocaltoState } from "./Stores/userStore"
import { useDispatch } from "react-redux"

import FrontPage from "./Components/FrontPage"
import Header from "./Components/Header"
import Login from "./Components/Login"
import SingleProduct from "./Components/SingleProduct"
import Admin from "./Components/Admin"
import Footer from "./Components/Footer"
import StoreApp from "./Components/StoreApp"
import StoreManagement from "./Components/StoreManagement"
import Register from "./Components/Register"

import { AdminRoutes, StoreRoutes, UnloginRoutes, LoginRoutes } from "./PrivateRoutes"

Axios.defaults.baseURL = "http://127.0.0.1:8000/api/"

function App() {
  const Dispatch = useDispatch()
  if (localStorage.getItem("token")) {
    Dispatch(setDataLocaltoState(localStorage.getItem("token")))
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/product" element={<SingleProduct />} />

        <Route element={<AdminRoutes />}>
          <Route path="/admin" element={<Admin />} />
        </Route>

        <Route element={<StoreRoutes />}>
          <Route path="/store-management" element={<StoreManagement />} />
        </Route>

        <Route element={<UnloginRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register-user" element={<Register />} />
        </Route>

        <Route element={<LoginRoutes />}>
          <Route path="/store-application" element={<StoreApp />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
