import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Spinner from '../Spinner/Spinner'
import CONSTANTS from '../../constants'

function PrivateRoute ({ roles, ...rest }) {
  const { data: user, isFetching, error } = useSelector(state => state.auth)

  const refreshToken = window.localStorage.getItem(CONSTANTS.REFRESH_TOKEN)

  if (isFetching || (refreshToken && !(isFetching || user || error))) {
    return <Spinner />
  } else if (user) {
    if (roles && roles.includes(user.role)) {
      return <Route {...rest} />
    }
    return <Redirect to='/' />
  }

  return <Redirect to='/login' />
}

export default PrivateRoute
