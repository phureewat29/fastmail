const mongodb = require('mongodb')
const Config = require('../config')

let db

async function connect () {
  const url = Config.MONGODB_URI
  process.on('SIGINT', close).on('SIGTERM', close)
  return new Promise((resolve, reject) => {
    mongodb.MongoClient.connect(url, (err, res) => {
      if (err) reject(err)
      db = res
      resolve(db)
    })
  })
}

async function close () {
  if (db) {
    console.log('  MongoDB disconnected')
    await db.close()
  }
  process.exit(0)
}

async function init () {
  if (!db) {
    await connect()
  }
  return db
}

module.exports = { init }
