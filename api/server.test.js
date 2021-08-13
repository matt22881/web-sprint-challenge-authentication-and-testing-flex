// Write your tests here

const request = require('supertest')
const server = require('./server')
const Users = require('./users/users-model')
const db = require('../data/dbConfig')
let token

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
  await db.seed.run()
})

beforeEach(async () => {
  await db('users').truncate()
  await db.seed.run()
})

afterAll(async () => {
  await db.destroy()
})

test('sanity', () => {
  expect(true).toBeTruthy()
})

describe('[POST] /register', () => {
  it('registers a new user', () => {
    request(server)
      .post('/api/auth/register')
      .send({ username: 'name', password: 'pass' })
      .expect('Content-Type', /json/)
      .expect('res.status', 201)
  })
  it('resolves to the new user object', () => {
    request(server)
      .post('/api/auth/register')
      .send({ username: 'name', password: 'pass' })
      .expect('res.body.username', 'name')
  })
})

describe('[POST] /login', () => {
  it('logs in the new user', () => {
    request(server)
      .post('/api/auth/login')
      .send({ username: 'Captain Marvel', password: 'foobar' })
      .expect('Content-Type', /json/)
      .expect('res.status', 201)
  })
  it('returns the token', () => {
    request(server)
      .post('/api/auth/login')
      .send({ username: 'Captain Marvel', password: 'foobar' })
      .expect('res.body.token', true)
  })
})

describe('[GET] /jokes', () => {
  let token = null
  
  beforeAll(async function () {
    request(server)
      .post('/user/token')
      .send({ username: 'Captain Marvel', password: 'foobar' })
      .end(function (err, res) {
        token = res.body.token
        // done()
      })
  })
  it('returns a status 200', async () => {
    // await request(server)
    //   .get('/api/jokes')
    //   .set('Authorization', 'res.body.token')
    //   .expect(200)    
  })
      
  it('resolves to the array of jokes', async () => {
    //  await request(server)
    //   .get('/api/jokes')
    //   .set('Authorization', 'res.body.token')
    //   .expect('typeOf.res.body', 'array') 
    // })
  })
})