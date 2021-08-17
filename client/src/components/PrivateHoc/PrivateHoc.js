import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
//import { getUserAction } from '../../actions/actionCreator'
import Spinner from '../Spinner/Spinner'
import CONSTANTS from '../../constants'

const PrivateHoc = (Component, props, roles = null) => {
  const mapStateToProps = state => state.auth


  class Hoc extends React.Component {
    render () {
      const refreshToken = window.localStorage.getItem(CONSTANTS.REFRESH_TOKEN)
      if (
        this.props.isFetching ||
        (refreshToken &&
          !(this.props.isFetching || this.props.data || this.props.error))
      ) {
        return <Spinner />
      } else if (this.props.data) {
        if ((roles && roles.includes(this.props.data.role)) || !roles) {
          return  <Component history={this.props.history} match={this.props.match} {...props} />
        }
        return <Redirect to='/' />
      }

      return <Redirect to='/login' />
    }
  }

  return connect(mapStateToProps)(Hoc)
}

export default PrivateHoc
