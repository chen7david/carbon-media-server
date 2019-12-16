const BaseModel = require('./BaseModel')
const crypto = require('crypto')

class Caption extends BaseModel {

    async $beforeInsert() {
        this.captionId = "CA" + crypto.randomBytes(5).toString('hex').toUpperCase()
    }
}

module.exports = Caption