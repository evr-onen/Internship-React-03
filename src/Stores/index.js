import { configureStore } from "@reduxjs/toolkit"

import user from "./userStore"
import cat from "./catStore"
const store = configureStore({
  reducer: {
    user,
    cat,
  },
})

export default store
