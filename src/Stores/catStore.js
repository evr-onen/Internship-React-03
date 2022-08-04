import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  main: [],
  sub: [],
  maincounter: 0,
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
  },
})

export const { takeMainCats, takeSubCats, countAddMain } = cat.actions
export default cat.reducer
