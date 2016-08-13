'use strict'

require('dotenv').config()

const express = require('express')
const app = express()
const database = require('../common/db').database
const session = require('express-session')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const routes = require('./routes').routes
const passport = require('passport')
const MySQLStore = require('express-mysql-session')(session)
const sessionStore = new MySQLStore({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})
require('../common/auth')
const cors = require('cors')

database.connect().then((db) => {
  // Add the http logging middleware
  app.use(morgan('combined'))

  // Useful middleware
  app.use(cors({
    origin: `http://${process.env.HOST}:${process.env.PORT}`
  }))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.disable('x-powered-by')

  // Session middleware
  app.use(session({
    maxAge: 31540000000,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore
  }))

  // Passport/auth middleware
  app.use(passport.initialize())
  app.use(passport.session())

  // Add in the API routes
  app.use('/api', routes)

  console.log(`API started and listen at ${process.env.API_HOST}:${process.env.API_PORT}`)
  app.listen(process.env.API_PORT, process.env.API_HOST)
})
