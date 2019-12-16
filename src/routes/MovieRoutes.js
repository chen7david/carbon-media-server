const router = require('express-promise-router')()
const MovieController = require('./../controllers/MovieController')
const { upload } = require('./../middleware')

router.route('/movies')
    .get(MovieController.index)

router.route('/movies/create')
    .get(MovieController.create)
    .post(upload.fields([
        {name:'videos', maxCount: 1},
        {name:'covers', maxCount: 1},
        {name:'posters', maxCount: 1},
        {name:'captions', maxCount: 1},
    ]), MovieController.insert)   

router.route('/movies/:movieId/delete')
    .get(MovieController.delete)
module.exports = router