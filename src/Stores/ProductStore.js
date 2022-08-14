import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  forAdmin: [],
  productCounter: 0,
  products: [],
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
    takeProduct: (state, action) => {
      state.products = action.payload
    },
  },
})

export const { takeAdminProducts, countProduct, takeProduct } = product.actions
export default product.reducer
