import Axios from "axios"
export let res
export let categoryRes

export const catCreate = async (token, name, mainId) => {
  return await Axios.post(
    "category/",
    { name, main_id: mainId },
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

export const catUpdate = async (token, name, mainId, id) => {
  await Axios.put(
    `category/${id}`,
    { name, main_id: mainId },
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
    `category/${id}`,
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

export const getCats = async (token) => {
  return await Axios.get(
    `category/categories`,
    {},
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  ).then((response) => {
    categoryRes = response
  })
}
