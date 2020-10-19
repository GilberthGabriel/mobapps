
const movie = require("../models/movies")

exports.get = function(req, res, next) {
    if(Object.keys(req.query).length > 0) { 
        movie.get({
            title: req.query.title,
            year: req.query.year
        })
        .then(data => res.send(data))
        .catch(err => {
            if(err.code == 0) return res.status(400).send(err)
            if(err.code == 1) return res.status(400).send(err)
            next(err)
        })
    } else {
        movie.get_all()
        .then(data => res.send(data))
        .catch(err => next(err))
    }
}

exports.add = function(req, res, next) {
    movie.add({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        cover: req.body.cover
    })
    .then(movie => res.send({success: true, object: movie}))
    .catch(err => {
        if(err.code == 0) return res.status(400).send(err)
        next(err)
    })
}

exports.update = function(req, res, next) {
    movie.update({
        id: req.body.id,
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        cover: req.body.cover,
    })
    .then(movie => res.send({success: true, object: movie}))
    .catch(err => {
        if(err.code == 101) return res.status(400).send(err)
        next(err)
    })
}
