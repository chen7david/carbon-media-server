const multer  = require('multer')
const path = require('path')
const crypto = require('crypto')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const video = ['video/mp4']
        const images = ['image/jpeg','image/png']
        const audio = ['audio/mp3']
        const captions = ['text/vtt', 'application/octet-stream']
         if (video.includes(file.mimetype)) {
              cb(null, 'src/public/uploads/video')
          } else if (images.includes(file.mimetype)) {
              cb(null, 'src/public/uploads/image')
          } else if (audio.includes(file.mimetype)) {
              cb(null, 'src/public/uploads/audio')
          } else if (captions.includes(file.mimetype)) {
              cb(null, 'src/public/uploads/captions')
          } else if (file.mimetype === 'application/pdf') {
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