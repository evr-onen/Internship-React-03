import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  pending: [],
  depending: [],
  storeCounter: 0,
  storeData: {
    id: "",
    name: "",
    email: "",
    address: "",
    phone: "",
    banner_path: "",
    logo_path: "",
    products: [],
  },
}

const stores = createSlice({
  name: "store",
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
    storeData: (state, action) => {
      console.log(action.payload)
      state.storeData.id = action.payload.id
      state.storeData.name = action.payload.name
      state.storeData.email = action.payload.email
      state.storeData.address = action.payload.address
      state.storeData.phone = action.payload.phone
      state.storeData.banner_path = action.payload.images[0].path
      state.storeData.logo_path = action.payload.images[1].path

      state.storeData.products = action.payload.store_to_products
    },
    bannerImg: (state, action) => {
      state.storeCounter = action.payload.banner
    },
    logoImg: (state, action) => {
      state.storeCounter = action.payload.logo
    },
  },
})

export const { takePendingStores, takeDependingStores, countStore, storeData, bannerImg, logoImg } = stores.actions
export default stores.reducer
