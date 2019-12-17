const multer  = require('multer')
const path = require('path')
const crypto = require('crypto')
const { FORMATS } = require('./../config')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
          if (FORMATS.video.includes(file.mimetype)) {
              cb(null, 'src/public/uploads/video')
          } else if (FORMATS.images.includes(file.mimetype)) {
              cb(null, 'src/public/uploads/image')
          } else if (FORMATS.audio.includes(file.mimetype)) {
              cb(null, 'src/public/uploads/audio')
          } else if (FORMATS.captions.includes(file.mimetype)) {
              cb(null, 'src/public/uploads/captions')
          } else if (FORMATS.file.mimetype === 'application/pdf') {
              cb(null, 'src/public/uploads/pdf')
          } else {
              cb({ error: 'Mime type not supported' })
              console.log('Mime type not supported')
          }
    },
    filename: function(req, file, cb) {
        cb(null, crypto.randomBytes(8).toString('hex').toUpperCase() + path.extname(file.originalname));
    }
})

module.exports = multer({ storage: storage })