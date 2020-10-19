
const Movie = Parse.Object.extend("movie")
const validator = require("../validators/movies")
const moment = require("moment")
const uuid = require("uuid")

exports.get_all = function() {
    return new Promise(async (resolve, reject) => {
        let query = new Parse.Query(Movie)

        try {
            let results = await query.find()
            resolve(results)            
        } catch(err) {
            reject(err)
        }
    })
}

exports.get = function(data) {
    return new Promise(async (resolve, reject) => {
        let query = new Parse.Query(Movie)

        if(!validator.query_fields(data)) return reject({code: 0, msg: "Missing query fields"})

        try {
            if(data.title) query.equalTo('title', data.title)
            if(data.year) query.greaterThanOrEqualTo('date', new Date(data.year, '0'))
            if(data.year) query.lessThan('date', new Date(parseInt(data.year)+1, '0'))

            let results = await query.find()
            resolve(results)            
        } catch(err) {
            if(err.toString().includes('Tried to encode an invalid date')) return reject({code: 1, msg: 'Invalid date format'})
            reject(err)
        }        
    })
}

exports.add = function(data) {    
    return new Promise(async (resolve, reject) => {
        if(!validator.post_field(data)) return reject({code: 0, msg: "Missing query fields"})

        try {
            let file = new Parse.File(uuid.v4(), { base64: data.cover })
            await file.save()

            let obj = new Movie()
            obj.set('title', data.title)
            obj.set('description', data.description)
            obj.set('date', moment(data.date).toDate())
            obj.set('cover', file)
            obj.save()
            
            resolve(obj)
        } catch(err) {
            reject(err)
        }
    })
}

exports.update = function(data) {
    return new Promise(async (resolve, reject) => {
        let query = new Parse.Query(Movie)        

        try {
            let obj = await query.get(data.id)
                                
            if(data.title) obj.set('title', data.title)
            if(data.description) obj.set('description', data.description)
            if(data.date) obj.set('date', moment(data.date).toDate())        
            if(data.cover) {
                let file = new Parse.File(uuid.v4(), { base64: data.cover })
                await file.save()
                obj.set('cover', file)
            }

            obj.save()
            resolve(obj)
        } catch(err) {
            reject(err)
        }
    })
}
