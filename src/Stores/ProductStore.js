import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  forAdmin: [],
  productCounter: 0,
}

const product = createSlice({
  name: "product",
  initialState,
  reducers: {
    takeAdminProducts: (state, action) => {
      state.forAdmin = action.payload
    },

    countProduct: (state, action) => {
      state.productCounter += 1
    },
  },
})

export const { takeAdminProducts, countProduct } = product.actions
export default product.reducer
