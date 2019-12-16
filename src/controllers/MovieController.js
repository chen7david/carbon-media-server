const { Movie } = require('./../models')
const { transaction } = require('objection')
const files = require('./../helpers/files')
const { LANGS } = require('./../config')
module.exports = {

    index: async (req, res) => {
        const movies = await Movie.query().withGraphFetched('captions')
        res.render('movies/index.html', { movies })
    },
    create: async (req, res) => {
        res.render('movies/create.html')
    },
    insert: async (req, res) => {

        const { title, resolution, description } = req.body
        const { videos, covers, posters, captions } = req.files
        console.log(Object.keys(LANGS))

        try{
            const object = await Movie.transaction( async trx => {
                const movie = await Movie.query(trx).insert({
                    title,
                    resolution,
                    description,
                    fileName: vidoes[0].filename,
                    size: vidoes[0].size,
                    mimeType: vidoes[0].mimetype,
                })

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
                .where('movieId',movieId).first()

                await movie.$query(trx).delete()
            })

            return res.redirect('/movies')
        }catch(err){
            console.log(err)
            return res.redirect('/movies')
        }
        

        

        
    }

}