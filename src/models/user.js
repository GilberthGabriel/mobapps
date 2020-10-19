
const jwt = require('jsonwebtoken')

exports.add = function(data) {
    return new Promise(async (resolve, reject) => {
        var user = new Parse.User()
        user.set("username", data.username)
        user.set("password", data.password)
    
        try {
            await user.signUp()
            resolve()
        } catch (err) {
            reject(err)
        }
    })    
}

exports.sign_in = function(data) {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await Parse.User.logIn(data.username, data.password)
            let token = jwt.sign(user.toJSON(), process.env.JWT_TOKEN, { expiresIn: '1d' })
            resolve(token)
        } catch(err) {            
            reject(err)
        }  
    })    
}
