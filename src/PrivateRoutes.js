import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
export const AdminRoutes = () => {
  const UserState = useSelector((state) => state.user)

  let auth = { user_spec: UserState.userSpec === 0 && UserState.token }

  return auth.user_spec ? <Outlet /> : <Navigate to="/" />
}

export const StoreRoutes = () => {
  const UserState = useSelector((state) => state.user)

  let auth = { user_spec: UserState.userSpec === 1 }

  return auth.user_spec ? <Outlet /> : <Navigate to="/" />
}

export const UnloginRoutes = () => {
  const UserState = useSelector((state) => state.user)

  let auth = { user_spec: !UserState.token }

  return auth.user_spec ? <Outlet /> : <Navigate to="/" />
}

export const LoginRoutes = () => {
  const UserState = useSelector((state) => state.user)

  let auth = { user_spec: UserState.userSpec === 3 }

  return auth.user_spec ? <Outlet /> : <Navigate to="/login" />
}

export const HashRoutes = () => {
  const UserState = useSelector((state) => state.user)

  let auth = { hash: UserState.hash == "" }

  return auth.hash ? <Outlet /> : <Navigate to="/" />
}
