import React, { Component, PropTypes } from 'react'
import { renderToString } from 'react-dom/server'
import serialize from 'serialize-javascript'

export class Html extends Component {
  static propTypes = {
    assets: PropTypes.object.isRequired,
    component: PropTypes.element.isRequired,
    store: PropTypes.object.isRequired
  }

  render () {
    const { assets, store, component } = this.props

    // favicon
    // const icon = require('../assets/images/icon/32x32.png')

    return (
      <html lang={"en-us"}>
        <head>
          <meta charSet={"utf-8"} />
          <title>
            Sumo Survey
          </title>
          <meta name={"viewport"} content={"width=device-width,initial-scale=1"} />
          {/* favicon *//* favicon */}
          <link rel={"shortcut icon"} href={"null"} />
          {/* styles (will be present only in production with webpack extract text plugin) *//* styles (will be present only in production with webpack extract text plugin) */}
          {Object.keys(assets.styles).map((style, i) => (
            <link href={assets.styles[style]} key={i} media={"screen, projection"} rel={"stylesheet"} type={"text/css"} />
          ))}
        </head>
        <body>
          {/* rendered React page *//* rendered React page */}
          <div id={"app"} dangerouslySetInnerHTML={{ __html: `<div>${renderToString(component)}</div>` }} />
          {/* Flux store data will be reloaded into the store on the client *//* Flux store data will be reloaded into the store on the client */}
          <script dangerouslySetInnerHTML={{ __html: `window.__data=${serialize(store.getState())};` }} />
          {/* javascripts *//* javascripts */}
          {/* (usually one for each "entry" in webpack configuration) *//* (usually one for each "entry" in webpack configuration) */}
          {/* (for more informations on "entries" see https://github.com/petehunt/webpack-howto/) *//* (for more informations on "entries" see https://github.com/petehunt/webpack-howto/) */}
          {Object.keys(assets.javascript).map((script, i) => <script src={assets.javascript[script]} key={i} />)}
        </body>
      </html>
    )
  }
}
