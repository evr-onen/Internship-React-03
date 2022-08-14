import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  storedProducts: [],
  count: 0,
}

const storeproduct = createSlice({
  name: "storeproduct",
  initialState,
  reducers: {
    takeStoredProducts: (state, action) => {
      state.storedProducts = action.payload
    },
    refreshStoredProducts: (state, action) => {
      state.storedProducts = action.payload // laravelde tekli getiremedim nedense find kullanmama ragmen
    },

    storedProductCount: (state, action) => {
      state.storedProducts += 1
    },
  },
})

export const { takeStoredProducts, refreshStoredProducts, storedProductCount } = storeproduct.actions
export default storeproduct.reducer
