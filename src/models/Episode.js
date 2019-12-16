const BaseModel = require('./BaseModel')
const crypto = require('crypto')

class Episode extends BaseModel {

    async $beforeInsert() {
        this.movieId = "SE" + crypto.randomBytes(5).toString('hex').toUpperCase()
    }

    static get relationMappings(){
        
        const EpisodeCaption = require('./EpisodeCaption')

        return {
            captions:{
                relation: BaseModel.HasManyRelation,
                modelClass: EpisodeCaption,
                join:{
                    from:'episodes.id',
                    to:'episode_captions.episode_id'
                }
            }
        }
    }
}

module.exports = Episode