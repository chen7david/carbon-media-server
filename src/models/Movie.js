const BaseModel = require('./BaseModel')
const crypto = require('crypto')

class Movie extends BaseModel {

    async $beforeInsert() {
        this.movieId = "MO" + crypto.randomBytes(5).toString('hex').toUpperCase()
    }

    static get relationMappings(){
        
        const MovieCaption = require('./MovieCaption')

        return {
            captions:{
                relation: BaseModel.HasManyRelation,
                modelClass: MovieCaption,
                join:{
                    from:'movies.id',
                    to:'movie_captions.movie_id'
                }
            }
        }
    }
}

module.exports = Movie