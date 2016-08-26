import { createAction } from 'redux-actions'
import { default as validator } from 'validator'
import { FetchAPI } from '../fetch'
import { default as BPromise } from 'bluebird'

export const PASSWORDS_MATCH = 'PASSWORDS_MATCH'
export const validatePasswords = createAction(PASSWORDS_MATCH, (pass1, pass2) => {
  return new BPromise((resolve) => {
    if (pass1 === '') {
      const err = new Error('Error, Password cannot be blank.')
      err.name = 'password'
      throw err
    }

    if (pass1 !== pass2) {
      const err = new Error('Error, Passwords do not match.')
      err.name = 'password2'
      throw err
    }

    if (pass1.length < 7) {
      const err = new Error('Error, Password is too short. ( > 6 characters)')
      err.name = 'password'
      throw err
    }
    resolve()
  })
})

export const VALID_EMAIL = 'VALID_EMAIL'
export const validateEmail = createAction(VALID_EMAIL, (email) => {
  return new BPromise((resolve) => {
    if (email === '') {
      const err = new Error('Error, Email cannot be blank.')
      err.name = 'email'
      throw err
    }

    if (!validator.isEmail(email)) {
      const err = new Error('Error, Email is invalid.')
      err.name = 'email'
      throw err
    }
    resolve()
  })
})

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
