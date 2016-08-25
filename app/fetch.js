import { default as axios } from 'axios'
import { default as BPromise } from 'bluebird'

export const APIURL = `${process.env.API_URL}`
export { axios as Fetch }

let serverCookies
export function setCookies (cookies) {
  serverCookies = cookies
}

export function FetchAPI (route, options = { headers: {} }) {
  let headers = {
    'Content-Type': 'application/json; charset=utf-8',
    Accept: 'application/json'
  }

  if (serverCookies && typeof window === 'undefined') {
    headers.Cookie = serverCookies
  }

  return axios({
    url: `${APIURL}${route}`,
    ...options,
    headers,
    withCredentials: true
  })
}
