
const multer = require("multer")
const upload = multer().single('cover')

module.exports = function(req, res, next) {
    upload(req, res, (err) => {
        if(err) return next(err)
        if(req.file) req.body.cover = req.file.buffer.toString('base64')        
        next()
    })
}
