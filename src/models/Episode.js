const BaseModel = require('./BaseModel')
const crypto = require('crypto')

class Episode extends BaseModel {

    async $beforeInsert() {
        this.movieId = "SE" + crypto.randomBytes(5).toString('hex').toUpperCase()
    }

    static get relationMappings(){
        
        const Video = require('./Video')
        const Cover = require('./Cover')
        const Poster = require('./Poster')
        const Caption = require('./Caption')

        return {
            videos:{
                relation: BaseModel.HasManyRelation,
                modelClass: Video,
                join:{
                    from:'episodes.id',
                    to:'videos.episode_id'
                }
            },
            covers:{
                relation: BaseModel.HasManyRelation,
                modelClass: Cover,
                join:{
                    from:'episodes.id',
                    to:'covers.episode_id'
                }
            },
            posters:{
                relation: BaseModel.HasManyRelation,
                modelClass: Poster,
                join:{
                    from:'episodes.id',
                    to:'posters.episode_id'
                }
            },
            captions:{
                relation: BaseModel.HasManyRelation,
                modelClass: Caption,
                join:{
                    from:'episodes.id',
                    to:'captions.episode_id'
                }
            }
        }
    }
}

module.exports = Episode