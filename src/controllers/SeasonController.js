const { TvShow } = require('./../models')
const files = require('./../helpers/files')
module.exports = {

    index: async (req, res) => {
        const { tvshowId } = req.params
        const tvshow = await TvShow.query()
            .withGraphFetched('[seasons, covers, posters]')
            .where('tvshowId', tvshowId).first()
        res.render('seasons/index.html', { tvshow })
    },
    create: async (req, res) => {
        const { tvshowId } = req.params
        const tvshow = await TvShow.query()
            .withGraphFetched('[seasons, covers, posters]')
            .where('tvshowId', tvshowId).first()
        res.render('seasons/create.html', { tvshow })
    },
    insert: async (req, res) => {

        try{
            const object = await TvShow.transaction( async trx => {
                
                const { tvshowId } = req.params
                const tvshow = await TvShow.query()
                    .where('tvshowId', tvshowId).first()

                const { number } = req.body
                const { covers, posters } = req.files

                const season = await tvshow
                    .$relatedQuery('seasons').insert({number})

                // for(const [index, cover] of covers.entries()){
                //     const { filename, size, mimetype } = cover
                //     await tvshow.$relatedQuery('covers', trx)
                //         .insert({filename, size, mimetype, default: index == 0})
                // }

                // for(const [index, poster] of posters.entries()){
                //     const { filename, size, mimetype } = poster
                //     await tvshow.$relatedQuery('posters', trx)
                //         .insert({filename, size, mimetype, default: index == 0})
                // }
                console.log({season})
                return season;
            })

            return res.redirect(`/tvshows/${tvshowId}/seasons/create`)
        }catch(err){
            console.log(err)
            return res.redirect(`/tvshows`)
        }
    },

    delete: async (req, res) => {

        try{
            const object = await TvShow.transaction(async trx => {
                const { tvshowId } = req.params
                const tvshow = await TvShow.query(trx)
                    .withGraphFetched('[seasons, covers, posters]')
                    .where('tvshowId', tvshowId).first()

                const { covers, posters } = tvshow

                covers.forEach(cover => files.delete('/image/'+cover.filename))
                posters.forEach(poster => files.delete('/image/'+poster.filename))

                await tvshow.$query(trx).delete()
            })

            return res.redirect('/tvshows')
        }catch(err){
            console.log(err)
            return res.redirect('/tvshows')
        }
    }
}