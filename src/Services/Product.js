import Axios from "axios"

export const productCreate = async (token, name, description, cat_id, file1, file2, file3) => {
  return await Axios.post(
    "product/",
    { name, description, cat_id, file1, file2, file3 },
    {
      headers: {
        Authorization: "Bearer " + token,
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
