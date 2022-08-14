import Axios from "axios"
export let createResponse, updatedProductRes, getAllStoreProductsRes, delProductRes

export const storeProductCreate = async (token, store_id, product_id, price, stock) => {
  return await Axios.post(
    "storeproduct/",
    { store_id, product_id, price, stock },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  ).then((response) => {
    console.log(response)
    createResponse = response.data
  })
}

export const storeProductUpdate = async (token, id, store_id, product_id, price, stock) => {
  await Axios.post(
    `storeproduct/${id}`,
    { store_id, product_id, price, stock },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  ).then((response) => {
    updatedProductRes = response.data
  })
}

export const storeProductDestroy = async (token, id) => {
  return await Axios.delete(
    `storeproduct/${id}`,
    {},
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  ).then((response) => {
    delProductRes = response.data
  })
}

export const getstoreProducts = async (token) => {
  return await Axios.get(
    `storeproduct/all`,
    {},
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  ).then((response) => {
    getAllStoreProductsRes = response.data
  })
}
