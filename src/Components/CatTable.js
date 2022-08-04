import { useEffect } from "react"
import { Table } from "reactstrap"

import { categoryRes, getCats } from "../Services/Category"

import { useSelector, useDispatch } from "react-redux"
import { takeMainCats, takeSubCats, countAddMain } from "../Stores/catStore"

let main = []
function CatTable() {
  const Dispatch = useDispatch()
  const appState = useSelector((state) => state)

  useEffect(() => {
    getCats(appState.user.token).then(() => {
      categoryRes.data.map((item) => {
        if (item.main_id == 0) {
          main.push(item)
        }
      })

      Dispatch(takeMainCats(main))
      main = []
    })
  }, [appState.cat.maincounter])

  const mainListCats = () => {
    return appState.cat.main.map((item, index) => {
      return (
        <tr className="cat-tr" key={index}>
          <th scope="row">{index + 1}</th>
          <td className="text-center">{item.name}</td>
        </tr>
      )
    })
  }

  return (
    <div className="d-flex mt-5 justify-content-around">
      <Table hover size="sm" className="d-block border-1">
        <thead>
          <tr>
            <th>#</th>
            <th className="text-center">Main Category Name</th>
          </tr>
        </thead>
        <tbody>{mainListCats()}</tbody>
      </Table>
      <Table hover size="sm" className="d-block ">
        <thead className="">
          <tr>
            <th>#</th>
            <th className="text-center">Sub Category Name</th>
          </tr>
        </thead>
        <tbody>
          <tr className="cat-tr">
            <th scope="row">1</th>
            <td className="text-center">Mark</td>
          </tr>
          <tr className="cat-tr">
            <th scope="row">2</th>
            <td className="text-center">Jacob</td>
          </tr>
          <tr className="cat-tr">
            <th scope="row">3</th>
            <td className="text-center">Larry</td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default CatTable
