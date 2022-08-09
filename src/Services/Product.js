import Axios from "axios"

export const productCreate = async (token, data) => {
  return await Axios.post(
    "product/",
    { data },
    {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
        // accept: "multipart/form-data",
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Credentials": false,
      },
    }
  ).then((response) => {
    console.log(response)
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
  })
}
