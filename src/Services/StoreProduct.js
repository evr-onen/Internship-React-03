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

export const storeProductDestroy = async (token, id, store_id) => {
  console.log(store_id)
  return await Axios.delete(
    `storeproduct/${id}`,
    {
      data: {
        store_id,
      },
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  ).then((response) => {
    delProductRes = response
    console.log(delProductRes)
  })
}

export const getstoreProducts = async (token, store_id) => {
  return await Axios.get(
    `storeproduct/all`,
    {
      params: {
        store_id,
      },
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  ).then((response) => {
    getAllStoreProductsRes = response.data
  })
}
export const frontPageProducts = async (token, store, main, sub, search, price) => {
  return await Axios.get(
    `storeproduct/all`,
    { store, main, sub, search, price },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  ).then((response) => {
    getAllStoreProductsRes = response.data
  })
}
