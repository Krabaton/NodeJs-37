const request = require('supertest')
const jwt = require('jsonwebtoken')
const db = require('../../config/db')
const app = require('../../app')

const Cat = require('../../models/cat')
const User = require('../../models/user')
const { newCat, newUserForCatsTest } = require('../../test/data/data')

describe('Test cats controller', () => {
  let user, token, connect

  beforeAll(async () => {
    connect = await db
    user = await User.create(newUserForCatsTest)
    token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY)
    await User.updateOne({ _id: user._id }, { token })
  })

  afterAll(async () => {
    await User.deleteOne({ _id: user._id })
    await connect.disconnect()
  })

  beforeEach(async () => {
    await Cat.deleteMany()
  })

  describe('Route get cats', () => {
    it('should return status 200 for get all cats', async () => {
      const res = await request(app)
        .get('/api/cats')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toEqual(200)
      expect(res.body).toBeDefined()
      expect(res.body.payload.cats).toBeInstanceOf(Array)
    })
    it('should return status 200 for get cat by Id', async () => {
      const cat = await Cat.create({ ...newCat, owner: user._id })
      const res = await request(app)
        .get(`/api/cats/${cat._id}`)
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toEqual(200)
      expect(res.body).toBeDefined()
      expect(res.body.payload.cat).toHaveProperty('id')
      expect(res.body.payload.cat.id).toEqual(cat._id.toString())
    })
    it('should return status 404 if cat not found', async () => {
      const res = await request(app)
        .get(`/api/cats/${user._id}`)
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toEqual(404)
      expect(res.body).toBeDefined()
      expect(res.body).toHaveProperty('message')
    })
  })

  describe('Route POST for cats', () => {
    it('should return status 201 for created cat', async () => {
      const res = await request(app)
        .post(`/api/cats`)
        .set('Authorization', `Bearer ${token}`)
        .send(newCat)
        .set('Accept', 'application/json')

      expect(res.status).toEqual(201)
      expect(res.body).toBeDefined()
      expect(res.body.payload.cat).toHaveProperty('id')
      expect(res.body.payload.cat.name).toEqual(newCat.name)
    })
  })
})
