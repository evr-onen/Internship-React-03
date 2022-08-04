import { createSlice } from "@reduxjs/toolkit"
import getToken from "jwt-decode"
import Thunk from "redux-thunk"

const initialState = {
  user: {
    name: "",
    id: "",
    userSpec: 0,
    isLogin: false,
    token: "",
    store_id: 0,
  },
}

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    takeToken: (state, action) => {
      state.user.token = action.payload
    },
    takeTokenData: (state, action) => {
      state.user.id = action.payload.id
      state.user.name = action.payload.name
      state.user.userSpec = action.payload.user_spec
      state.user.isLogin = true
      state.user.store_id = action.payload.store_id
    },
    removeTokenData: (state, action) => {
      state.user.id = ""
      state.user.name = ""
      state.user.userSpec = 3
      state.user.isLogin = false
      state.user.store_id = 0
      state.user.token = ""
    },
    setDataLocaltoState: (state, action) => {
      state.user.token = action.payload
      state.user.id = getToken(action.payload).sub
      state.user.name = getToken(action.payload).name
      state.user.userSpec = getToken(action.payload).user_spec
      state.user.isLogin = getToken(action.payload).sub ? true : false
      state.user.store_id = getToken(action.payload).store_id
    },
  },
})

export const { takeToken, takeTokenData, removeTokenData, setDataLocaltoState } = user.actions
export default user.reducer
