import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { editModalData } from "../Stores/FreeStyle"

import { Table } from "reactstrap"

import { getProducts, getallproducts } from "../Services/Product"

function ProductsTable() {
  const AppState = useSelector((state) => state)
  const Dispatch = useDispatch()
  useEffect(() => {}, [])

  getProducts(AppState.user.token).then(() => {})

  function editHandler(e, id, name, catid) {
    let catname, catmain_id, catmain_name

    let ids = []
    let paths = []

    AppState.cat.sub.map((item) => {
      if (item.id === catid) {
        catname = item.name
        catmain_id = item.main_id
        catmain_name = item.main_name
      }
    })

    e.target
      .closest("tr")
      .querySelectorAll(".imgs-wrapper img")
      .forEach((el) => {
        ids.push(el.getAttribute("alt"))
        paths.push(el.getAttribute("src"))
      })
    let modalData = { id, name, cat: { catid, catname, catmain_id, catmain_name }, ids, paths }

    Dispatch(editModalData(modalData))
    console.log(AppState.sheet.isModalopen)
  }
  function listProductsItems(data) {
    return data.map((item, index) => {
      return (
        <tr key={index} onClick={(e) => editHandler(e, item.id, item.name, item.cat_id)}>
          <th scope="row">{index + 1}</th>
          <td>
            {item.images.map((it, ind) => {
              return (
                <div key={ind} className="imgs-wrapper">
                  <img src={"http://127.0.0.1:8000" + it.path} alt={it.id} />
                </div>
              )
            })}
          </td>
          <td>{item.name}</td>
          <td>{AppState.cat.sub.map((subby, index) => (item.cat_id === subby.id ? subby.name : ""))}</td>
        </tr>
      )
    })
  }

  return (
    <div className="table mt-5 w-100 ">
      <Table hover className="mx-auto w-50">
        <thead>
          <tr>
            <th>#</th>
            <th>Images</th>
            <th>Name</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>{listProductsItems(getallproducts)}</tbody>
      </Table>
    </div>
  )
}

export default ProductsTable
