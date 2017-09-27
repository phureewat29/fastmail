const mongodb = require('mongodb')
let db

async function connect () {
  const url = process.env.MONGO_URL || 'mongodb://localhost:27017/fastmail'
  process.on('SIGINT', close).on('SIGTERM', close)
  return new Promise((resolve, reject) => {
    mongodb.MongoClient.connect(url, (err, res) => {
      if (err) reject(err)
      console.log(`  Connected to MongoDB ${url}`)
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
