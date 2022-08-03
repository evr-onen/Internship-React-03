import { useEffect } from "react"
import { Table } from "reactstrap"

function CatTable() {
  return (
    <div className="d-flex mt-5 justify-content-around">
      <Table hover size="sm" className="w-25 border-1">
        <thead>
          <tr>
            <th>#</th>
            <th class="text-center">Main Category Name</th>
          </tr>
        </thead>
        <tbody>
          <tr className="cat-tr">
            <th scope="row">1</th>
            <td class="text-center">Mark</td>
          </tr>
          <tr className="cat-tr">
            <th scope="row">2</th>
            <td class="text-center">Jacob</td>
          </tr>
          <tr className="cat-tr">
            <th scope="row">3</th>
            <td class="text-center">Larry</td>
          </tr>
        </tbody>
      </Table>
      <Table hover size="sm" className="w-25">
        <thead>
          <tr>
            <th>#</th>
            <th class="text-center">Sub Category Name</th>
          </tr>
        </thead>
        <tbody>
          <tr className="cat-tr">
            <th scope="row">1</th>
            <td class="text-center">Mark</td>
          </tr>
          <tr className="cat-tr">
            <th scope="row">2</th>
            <td class="text-center">Jacob</td>
          </tr>
          <tr className="cat-tr">
            <th scope="row">3</th>
            <td class="text-center">Larry</td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default CatTable
