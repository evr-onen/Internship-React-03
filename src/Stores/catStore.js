import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  cat: {
    main: {},
    sub: {},
  },
}

const cat = createSlice({
  name: "cat",
  initialState,
  reducers: {
    takeMainCats: (state, action) => {
      state.cat.main = action.payload
    },
    takeSubCats: (state, action) => {
      state.cat.sub = action.payload
    },
  },
})

export const { takeMainCats, takeSubCats } = cat.actions
export default cat.reducer
