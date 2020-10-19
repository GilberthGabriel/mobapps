
const jwt = require("jsonwebtoken")

module.exports = function(req, res, next) {
    let token = req.body.token || req.query.token || req.headers['x-access-token']
    if(!token) return res.status(401).send({msg: "Access token not found"})
    jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
        if(err) return res.status(401).send({msg: "Invalid token"})
        req.user = user
        next()
    })
}
