import { configureStore } from "@reduxjs/toolkit"

import user from "./userStore"
import cat from "./catStore"
import stores from "./StoreStore"
const store = configureStore({
  reducer: {
    user,
    cat,
    stores,
  },
})

export default store
