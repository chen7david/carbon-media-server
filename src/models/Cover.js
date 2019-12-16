const BaseModel = require('./BaseModel')
const crypto = require('crypto')

class Cover extends BaseModel {

    async $beforeInsert() {
        this.coverId = "CO" + crypto.randomBytes(5).toString('hex').toUpperCase()
    }
}

module.exports = Cover