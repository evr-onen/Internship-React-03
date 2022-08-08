import Axios from "axios"

export const productCreate = async (token, name, email, address, phone, user_id) => {
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

export const productUpdate = async (token, name, email, address, phone, id) => {
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

export const productDestroy = async (token, id) => {
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

export const getProducts = async (token) => {
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
