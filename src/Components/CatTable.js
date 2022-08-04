import { useEffect } from "react"
import { Table } from "reactstrap"

import { categoryRes, getCats } from "../Services/Category"

import { useSelector, useDispatch } from "react-redux"
import { takeMainCats, takeSubCats } from "../Stores/catStore"
function CatTable() {
  const Dispatch = useDispatch()
  const appState = useSelector((state) => state)
  useEffect(() => {
    getCats(appState.user.token).then(() => {
      console.log(categoryRes.data)
      let main = []
      categoryRes.data.map((item) => {
        if (item.main_id == 0) {
          main.push(item)
        }
      })

      Dispatch(takeMainCats(main))
      console.log(appState)
    })
  }, [])

  return (
    <div className="d-flex mt-5 justify-content-around">
      <Table hover size="sm" className="w-25 border-1">
        <thead>
          <tr>
            <th>#</th>
            <th className="text-center">Main Category Name</th>
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
      <Table hover size="sm" className="w-25">
        <thead>
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
