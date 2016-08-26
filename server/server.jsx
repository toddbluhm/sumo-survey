'use strict'

import express from 'express'
import morgan from 'morgan'
import { default as cookieParser } from 'cookie-parser'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { match } from 'react-router'
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect'
import { Provider } from 'react-redux'
import { configureStore } from '../app/store'
import { getRoutes } from '../app/routes'
import { Html } from './html'
import { default as Immutable } from 'immutable'
import { default as jwt } from 'jsonwebtoken'
import { default as uuid } from 'node-uuid'
import { default as device } from 'express-device'
import { setCookies } from '../app/fetch'

export function Init (webpackIsomorphicTools) {
  const app = express()
  // Add the http logging middleware
  app.use(morgan('combined'))
  app.use(cookieParser(process.env.COOKIE_SECRET))
  app.use(device.capture())

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

  app.use((req, res, next) => {
    // If no cookie then this must be a first time visitor
    if (!req.signedCookies.jwt) {
      // Create the guest jwt token
      const token = jwt.sign({
        sessionId: uuid.v4(),
        permissions: [
          'guest'
        ]
      }, process.env.JWT_SECRET, {
        issuer: process.env.JWT_ISSUER,
        audience: process.env.JWT_AUDIENCE,
        subject: process.env.JWT_SUBJECT
      })

      res.cookie('jwt', token, {
        signed: true,
        domain: process.env.HOST,
        path: '/',
        httpOnly: true,
        sameSite: 'Strict',
        maxAge: 60 * 60 * 24 * 365 // 1 year
      })

      // get the cookies from the res since none were sent through req
      setCookies(res.get('set-cookie'))
    } else {
      setCookies(req.get('cookie'))
    }
    next()
  })

  // Pass off handling of all other routes to React Router
  app.get('*', function (req, res) {
    // clear require() cache if in development mode
    // (makes asset hot reloading work)
    if (process.env.NODE_ENV === 'development') {
      webpackIsomorphicTools.refresh()
    }

    // on render pass the jwt token from the cookie into the react store for api authorization
    const store = configureStore(Immutable.fromJS({
      ui: {
        device: {
          isMobileDevice: res.locals.is_mobile,
          viewSize: res.locals.is_mobile ? 1000 : 1600
        }
      }
    }))
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
