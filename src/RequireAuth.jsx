import React, { useContext } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import AuthContext from './context/AuthProvider'

const RequireAuth = () => {
    const {auth} = useContext(AuthContext)
    const location = useLocation()

  return (
    auth?.accessToken?<Outlet/>:<Navigate to="/" state={{from:location}} replace />
  )
}

export default RequireAuth