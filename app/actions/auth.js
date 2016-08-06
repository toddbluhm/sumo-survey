import { createAction } from 'redux-actions';
import { Fetch, APIURL } from '../fetch';

export const LOGIN = 'LOGIN';
export const login = createAction(LOGIN, (email, password) => {
  return Fetch(`${APIURL}/login`, {
      method: 'POST',
      body: {
        email,
        password
      }
    })
    .then((res) => {
      if (res.status !== 200) {
        throw new Error("Not authenticated.");
      }
      return res.body;
    });
});

export const AUTHENTICATED = 'AUTHENTICATED';
export const authenticated = createAction(AUTHENTICATED, () => {
  return Fetch(`${APIURL}/authenticated`)
    .then((res) => {
      if (res.status !== 200) {
        throw new Error("Not authenticated.");
      }
      return res.json().body;
    });
});
