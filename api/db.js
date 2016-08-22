'use strict'

const Sequelize = require('sequelize')
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql'
})
const scrypt = require('scrypt')

// Models
const Question = sequelize.define('question', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  text: Sequelize.TEXT
})

const Answer = sequelize.define('answer', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  text: Sequelize.TEXT,
  result: Sequelize.BIGINT
})

const User = sequelize.define('user', {
  email: {
    type: Sequelize.TEXT,
    validate: {
      isEmail: true
    }
  },
  password_hash: Sequelize.STRING(128)
})

User.prototype.setPassword = function (password) {
  return scrypt.kdf(password, {
    N: 14,
    r: 8,
    p: 1
  })
    .then((res) => {
      this.password_hash = res.toString('base64')
      return
    })
}

User.prototype.verifyPassword = function (password) {
  return scrypt.verifyKdf(new Buffer(this.password_hash, 'base64'), new Buffer(password))
}

User.prototype.toJSON = function () {
  let values = this.get()
  delete values.password_hash
  return values
}

const Session = sequelize.define('session', {
  sessionId: {
    type: Sequelize.STRING({
      length: 36
    }),
    unique: true
  },
  data: Sequelize.TEXT
})

// Relationships
Question.hasMany(Answer, {
  onDelete: 'CASCADE'
})
User.hasMany(Question, {
  onDelete: 'CASCADE'
})

// DB Manager Class
class DB {
  get User () {
    return User
  }

  get Question () {
    return Question
  }

  get Answer () {
    return Answer
  }

  get Session () {
    return Session
  }

  constructor () {
    this.isConnected = false
  }

  connect () {
    return sequelize.sync()
      .then(() => {
        this.isConnected = true
        return this
      })
  }

  close () {
    return sequelize.close()
  }
}

module.exports.database = new DB()
