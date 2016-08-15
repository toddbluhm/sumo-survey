'use strict'

import express from 'express'
import morgan from 'morgan'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { match } from 'react-router'
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect'
import { Provider } from 'react-redux'
import { configureStore } from '../app/store'
import { getRoutes } from '../app/routes'
import { Html } from './html'

export function Init (webpackIsomorphicTools) {
  const app = express()
  // Add the http logging middleware
  app.use(morgan('combined'))

  app.disable('x-powered-by')

  // if we are in development mode then prox the asset requests to the webpack dev server
  // if (process.env.NODE_ENV === "development") {
  //   app.use("/assets", proxy(`http://localhost:${process.env.WEBPACK_PORT}`, {
  //     forwardPath: function(req, res) {
  //       const path = `/assets${require('url').parse(req.url).path}`
  //       return path
  //     }
  //   }))
  // } else {
  //   // hosting static assests
  //   app.use('/assets', express.static(__dirname + '/assets'))
  // }

  // Pass off handling of all other routes to React Router
  app.get('*', function (req, res) {
    // clear require() cache if in development mode
    // (makes asset hot reloading work)
    if (process.env.NODE_ENV === 'development') {
      webpackIsomorphicTools.refresh()
    }

    const store = configureStore()
    const routes = getRoutes(store)

    // Note that req.url here should be the full URL path from
    // the original request, including the query string.
    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
      if (error) {
        return res.status(500).send(error.message)
      } else if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      } else if (renderProps) {
        // use load on server to wait for async data
        return loadOnServer({ ...renderProps, store }).then(() => {
          // You can also check renderProps.components or renderProps.routes for
          // your "not found" component or route respectively, and send a 404 as
          // below, if you're using a catch-all route.
          const component = (
            <Provider store={store} key={'provider'}>
              <ReduxAsyncConnect {...renderProps} />
            </Provider>
          )

          global.navigator = {
            userAgent: req.headers['user-agent']
          }

          return res.status(200).send(
            renderToString(
              <Html assets={webpackIsomorphicTools.assets()} store={store} component={component} />
            )
          ).end()
        })
      }
      return res.status(404).send('Not found')
    })
  })

  console.log(`Web App started and listen at ${process.env.HOST}:${process.env.PORT}`)
  app.listen(process.env.PORT, process.env.HOST)
}
