const BaseModel = require('./BaseModel')
const crypto = require('crypto')

class Episode extends BaseModel {

    async $beforeInsert() {
        this.movieId = "SE" + crypto.randomBytes(5).toString('hex').toUpperCase()
    }

    static get relationMappings(){
        
        const Episode = require('./Episode')

        return {
            seasons:{
                relation: BaseModel.HasManyRelation,
                modelClass: Episode,
                join:{
                    from:'seaons.id',
                    to:'episodes.season_id'
                }
            }
        }
    }
}

module.exports = Episode