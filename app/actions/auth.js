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
    .then(res => res.data)
    .catch(e => {
      throw new Error(e.response.data.message)
    })
})

export const LOGOUT = 'LOGOUT'
export const logout = createAction(LOGOUT, () => FetchAPI('/logout', { method: 'POST' }))

export const AUTHENTICATED = 'AUTHENTICATED'
export const authenticated = createAction(AUTHENTICATED, () => {
  return FetchAPI('/authenticated')
    .then((res) => res.data)
    .catch(e => {
      throw new Error('Not authenticated.')
    })
})
