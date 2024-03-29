import { configureStore } from "@reduxjs/toolkit"

import user from "./userStore"
import cat from "./catStore"
import stores from "./StoreStore"
import sheet from "./FreeStyle"
import product from "./ProductStore"
import storeproduct from "./StoreProduct"
import tmp from "./tmp"
const store = configureStore({
  reducer: {
    user,
    cat,
    stores,
    sheet,
    product,
    storeproduct,
    tmp,
  },
})

export default store
