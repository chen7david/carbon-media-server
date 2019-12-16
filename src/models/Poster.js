const BaseModel = require('./BaseModel')
const crypto = require('crypto')

class Poster extends BaseModel {

    async $beforeInsert() {
        this.posterId = "PO" + crypto.randomBytes(5).toString('hex').toUpperCase()
    }
}

module.exports = Poster