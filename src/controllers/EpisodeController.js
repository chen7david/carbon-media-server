const { TvShow, Season, Episode } = require('./../models')
const files = require('./../helpers/files')
const { LANGS } = require('./../config')

module.exports = {

    index: async (req, res) => {
        const { tvshowId, seasonId } = req.params
        const tvshow = await TvShow.query()
            .withGraphFetched('[seasons, covers, posters]')
            .where('tvshowId', tvshowId).first()
        const curSeason = await Season.query()
            .withGraphFetched('episodes.[videos, covers, posters]')
            .where('seasonId', seasonId).first()
        res.render('seasons/index.html', { tvshow, curSeason })
    },
    create: async (req, res) => {
        const { tvshowId, seasonId } = req.params
        const season = await Season.query()
            .withGraphFetched('[episodes, tvshow]')
            .where('seasonId', seasonId).first()
            console.log(season)
        res.render('episode/create.html', { season })
    },
    insert: async (req, res) => {

        try{
            const { tvshowId, seasonId } = req.params
            const object = await Season.transaction( async trx => {
                const season = await Season.query()
                    .where('seasonId', seasonId).first()

                const { number, title, released, description } = req.body
                const { covers, posters, videos, captions } = req.files

                const episode = await season
                    .$relatedQuery('episodes').insert({
                        number,
                        title, 
                        released, 
                        description
                    })

                    for(const [index, video] of videos.entries()){
                        const { filename, size, mimetype } = video
                        await episode.$relatedQuery('videos', trx)
                            .insert({filename, size, mimetype, default: index == 0})
                    }
    
                    for(const [index, cover] of covers.entries()){
                        const { filename, size, mimetype } = cover
                        await episode.$relatedQuery('covers', trx)
                            .insert({filename, size, mimetype, default: index == 0})
                    }
    
                    for(const [index, poster] of posters.entries()){
                        const { filename, size, mimetype } = poster
                        await episode.$relatedQuery('posters', trx)
                            .insert({filename, size, mimetype, default: index == 0})
                    }
    
                    for(const caption of captions){
                        const { filename, size, mimetype, originalname } = caption
                        let code = originalname.split('.')[1]
                        const srclang = Object.keys(LANGS).includes(code)? code : 'en'
                        await episode.$relatedQuery('captions', trx)
                            .insert({filename, size, mimetype, label: LANGS[code], srclang})
                    }

                console.log({season})
                return season;
            })

            return res.redirect(` /tvshows/${tvshowId}/seasons/${seasonId}/episode`)
        }catch(err){
            console.log(err)
            files.rollback(files, req.files)
            return res.redirect(`/tvshows`)
        }
    },

    delete: async (req, res) => {
        console.log(req.params)
        try{
            const { tvshowId, seasonId } = req.params
            const object = await TvShow.transaction(async trx => {
                
                const season = await Season.query(trx)
                    .where('seasonId', seasonId).first()
                await season.$query(trx).delete()
            })

            return res.redirect(`/tvshows`)
        }catch(err){
            console.log(err)
            return res.redirect('/tvshows')
        }
    }
}