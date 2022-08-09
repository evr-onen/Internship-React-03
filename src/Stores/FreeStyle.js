import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  editModalData: {
    id: "",
    name: "",
    cat: {
      id: "",
      name: "",
      main_id: "",
      main_name: "",
    },
    ids: [],
    paths: [],
  },
  isModalopen: false,
}

const sheet = createSlice({
  name: "sheet",
  initialState,
  reducers: {
    editModalData: (state, action) => {
      state.editModalData.id = action.payload.id
      state.editModalData.name = action.payload.name
      state.editModalData.cat.id = action.payload.cat.catid
      state.editModalData.cat.name = action.payload.cat.catname
      state.editModalData.cat.main_id = action.payload.cat.catmain_id
      state.editModalData.cat.main_name = action.payload.cat.catmain_name
      state.editModalData.ids = action.payload.ids
      state.editModalData.paths = action.payload.paths
      state.isModalopen = true
    },
    closeModal: (state, action) => {
      state.isModalopen = false
    },
  },
})

export const { editModalData, closeModal } = sheet.actions
export default sheet.reducer
