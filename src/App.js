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

import { PrivateRoutes } from "./PrivateRoutes"

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
        <Route path="/login" element={<Login />} />
        <Route path="/product" element={<SingleProduct />} />
        {/* <Route path="/admin" element={<Admin />} /> */}
        <Route path="/store-application" element={<StoreApp />} />
        <Route path="/store-management" element={<StoreManagement />} />
        <Route path="/register-user" element={<Register />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
