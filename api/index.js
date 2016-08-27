'use strict'

require('dotenv').config()

const express = require('express')
const app = express()
const database = require('./db').database
const bodyParser = require('body-parser')
const morgan = require('morgan')
const routes = require('./routes').routes
const passport = require('passport')
require('./auth')
const cors = require('cors')
const cookieParser = require('cookie-parser')

database.connect().then((db) => {
  // Add the http logging middleware
  app.use(morgan('combined'))

  // Useful middleware
  app.use(cors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type,Accepts,Authorization,X-Requested-With'
  }))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cookieParser(process.env.COOKIE_SECRET))
  app.disable('x-powered-by')

  // Session middleware
  // app.use(session({
  //   maxAge: 31540000000,
  //   secret: process.env.SESSION_SECRET,
  //   resave: false,
  //   saveUninitialized: true,
  //   store: sessionStore
  // }))

  // Passport/auth middleware
  app.use(passport.initialize())
  // app.use(passport.session())

  // Add in the API routes
  app.use('/api', routes)

  console.log(`API started and listen at ${process.env.API_HOST}:${process.env.API_PORT}`)
  app.listen(process.env.API_PORT, process.env.API_HOST)
})
