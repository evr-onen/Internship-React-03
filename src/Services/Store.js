import Axios from "axios"
export let res, storeDataResp, storeImgResp
export let allStoresRes

export const storeCreate = async (token, name, email, address, phone, user_id, banner, brand) => {
  return await Axios.post(
    "store/",
    { name, email, address, phone, status: 1, user_id, banner, brand },
    {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    }
  ).then((response) => {
    console.log(response)
    res = response
  })
}

export const storeUpdate = async (token, name, email, address, phone, id) => {
  await Axios.post(
    `store/${id}`,
    { name, email, address, phone, status: 1 },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  ).then((response) => {
    return console.log(response)
  })
}
export const storeImageUpdate = async (token, store_id, banner, logo) => {
  await Axios.post(
    `store/images/${store_id}`,
    { banner, logo },
    {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    }
  ).then((response) => {
    console.log(response)
    storeImgResp = response.data
    return response
  })
}

export const catDestroy = async (token, id) => {
  return await Axios.delete(
    `store/${id}`,
    {},
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  ).then((response) => {
    console.log(response)
  })
}

export const getStores = async (token) => {
  return await Axios.get(
    `store/`,
    {},
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  ).then((response) => {
    console.log(response)
    allStoresRes = response
  })
}
export const getStore = async (token, id) => {
  return await Axios.get(`store/${id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  }).then((response) => {
    console.log(response)
    storeDataResp = response
  })
}
export const acceptStore = async (token, id, user_id) => {
  return await Axios.post(
    `store/pending/${id}`,
    { user_id: user_id },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  ).then((response) => {
    console.log(response)
  })
}
