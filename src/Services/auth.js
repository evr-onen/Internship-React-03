import Axios from "axios"
import getToken from "jwt-decode"

export const userRegister = async (name, email, password, password_confirmation) => {
  return await Axios.post("auth/register", { name, email, password, password_confirmation }).then((response) => {
    console.log(response)
  })
}
export const userLogin = async (email, password) => {
  return await Axios.post("auth/login", { email, password }).then((response) => {
    var decoded = getToken(response.data.access_token.token)
    localStorage.setItem("token", response.data.access_token.token)
    localStorage.setItem("name", decoded.name)
    localStorage.setItem("id", decoded.sub)
    localStorage.setItem("store_id", decoded.store_id)
    localStorage.setItem("user_spec", decoded.user_spec)
    console.log(decoded)
  })
}
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
    localStorage.setItem("token", response.access_token.token)
  })
}
