import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import Axios from "axios"
import { setDataLocaltoState } from "./Stores/userStore"
import { useDispatch, useSelector } from "react-redux"

import { getCats, categoryRes } from "./Services/Category"
import { takeMainCats, takeSubCats } from "./Stores/catStore"

import FrontPage from "./Components/FrontPage"
import Header from "./Components/Header"
import Login from "./Components/Login"
import SingleProduct from "./Components/SingleProduct"
import Admin from "./Components/Admin"
import Footer from "./Components/Footer"
import StoreApp from "./Components/StoreApp"
import StoreManagement from "./Components/StoreManagement"
import Register from "./Components/Register"

import { AdminRoutes, StoreRoutes, UnloginRoutes, LoginRoutes, HashRoutes } from "./PrivateRoutes"

Axios.defaults.baseURL = "http://127.0.0.1:8000/api/"

let main = [],
  sub = [],
  detailedSubs = []
const hash = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")).hash : ""
function App() {
  const appState = useSelector((state) => state)
  Axios.defaults.headers.get["Authorization"] = "Bearer " + appState.user.token
  const Dispatch = useDispatch()
  if (localStorage.getItem("token")) {
    Dispatch(setDataLocaltoState(localStorage.getItem("token")))
  }

  useEffect(() => {
    getCats(appState.user.token).then(() => {
      categoryRes.data.map((item) => {
        if (item.main_id == 0) {
          main.push(item)
        } else {
          sub.push(item)
        }
      })

      Dispatch(takeMainCats(main))

      detailedSubs = []
      sub.map((item, index) => {
        main.map((it, ind) => {
          if (item.main_id === it.id) {
            let subCont = {}
            subCont = { id: item.id, name: item.name, main_id: item.main_id, main_name: it.name }
            detailedSubs.push(subCont)
          }
        })
      })
      Dispatch(takeSubCats(detailedSubs))

      main = []
      sub = []
    })
  }, [])

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
        <Route element={<HashRoutes />}>
          <Route path={"/" + appState.user.hash} element={<SingleProduct />} />
        </Route>

        <Route element={<UnloginRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register-user" element={<Register />} />
        </Route>

        <Route element={<LoginRoutes />}>
          <Route path="/store-application" element={<StoreApp />} />
        </Route>
      </Routes>
      {appState.user.userSpec === 3 && <Footer />}
    </BrowserRouter>
  )
}

export default App
