import { useEffect } from "react"

import { useDispatch } from "react-redux"
import { takeToken } from "../Stores/userStore"

import { useSelector } from "react-redux"

function deneme() {
  const Dispatch = useDispatch()

  const userState = useSelector((state) => state.user) // use selector örneği

  Dispatch(takeToken(/* içine ne göndermek istiyorsan o */))

  return <>deneme</>
}

export default deneme
