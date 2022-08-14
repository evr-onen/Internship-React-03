import Axios from "axios"
export let createResponse, getAllWorkers

export const workerAppCreate = async (token, sender_id, user_mail) => {
  return await Axios.post(
    "tmp/",
    { sender_id, user_mail },
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

export const workerAppUpdate = async (token, id, sender_id) => {
  await Axios.post(
    `tmp/${id}`,
    { sender_id },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  ).then((response) => {})
}

export const workerAppDestroy = async (token, id) => {
  return await Axios.delete(
    `tmp/${id}`,
    {},
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  ).then((response) => {})
}

export const getWorkerApps = async (token, sender_id) => {
  return await Axios.get(
    `tmp/${sender_id}`,
    {},
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  ).then((response) => {
    console.log(response.data)
    getAllWorkers = response.data
  })
}
