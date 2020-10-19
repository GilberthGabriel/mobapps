
const user = require('../models/user')

exports.sign_up = function(req, res, next) {
    user.add({
        username: req.body.username,
        password: req.body.password
    })
    .then(() => res.send({success: true}))
    .catch(err => {
        if(err.code == 202) return res.status(409).send(err)
        next(err)
    })
}

exports.sign_in = function(req, res, next) {
    user.sign_in({
        username: req.body.username,
        password: req.body.password
    })
    .then(token => res.send({msg: "Successfully logged in, use this token to sign the requests", token: token}))
    .catch(err => {
        if(err.code == 101) return res.status(401).send(err)
        next(err)
    })
}
