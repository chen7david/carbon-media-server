const { TvShow } = require('./../models')
const { transaction } = require('objection')
const files = require('./../helpers/files')
const { LANGS } = require('./../config')
module.exports = {

    index: async (req, res) => {
        const tvshows = await TvShow.query().withGraphFetched('[seasons, covers, posters]')
        res.render('tvshows/index.html', { tvshows })
    },
    create: async (req, res) => {
        res.render('tvshows/create.html')
    },
    insert: async (req, res) => {
        try{
            const object = await TvShow.transaction( async trx => {

                const { title, description, released } = req.body
                const { covers, posters } = req.files

                const tvshow = await TvShow.query(trx).insertGraph({
                    title,
                    released,
                    description,
                    seasons: [
                        { number: 1 }
                    ]
                })

                for(const [index, cover] of covers.entries()){
                    const { filename, size, mimetype } = cover
                    await tvshow.$relatedQuery('covers', trx)
                        .insert({filename, size, mimetype, default: index == 0})
                }

                for(const [index, poster] of posters.entries()){
                    const { filename, size, mimetype } = poster
                    await tvshow.$relatedQuery('posters', trx)
                        .insert({filename, size, mimetype, default: index == 0})
                }

                return tvshow;
            })

            return res.redirect('/tvshows')
        }catch(err){
            console.log(err)
            files.rollback(files, req.files)
            return res.redirect('/tvshows')
        }
    },

    delete: async (req, res) => {

        try{
            const object = await TvShow.transaction(async trx => {
                
                const { tvshowId } = req.params
                const tvshow = await TvShow.query(trx)
                    .where('tvshowId', tvshowId).first()
                await tvshow.$query(trx).delete()
            })

            return res.redirect('/tvshows')
        }catch(err){
            console.log(err)
            return res.redirect('/tvshows')
        }
    }
}