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
    }
}
