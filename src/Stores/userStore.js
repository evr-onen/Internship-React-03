import { createSlice } from "@reduxjs/toolkit"
import getToken from "jwt-decode"
import Thunk from "redux-thunk"

const initialState = {
  counter: 0,
  name: "",
  id: "",
  userSpec: 0,
  isLogin: false,
  token: "",
  store_id: 0,
}

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    takeToken: (state, action) => {
      state.token = action.payload
    },
    takeTokenData: (state, action) => {
      state.id = action.payload.id
      state.name = action.payload.name
      state.userSpec = action.payload.user_spec
      state.isLogin = true
      state.store_id = action.payload.store_id
    },
    removeTokenData: (state, action) => {
      state.id = ""
      state.name = ""
      state.userSpec = 3
      state.isLogin = false
      state.store_id = 0
      state.token = ""
    },
    setDataLocaltoState: (state, action) => {
      state.token = action.payload
      state.id = getToken(action.payload).sub
      state.name = getToken(action.payload).name
      state.userSpec = getToken(action.payload).user_spec
      state.isLogin = getToken(action.payload).sub ? true : false
      state.store_id = getToken(action.payload).store_id
    },
    counterLogin: (state, action) => {
      state.counter += 1
    },
  },
})

export const { takeToken, takeTokenData, removeTokenData, setDataLocaltoState, counterLogin } = user.actions
export default user.reducer
