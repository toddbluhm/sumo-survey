import { default as Fetch } from 'fetch-ponyfill'
import { default as BPromise } from 'bluebird'

const fetch = Fetch({
  Promise: BPromise
})

export const APIURL = `${process.env.API_URL}`
export { fetch as Fetch }

export function FetchAPI (route, ...rest) {
  return fetch(`${APIURL}${route}`, ...rest)
}
