import Axios from "axios"

export const userLogout = async (token) => {
  return await Axios.post(
    "auth/logout",
    {},
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  ).then((response) => {
    console.log(response)
    localStorage.removeItem("token")
    localStorage.removeItem("userData")
  })
}
