const BaseModel = require('./BaseModel')
const crypto = require('crypto')

class MovieCaption extends BaseModel {

    static get tableName(){
        return 'movie_captions'
    }

    async $beforeInsert() {
        this.movieId = "MC" + crypto.randomBytes(5).toString('hex').toUpperCase()
    }
}

module.exports = MovieCaption