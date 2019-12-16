const router = require('express-promise-router')()
const TvShowController = require('./../controllers/TvShowController')
const SeasonController = require('./../controllers/SeasonController')
const { upload } = require('./../middleware')

router.route('/tvshows')
    .get(TvShowController.index)

router.route('/tvshows/create')
    .get(TvShowController.create)
    .post(upload.fields([
        {name:'videos', maxCount: 6},
        {name:'covers', maxCount: 6},
        {name:'posters', maxCount: 6},
        {name:'captions', maxCount: 6},
    ]), TvShowController.insert)   

router.route('/tvshows/:tvshowId/seasons')
    .get(SeasonController.index) 

router.route('/tvshows/:tvshowId/delete')
    .get(TvShowController.delete)
module.exports = router