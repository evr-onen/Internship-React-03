import Axios from "axios"
import getToken from "jwt-decode"

export const userRegister = async (name, email, password, password_confirmation) => {
  return await Axios.post("auth/register", { name, email, password, password_confirmation }).then((response) => {
    console.log(response)
  })
}
export const userLogin = async (email, password) => {
  return await Axios.post("auth/login", { email, password }).then((response) => {
    localStorage.setItem("token", response.data.access_token.token)
    var decoded = getToken(localStorage.getItem("token"))
    let localObj = { id: decoded.sub, name: decoded.name, user_spec: decoded.user_spec, store_id: decoded.store_id, hash: response.data.access_token.tm[0].tmp.hash, sender_id: response.data.access_token.tm[0].tmp.sender_id }
    localStorage.setItem("userData", JSON.stringify(localObj))

    console.log(response)
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
    localStorage.removeItem("token")
    localStorage.removeItem("userData")
  })
}
