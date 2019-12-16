const router = require('express-promise-router')()
const MovieController = require('./../controllers/MovieController')
const { upload } = require('./../middleware')

router.route('/movies')
    .get(MovieController.index)

router.route('/movies/create')
    .get(MovieController.create)
    .post(upload.fields([
        {name:'videos', maxCount: 6},
        {name:'covers', maxCount: 6},
        {name:'posters', maxCount: 6},
        {name:'captions', maxCount: 6},
    ]), MovieController.insert)   

router.route('/movies/:movieId/delete')
    .get(MovieController.delete)
module.exports = router