import { BrowserRouter, Routes, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import FrontPage from "./Components/FrontPage"
import Header from "./Components/Header"
import Login from "./Components/Login"
import SingleProduct from "./Components/SingleProduct"
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<FrontPage />} />
        <Route path="/product" element={<SingleProduct />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
