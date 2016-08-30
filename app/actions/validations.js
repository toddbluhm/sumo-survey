import { createAction } from 'redux-actions'
import { default as validator } from 'validator'
import { default as BPromise } from 'bluebird'

export const PASSWORDS_MATCH = 'PASSWORDS_MATCH'
export const validatePasswords = createAction(PASSWORDS_MATCH, (pass1, pass2) => {
  return new BPromise((resolve, reject) => {
    if (pass1 === '') {
      const err = new Error('Error, Password cannot be blank.')
      err.name = 'password'
      return reject(err)
    }

    if (pass1 !== pass2) {
      const err = new Error('Error, Passwords do not match.')
      err.name = 'password2'
      return reject(err)
    }

    if (pass1.length < 7) {
      const err = new Error('Error, Password is too short. ( > 6 characters)')
      err.name = 'password'
      return reject(err)
    }
    resolve()
  })
})

export const VALID_EMAIL = 'VALID_EMAIL'
export const validateEmail = createAction(VALID_EMAIL, (email) => {
  return new BPromise((resolve, reject) => {
    if (email === '') {
      const err = new Error('Error, Email cannot be blank.')
      err.name = 'email'
      return reject(err)
    }

    if (!validator.isEmail(email)) {
      const err = new Error('Error, Email is invalid.')
      err.name = 'email'
      return reject(err)
    }
    resolve()
  })
})

export const RESET_VALIDATIONS = 'RESET_VALIDATIONS'
export const resetValidations = createAction(RESET_VALIDATIONS)
