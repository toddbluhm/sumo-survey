import { createAction } from 'redux-actions'
import { FetchAPI } from '../fetch'

export const SIGNUP = 'SIGNUP'
export const signup = createAction(SIGNUP, (email, password) => {
  return FetchAPI('/users', {
    method: 'PUT',
    data: {
      email,
      password
    }
  })
    .catch(e => {
      const res = e.response
      if (res.status === 400) {
        const err = new Error(res.data.message)
        err.name = res.data.name
        throw err
      }
      throw e
    })
})
