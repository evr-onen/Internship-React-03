import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  pending: [],
  depending: [],
  storeCounter: 0,
}

const stores = createSlice({
  name: "cat",
  initialState,
  reducers: {
    takePendingStores: (state, action) => {
      state.pending = action.payload
    },
    takeDependingStores: (state, action) => {
      state.depending = action.payload
    },
    countStore: (state, action) => {
      state.storeCounter += 1
    },
  },
})

export const { takePendingStores, takeDependingStores, countStore } = stores.actions
export default stores.reducer
