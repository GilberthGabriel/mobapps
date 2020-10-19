
exports.query_fields = function(data) {
    if(data.title) return true
    if(data.year) return true
    return false
}

exports.post_field = function(data) {
    if(!data.title) return false
    if(!data.date) return false
    if(!data.description) return false
    if(!data.cover) return false
    return true
}
