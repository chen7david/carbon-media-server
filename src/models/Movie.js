const BaseModel = require('./BaseModel')
const crypto = require('crypto')

class Movie extends BaseModel {

    async $beforeInsert() {
        this.movieId = "MO" + crypto.randomBytes(5).toString('hex').toUpperCase()
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
                    from:'movies.id',
                    to:'videos.movie_id'
                }
            },
            covers:{
                relation: BaseModel.HasManyRelation,
                modelClass: Cover,
                join:{
                    from:'movies.id',
                    to:'covers.movie_id'
                }
            },
            posters:{
                relation: BaseModel.HasManyRelation,
                modelClass: Poster,
                join:{
                    from:'movies.id',
                    to:'posters.movie_id'
                }
            },
            captions:{
                relation: BaseModel.HasManyRelation,
                modelClass: Caption,
                join:{
                    from:'movies.id',
                    to:'captions.movie_id'
                }
            }
        }
    }
}

module.exports = Movie