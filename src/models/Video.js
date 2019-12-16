const BaseModel = require('./BaseModel')
const crypto = require('crypto')

class Video extends BaseModel {

    async $beforeInsert() {
        this.videoId = "VI" + crypto.randomBytes(5).toString('hex').toUpperCase()
    }
}

module.exports = Video