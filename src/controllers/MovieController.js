const { Movie } = require('./../models')
const { transaction } = require('objection')
const files = require('./../helpers/files')
const { LANGS } = require('./../config')
module.exports = {

    index: async (req, res) => {
        const movies = await Movie.query().withGraphFetched('[captions,videos,posters,covers]')
        res.render('movies/index.html', { movies })
    },
    create: async (req, res) => {
        res.render('movies/create.html')
    },
    insert: async (req, res) => {

        try{
            const object = await Movie.transaction( async trx => {

                const { title, resolution, description } = req.body
                const { videos, covers, posters, captions } = req.files

                const movie = await Movie.query(trx).insert({
                    title,
                    resolution,
                    description
                })

                for(const [index, video] of videos.entries()){
                    const { filename, size, mimetype } = video
                    await movie.$relatedQuery('videos', trx)
                        .insert({filename, size, mimetype, default: index == 0})
                }

                for(const [index, cover] of covers.entries()){
                    const { filename, size, mimetype } = cover
                    await movie.$relatedQuery('covers', trx)
                        .insert({filename, size, mimetype, default: index == 0})
                }

                for(const [index, poster] of posters.entries()){
                    const { filename, size, mimetype } = poster
                    await movie.$relatedQuery('posters', trx)
                        .insert({filename, size, mimetype, default: index == 0})
                }

                for(const caption of captions){
                    const { filename, size, mimetype, originalname } = caption
                    let code = originalname.split('.')[1]
                    const srclang = Object.keys(LANGS).includes(code)? code : 'en'
                    await movie.$relatedQuery('captions', trx)
                        .insert({filename, size, mimetype, label: LANGS[code], srclang})
                }

                return movie;
            })

            return res.redirect('/movies')
        }catch(err){
            console.log(err)
            return res.redirect('/movies')
        }
    },
    delete: async (req, res) => {

        try{
            const object = await Movie.transaction(async trx => {
                const { movieId } = req.params
                const movie = await Movie.query(trx)
                    .withGraphFetched('[videos, covers, posters, captions]')
                    .where('movieId', movieId).first()

                const { videos, covers, posters, captions } = movie

                videos.forEach(video => files.delete('/video/'+video.filename))
                covers.forEach(cover => files.delete('/image/'+cover.filename))
                posters.forEach(poster => files.delete('/image/'+poster.filename))
                captions.forEach(caption => files.delete('/captions/'+caption.filename))

                await movie.$query(trx).delete()
            })

            return res.redirect('/movies')
        }catch(err){
            console.log(err)
            return res.redirect('/movies')
        }
    }
}