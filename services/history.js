const mongodb = require('../libs/mongodb')

/** 
 * GET: /history?q=
 * Fetch sent history by email.
 */
async function handler (req, res, next) {
  const db = await mongodb.init()

  const histories = await db.collection('histories')
    .find({ to: { $regex: req.query.q } })
    .sort({ created_at: -1 })
    .toArray()
  return res.json(histories)
}

module.exports = handler
