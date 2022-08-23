import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  main: [],
  sub: [],
  maincounter: 0,
  frontCats: [],
}

const cat = createSlice({
  name: "cat",
  initialState,
  reducers: {
    takeMainCats: (state, action) => {
      state.main = action.payload
    },
    takeSubCats: (state, action) => {
      state.sub = action.payload
    },
    countAddMain: (state, action) => {
      state.maincounter += 1
    },
    getFrontCats: (state, action) => {
      state.frontCats = action.payload
    },
  },
})

export const { takeMainCats, takeSubCats, countAddMain, getFrontCats } = cat.actions
export default cat.reducer
