import { configureStore } from "@reduxjs/toolkit"

import user from "./userStore"
import cat from "./catStore"
import stores from "./StoreStore"
import sheet from "./FreeStyle"
const store = configureStore({
  reducer: {
    user,
    cat,
    stores,
    sheet,
  },
})

export default store
