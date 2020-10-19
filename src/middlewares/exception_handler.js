
module.exports = function(err, req, res, next) {
    console.error("Internal error:")
    console.error(err)
    res.status(500).send({error: "Sorry, an internal error has occurred, we have already been notified"})
}
