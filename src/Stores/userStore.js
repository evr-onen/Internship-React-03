import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  name: "",
  id: "",
  userSpec: 0,
  isLogin: false,
  token: "",
}

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    takeToken: (state, action) => {
      state.user = [action.payload, ...state.user] // ...user a gerek yok aslında
    },
  },
})

export const { takeToken } = user.actions
export default user.reducer
