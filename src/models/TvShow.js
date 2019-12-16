const BaseModel = require('./BaseModel')
const crypto = require('crypto')

class TvShow extends BaseModel {

    async $beforeInsert() {
        this.tvshowId = "TV" + crypto.randomBytes(5).toString('hex').toUpperCase()
    }

    static get relationMappings(){
        
        const Season = require('./Season')
        const Poster = require('./Poster')
        const Cover = require('./Cover')

        return {
            seasons:{
                relation: BaseModel.HasManyRelation,
                modelClass: Season,
                join:{
                    from:'tvshows.id',
                    to:'seasons.tvshow_id'
                }
            },
            covers:{
                relation: BaseModel.HasManyRelation,
                modelClass: Cover,
                join:{
                    from:'tvshows.id',
                    to:'covers.tvshow_id'
                }
            },
            posters:{
                relation: BaseModel.HasManyRelation,
                modelClass: Poster,
                join:{
                    from:'tvshows.id',
                    to:'posters.tvshow_id'
                }
            },
        }
    }
}

module.exports = TvShow