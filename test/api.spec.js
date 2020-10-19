
const chai = require('chai')
const chaiHttp = require('chai-http')
const uuid = require("uuid")
const fs = require("fs")
const expect = chai.expect
 
const base_url = 'http://localhost:3000'
var token = ''

chai.use(chaiHttp)

describe('Usuário', () => {
    const username = uuid.v4()

    it('Cadastrar', (done) => {
        user = {
            username: username,
            password: 'test'
        }

        chai.request(base_url)
            .post('/auth/signup')            
            .send(user)
            .end((err, res) => {
                expect(err).to.be.null
                expect(res.status).to.equal(200)
                expect(res.body).to.not.null
                expect(res.body.success).to.be.true
                done()
            })
    })

    it('Logar', (done) => {
        user = {
            username: username,
            password: 'test'
        }

        chai.request(base_url)
            .post('/auth')            
            .send(user)
            .end((err, res) => {
                expect(err).to.be.null
                expect(res.status).to.equal(200)
                expect(res.body).to.not.null
                expect(res.body.msg).to.not.null
                expect(res.body.token).to.not.null
                token = res.body.token
                done()
            })
    })

    it('Não cadastrar username existente', (done) => {
        user = {
            username: username,
            password: 'test'
        }

        chai.request(base_url)
            .post('/auth/signup')            
            .send(user)
            .end((err, res) => {
                expect(err).to.be.null
                expect(res.status).to.equal(409)
                done()
            })
    })

    it('Não logar com senha incorreta', (done) => {
        user = {
            username: username,
            password: 'fake'
        }

        chai.request(base_url)
            .post('/auth')            
            .send(user)
            .end((err, res) => {
                expect(err).to.be.null
                expect(res.status).to.equal(401)
                done()
            })
    })

    it('Não logar com username inexistente', (done) => {
        user = {
            username: uuid.v4(),
            password: '1'
        }

        chai.request(base_url)
            .post('/auth')            
            .send(user)
            .end((err, res) => {
                expect(err).to.be.null
                expect(res.status).to.equal(401)
                done()
            })
    })

})

describe("Filme", () => {
    var movie = {
        title: uuid.v4(),
        description: 'A test movie',
        date: '2001-08-15'
    }

    it('Cadastrar', (done) => {
        movie = {
            title: uuid.v4(),
            description: 'A test movie',
            date: '2001-08-15'
        }

        chai.request(base_url)
            .post('/movies')
            .set('x-access-token', token)            
            .field('title', movie.title)
            .field('description', movie.description)
            .field('date', movie.date)
            .attach('cover', fs.readFileSync(__dirname + '/assets/poderoso_chefao.jpg'), 'cover')
            .end((err, res) => {
                expect(err).to.be.null
                expect(res.status).to.equal(200)
                expect(res.body).to.not.null
                expect(res.body.object).to.not.null
                done()
            })
    })

    it('Não cadastrar sem título', (done) => {
        chai.request(base_url)
            .post('/movies')
            .set('x-access-token', token)            
            .field('description', movie.description)
            .field('date', movie.date)
            .attach('cover', fs.readFileSync(__dirname + '/assets/poderoso_chefao.jpg'), 'cover')
            .end((err, res) => {
                expect(err).to.be.null
                expect(res.status).to.equal(400)
                expect(res.body).to.not.null
                expect(res.body.msg).to.not.null
                done()
            })
    })

    it('Não cadastrar sem descrição', (done) => {
        chai.request(base_url)
            .post('/movies')
            .set('x-access-token', token)            
            .field('title', movie.title)
            .field('date', movie.date)
            .attach('cover', fs.readFileSync(__dirname + '/assets/poderoso_chefao.jpg'), 'cover')
            .end((err, res) => {
                expect(err).to.be.null
                expect(res.status).to.equal(400)
                expect(res.body).to.not.null
                expect(res.body.msg).to.not.null
                done()
            })
    })

    it('Não cadastrar sem data de lançamento', (done) => {
        chai.request(base_url)
            .post('/movies')
            .set('x-access-token', token)            
            .field('title', movie.title)
            .field('description', movie.description)
            .attach('cover', fs.readFileSync(__dirname + '/assets/poderoso_chefao.jpg'), 'cover')
            .end((err, res) => {
                expect(err).to.be.null
                expect(res.status).to.equal(400)
                expect(res.body).to.not.null
                expect(res.body.msg).to.not.null
                done()
            })
    })

    it('Não cadastrar sem capa', (done) => {
        chai.request(base_url)
            .post('/movies')
            .set('x-access-token', token)            
            .field('title', movie.title)
            .field('description', movie.description)
            .field('date', movie.date)
            .end((err, res) => {
                expect(err).to.be.null
                expect(res.status).to.equal(400)
                expect(res.body).to.not.null
                expect(res.body.msg).to.not.null
                done()
            })
    })

    it('Pesquisar por título', (done) => {    
        const query = {
            title: movie.title
        }

        chai.request(base_url)
            .get('/movies')
            .set('x-access-token', token)            
            .query(query)
            .end((err, res) => {
                expect(err).to.be.null
                expect(res.status).to.equal(200)
                expect(res.body).to.not.null
                expect(res.body).to.be.an('array')
                expect(res.body).to.not.empty
                expect(res.body[0].title).to.equal(movie.title)
                expect(res.body[0].description).to.equal(movie.description)
                expect(res.body[0].cover).to.not.null
                movie.id = res.body[0].objectId
                done()
            })
    })

    it('Pesquisar por ano de lançamento', (done) => {    
        const query = {
            year: movie.date.split('-')[0]
        }

        chai.request(base_url)
            .get('/movies')
            .set('x-access-token', token)            
            .query(query)
            .end((err, res) => {
                expect(err).to.be.null
                expect(res.status).to.equal(200)
                expect(res.body).to.not.null
                expect(res.body).to.be.an('array')
                expect(res.body).to.not.empty
                done()
            })
    })

    it('Listar', (done) => {    
        chai.request(base_url)
            .get('/movies')
            .set('x-access-token', token)            
            .end((err, res) => {
                expect(err).to.be.null
                expect(res.status).to.equal(200)
                expect(res.body).to.not.null
                expect(res.body).to.be.an('array')
                expect(res.body).to.not.empty                
                done()
            })
    })

    it('Atualizar dados', (done) => {
        let query = {
            title: uuid.v4(),
            description: "I changed it",
            date: '2002-01-01',
            id: movie.id
        }        

        chai.request(base_url)
            .put('/movies')
            .set('x-access-token', token)            
            .send(query)     
            .end((err, res) => {
                expect(err).to.be.null
                expect(res.status).to.equal(200)
                expect(res.body).to.not.null
                expect(res.body.success).to.be.true
                expect(res.body.object).to.not.null
                expect(res.body.object.title).to.not.equal(movie.title)
                expect(res.body.object.description).to.not.equal(movie.description)
                done()
            })
    })

    it('Não atualizar com id inexistente', (done) => {
        let query = {
            title: uuid.v4(),
            description: "I changed it",
            date: '2002-01-01',
            id: uuid.v4()
        }        

        chai.request(base_url)
            .put('/movies')
            .set('x-access-token', token)            
            .send(query)     
            .end((err, res) => {
                expect(err).to.be.null
                expect(res.status).to.equal(400)
                done()
            })
    })

})
