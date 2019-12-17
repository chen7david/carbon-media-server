const router = require('express-promise-router')()
const SeasonController = require('../controllers/SeasonController')
const { upload } = require('../middleware')

router.route('/tvshows/:tvshowId/seasons/:seasonId')
    .get(SeasonController.index) 

router.route('/tvshows/:tvshowId/seasons/create')
    .get(SeasonController.create)
    .post(upload.fields([
        {name:'covers', maxCount: 6},
        {name:'posters', maxCount: 6},
    ]),SeasonController.insert)

router.route('/tvshows/:tvshowId/seasons/:seasonId/delete')
    .get(SeasonController.delete)

module.exports = router