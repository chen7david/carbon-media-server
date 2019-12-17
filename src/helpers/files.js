var fs = require('fs')
const { MEDIA_DIRECTORY } = require('./../config')
const path = MEDIA_DIRECTORY

module.exports = {
    delete: (fileName) => {          
        fs.unlink(path + fileName, function (err) {
            if (err) {
                console.log('file was not deleted because it could not be found!')
            }else{
                console.log('File deleted!')
                return
            }
        })
    },
    rollback: (files, uploads) => {
        const { videos, covers, posters, captions } = uploads
        
        if(videos && videos.length > 0){
           videos.forEach(video => files.delete('/video/'+video.filename))
        }

        if(covers && covers.length > 0){
            covers.forEach(cover => files.delete('/image/'+cover.filename))
        }

        if(posters && posters.length > 0){
            posters.forEach(poster => files.delete('/image/'+poster.filename))
        }

        if(captions && captions.length > 0){
            captions.forEach(caption => files.delete('/captions/'+caption.filename))
        }
        
    }
}


