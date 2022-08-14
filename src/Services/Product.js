import Axios from "axios"
export let getallproducts = []

export const productCreate = async (token, name, description, cat_id, file1, file2, file3) => {
  return await Axios.post(
    "product/",
    { name, description, cat_id, file1, file2, file3 },
    {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    }
  ).then((response) => {
    console.log(response)
  })
}

export const productUpdate = async (token, id, name, description, cat_id, file1, file2, file3, fileID1, fileID2, fileID3) => {
  await Axios.post(
    `product/${id}`,
    { name, description, cat_id, file1, file2, file3, fileID1, fileID2, fileID3 },
    {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    }
  ).then((response) => {
    return console.log(response)
  })
}

export const productDestroy = async (token, id) => {
  return await Axios.delete(
    `product/${id}`,

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
  return await Axios.get(`product/all`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      getallproducts = response.data
    })
    .catch((response) => {
      console.log(response)
      // getallproducts = response.data
    })
}
