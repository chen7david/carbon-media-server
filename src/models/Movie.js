const BaseModel = require('./BaseModel')
const crypto = require('crypto')

class Movie extends BaseModel {

    async $beforeInsert() {
        this.movieId = "MO" + crypto.randomBytes(5).toString('hex').toUpperCase()
    }
}

module.exports = Movie