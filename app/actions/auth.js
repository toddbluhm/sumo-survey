import { createAction } from 'redux-actions'
import { FetchAPI } from '../fetch'

export const LOGIN = 'LOGIN'
export const login = createAction(LOGIN, (email, password) => {
  return FetchAPI('/login', {
    method: 'POST',
    data: {
      email,
      password
    }
  })
    .then(res => {
      if (res.status !== 200) {
        throw new Error(res.data.message)
      }
      return res.data
    })
})

export const LOGOUT = 'LOGOUT'
export const logout = createAction(LOGOUT, () => FetchAPI('/logout', { method: 'POST' }))

export const AUTHENTICATED = 'AUTHENTICATED'
export const authenticated = createAction(AUTHENTICATED, () => {
  return FetchAPI('/authenticated')
    .then((res) => {
      if (res.status !== 200) {
        throw new Error('Not authenticated.')
      }
      return res.data
    })
})
