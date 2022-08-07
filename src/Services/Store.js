import Axios from "axios"
export let res
export let allStoresRes

export const storeCreate = async (token, name, email, address, phone, user_id) => {
  return await Axios.post(
    "store/",
    { name, email, address, phone, status: 1, user_id },
    {
      headers: {
        Authorization: "Bearer " + token,
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
