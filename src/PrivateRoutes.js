import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
export const PrivateRoutes = () => {
  const UserState = useSelector((state) => state.user)

  let auth = { user_spec: UserState.userSpec === 0 }
  console.log(UserState)
  return auth.user_spec ? <Outlet /> : <Navigate to="/" />
}
