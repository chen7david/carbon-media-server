const knexfile = require('./../../knexfile').development
const Knex = require('knex')(knexfile)
const pluralize = require('pluralize')
const { Model } = require('objection')
const { DBErrors } = require('objection-db-errors')
const files = require('./../helpers/files')

Model.knex(Knex)

class BaseModel extends DBErrors(Model) {

        static get modifiers() {
            return {
                default(query) {
                    query.where('default', true).first()
                }
            }
        }

        static get tableName() {
            return pluralize(this.name.toLowerCase())
        }

        static get modelPaths() {
            return [__dirname]
        }

        $formatJson(json) {
            json = super.$formatJson(json)
            delete json.id
            delete json.movie_id
            delete json.created_at
            delete json.updated_at
            return json
        }

        $beforeInsert(){
            const timestamp = new Date().toISOString()
            this.created_at = timestamp
            this.updated_at = timestamp
        }

        $beforeUpdate(){
            const timestamp = new Date().toISOString()
            this.updated_at = timestamp 
        }

        async $beforeDelete() {
            const relationMappings = Object.keys(this.constructor.relationMappings)

            // DELETE RELATED FILES STORED ON THE SYSTEM BEFORE DELETING THE OBJECT
            if(relationMappings.includes('covers')){
               const covers = await this.$relatedQuery('covers')
               covers.forEach(cover => files.delete('/image/'+cover.filename))
            }

            if(relationMappings.includes('posters')){
                const posters = await this.$relatedQuery('posters')
                posters.forEach(poster => files.delete('/image/'+poster.filename))
            }

            if(relationMappings.includes('captions')){
                const captions = await this.$relatedQuery('captions')
                captions.forEach(caption => files.delete('/captions/'+caption.filename))
            }

            if(relationMappings.includes('videos')){
                const videos = await this.$relatedQuery('videos')
                videos.forEach(video => files.delete('/video/'+video.filename))
            }
            // CALL DELETE ON CHILD OBJECTS
            if(relationMappings.includes('seasons')){
                const seasons = await this.$relatedQuery('seasons')
                for(let season of seasons){
                    await season.$query().delete()
                }
            }

            if(relationMappings.includes('episodes')){
                const episodes = await this.$relatedQuery('episodes')
                for(let episode of episodes){
                    await episode.$query().delete()
                }
            }

        }
}

module.exports = BaseModel