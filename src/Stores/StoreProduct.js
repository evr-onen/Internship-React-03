import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  storedProducts: [],
}

const storeproduct = createSlice({
  name: "storeproduct",
  initialState,
  reducers: {
    takeStoredProducts: (state, action) => {
      state.storedProducts = action.payload
    },
  },
})

export const { takeStoredProducts } = storeproduct.actions
export default storeproduct.reducer
