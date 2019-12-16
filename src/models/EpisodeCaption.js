const BaseModel = require('./BaseModel')
const crypto = require('crypto')

class EpisodeCaption extends BaseModel {

    async $beforeInsert() {
        this.movieId = "EC" + crypto.randomBytes(5).toString('hex').toUpperCase()
    }
}

module.exports = EpisodeCaption