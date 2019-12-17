const { Movie } = require('./../models')
const { LANGS } = require('./../config')
const files = require('./../helpers/files')
module.exports = {

    index: async (req, res) => {
        const movies = await Movie.query().withGraphFetched('[captions,videos,posters,covers]')
        res.render('movies/index.html', { movies })
    },
    create: async (req, res) => {
        res.render('movies/create.html')
    },
    insert: async (req, res) => {

        const { title, resolution, description } = req.body
        const { videos, covers, posters, captions } = req.files

        try{
            const object = await Movie.transaction( async trx => {

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
            files.rollback(files, req.files)
            return res.redirect('/movies')
        }
    },
    delete: async (req, res) => {

        try{

            const object = await Movie.transaction(async trx => {

                const { movieId } = req.params
                const movie = await Movie.query(trx)
                    .where('movieId', movieId).first()
                await movie.$query(trx).delete()
            })

            return res.redirect('/movies')
        }catch(err){
            console.log(err)
            return res.redirect('/movies')
        }
    }
}