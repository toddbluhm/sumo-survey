import { default as Fetch } from 'fetch-ponyfill';
import { default as BPromise } from 'bluebird';

const fetch = Fetch({
  Promise: BPromise
});

export { fetch as Fetch };

export const APIURL = `${process.env.API_URL}`;
