const BaseModel = require('./BaseModel')
const crypto = require('crypto')

class Season extends BaseModel {

    async $beforeInsert() {
        this.seasonId = "SE" + crypto.randomBytes(5).toString('hex').toUpperCase()
    }

    static get relationMappings(){
        
        const Episode = require('./Episode')
        const Poster = require('./Poster')
        const Cover = require('./Cover')
        
        return {
            episodes:{
                relation: BaseModel.HasManyRelation,
                modelClass: Episode,
                join:{
                    from:'seaons.id',
                    to:'episodes.season_id'
                }
            },
            covers:{
                relation: BaseModel.HasManyRelation,
                modelClass: Cover,
                join:{
                    from:'seasons.id',
                    to:'covers.season_id'
                }
            },
            posters:{
                relation: BaseModel.HasManyRelation,
                modelClass: Poster,
                join:{
                    from:'seasons.id',
                    to:'posters.season_id'
                }
            },
        }
    }
}

module.exports = Season