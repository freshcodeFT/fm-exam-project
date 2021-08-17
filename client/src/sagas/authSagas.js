import { put } from 'redux-saga/effects'
import ACTION from '../actions/actionTypes'
import * as Api from '../api/http'

export function * loginSaga (action) {
  yield put({ type: ACTION.AUTH_ACTION_REQUEST })
  try {
    const {
      data: {
        data: { user }
      }
    } = yield Api.auth.login(action.data)
    action.history.replace('/')
    yield put({ type: ACTION.GET_USER_SUCCESS, data: user })
  } catch (err) {
    yield put({ type: ACTION.AUTH_ACTION_ERROR, error: err.response })
  }
}

export function * registerSaga (action) {
  yield put({ type: ACTION.AUTH_ACTION_REQUEST })
  try {
    const {
      data: {
        data: { user }
      }
    } = yield Api.auth.signup(action.data)
    action.history.replace('/')
    yield put({ type: ACTION.GET_USER_SUCCESS, data: user })
  } catch (e) {
    yield put({ type: ACTION.AUTH_ACTION_ERROR, error: e.response })
  }
}

export function * refreshSaga (action) {
  yield put({ type: ACTION.AUTH_ACTION_REQUEST })
  try {
    const {
      data: {
        data: { user }
      }
    } = yield Api.auth.refresh(action.data)
    yield put({ type: ACTION.GET_USER_SUCCESS, data: user })
  } catch (e) {
    console.log(e)
    yield put({ type: ACTION.AUTH_ACTION_ERROR, error: e.response })
  }
}

export function * logoutSaga (action) {
  yield Api.auth.logout()
  put({ type: ACTION.CLEAR_USER_STORE })
}
