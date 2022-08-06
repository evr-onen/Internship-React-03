import { useEffect, useState } from "react"
import { Table, Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Input, Label } from "reactstrap"

import { categoryRes, getCats, catUpdate, catDestroy } from "../Services/Category"

import { useSelector, useDispatch } from "react-redux"
import { takeMainCats, takeSubCats, countAddMain } from "../Stores/catStore"

let main = [],
  sub = [],
  detailedSubs = []
function CatTable(args) {
  const Dispatch = useDispatch()
  const appState = useSelector((state) => state)

  const [modal3, setModal3] = useState(false)
  const [modal4, setModal4] = useState(false)
  const toggle3 = () => setModal3(!modal3)
  const toggle4 = () => setModal4(!modal4)
  const [catNameValue, setCatNameValue] = useState("")
  const [catId, setCatId] = useState(0)
  const [catMainId, setCatMainId] = useState(0)

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
  }, [appState.cat.maincounter])

  const mainListCats = () => {
    return appState.cat.main.map((item, index) => {
      return (
        <tr className="cat-tr" key={index} onClick={(e) => openEditDeleteModalMain(e, item.id, item.name, item.main_id)}>
          <th scope="row">{index + 1}</th>
          <td className="text-center">{item.name}</td>
        </tr>
      )
    })
  }

  const subListCats = () => {
    return appState.cat.sub.map((item, index) => {
      return (
        <tr className="cat-tr" key={index} onClick={(e) => openEditDeleteModalSub(e, item.id, item.name, item.main_id)}>
          <th scope="row">{index + 1}</th>
          <td className="text-center">{item.main_name}</td>
          <td className="text-center">{item.name}</td>
        </tr>
      )
    })
  }

  function openEditDeleteModalSub(e, id, name, mainid) {
    setModal3(true)
    setCatNameValue(name)
    setCatId(id)

    setCatMainId(mainid)
  }
  function openEditDeleteModalMain(e, id, name, mainid) {
    setModal4(true)
    setCatNameValue(name)
    setCatId(id)

    setCatMainId(mainid)
  }

  function editHandler() {
    catUpdate(appState.user.token, catNameValue, catMainId, catId).then(() => {
      setModal3(false)
      setModal4(false)
      Dispatch(countAddMain())
    })
  }
  function deleteHandler() {
    catDestroy(appState.user.token, catId).then(() => {
      setModal3(false)
      setModal4(false)
      Dispatch(countAddMain())
    })
  }

  function selectMainList() {
    return appState.cat.main?.map((item, index) => {
      return (
        <option key={index} value={item.id}>
          {item.name}
        </option>
      )
    })
  }

  return (
    <div className="d-flex mt-5 justify-content-around">
      <Table id="mainTable" hover size="sm" className="d-block border-1">
        <thead>
          <tr>
            <th>#</th>
            <th className="text-center">Main Category Name</th>
          </tr>
        </thead>
        <tbody>{mainListCats()}</tbody>
      </Table>
      <Table id="subTable" hover size="sm" className="d-block ">
        <thead className="">
          <tr>
            <th>#</th>
            <th className="text-center">Main Category Name</th>

            <th className="text-center">Sub Category Name</th>
          </tr>
        </thead>

        <tbody>{subListCats()}</tbody>
      </Table>
      <Modal isOpen={modal3} toggle={toggle3} {...args}>
        <ModalHeader toggle={toggle3}>Modal title</ModalHeader>
        <ModalBody>
          <h6 className="text-center text-bold">Edit Sub Category</h6>
          <div className="d-flex justify-content-around align-items-center">
            <Input className="mb-3 w-50 selectMainCattable" type="select" value={catMainId} onChange={(e) => setCatMainId(e.target.value)}>
              <option>Select Main menu</option>
              {selectMainList()}
            </Input>

            <FormGroup floating className="mt-2">
              <Input
                id="maincat-modal-input"
                name="name"
                placeholder="Name"
                type="text"
                value={catNameValue}
                onChange={(e) => {
                  setCatNameValue(e.target.value)
                }}
              />
              <Label size="sm" for="maincat-modal-input">
                Name
              </Label>
            </FormGroup>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => editHandler()}>
            Edit
          </Button>
          <Button color="danger" onClick={() => deleteHandler()}>
            Delete
          </Button>
          <Button color="secondary" onClick={toggle3}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={modal4} toggle={toggle4} {...args}>
        <ModalHeader toggle={toggle4}>Modal title</ModalHeader>
        <ModalBody>
          <h6 className="text-center text-bold">Edit Main Category</h6>
          <div className="d-flex justify-content-around align-items-center">
            <FormGroup floating className="mt-2">
              <Input
                id="maincat-modal-input"
                name="name"
                placeholder="Name"
                type="text"
                value={catNameValue}
                onChange={(e) => {
                  setCatNameValue(e.target.value)
                }}
              />
              <Label size="sm" for="maincat-modal-input">
                Name
              </Label>
            </FormGroup>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => editHandler()}>
            Edit
          </Button>
          <Button color="danger" onClick={() => deleteHandler()}>
            Delete
          </Button>
          <Button color="secondary" onClick={toggle4}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default CatTable
