import { default as Fetch } from 'fetch-ponyfill'
import { default as BPromise } from 'bluebird'

const fetch = Fetch({
  Promise: BPromise
})

export const APIURL = `${process.env.API_URL}`
let jwtToken
export function setJWT (jwt) {
  jwtToken = jwt
}
export { fetch as Fetch }

export function FetchAPI (route, options = { headers: {} }) {
  let headers = {}
  if (jwtToken) {
    headers = Object.assign({}, options.headers, {
      Authorization: `Bearer ${jwtToken}`
    })
  }

  return fetch(`${APIURL}${route}`, {
    ...options,
    headers
  })
}
