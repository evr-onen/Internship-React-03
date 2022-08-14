import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  count: 0,
}

const tmp = createSlice({
  name: "tmp",
  initialState,
  reducers: {
    countTmp: (state, action) => {
      state.count += 1
    },
  },
})

export const { countTmp } = tmp.actions
export default tmp.reducer
