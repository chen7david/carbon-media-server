const router = require('express-promise-router')()
const EpisodeController = require('./../controllers/EpisodeController')
const { upload } = require('./../middleware')

router.route('/tvshows/:tvshowId/seasons/:seasonId/episode')
    .get(EpisodeController.create)
    .post(upload.fields([
        {name:'videos', maxCount: 6},
        {name:'covers', maxCount: 6},
        {name:'posters', maxCount: 6},
        {name:'captions', maxCount: 6},
    ]), EpisodeController.insert) 

router.route('/movies/:movieId/delete')
    .get(EpisodeController.delete)
module.exports = router