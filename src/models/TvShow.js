const BaseModel = require('./BaseModel')
const crypto = require('crypto')

class TvShow extends BaseModel {

    static get tableName(){
        return 'tv_shows'
    }

    async $beforeInsert() {
        this.movieId = "TV" + crypto.randomBytes(5).toString('hex').toUpperCase()
    }

    static get relationMappings(){
        
        const Season = require('./Season')

        return {
            seasons:{
                relation: BaseModel.HasManyRelation,
                modelClass: Season,
                join:{
                    from:'tv_shows.id',
                    to:'seaons.tvShow_id'
                }
            }
        }
    }
}

module.exports = TvShow