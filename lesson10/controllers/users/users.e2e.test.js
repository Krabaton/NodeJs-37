const request = require('supertest')
const fs = require('fs/promises')
const db = require('../../config/db')
const app = require('../../app')
const User = require('../../models/user')
const { newUserForUserTest } = require('../../test/data/data')

jest.mock('cloudinary')

describe('Test route users', () => {
  let token, connect

  beforeAll(async () => {
    connect = await db
  })

  afterAll(async () => {
    await User.deleteOne({ email: newUserForUserTest.email })
    await connect.disconnect()
  })

  it('User register', async () => {
    const res = await request(app)
      .post('/api/auth/registration')
      .send(newUserForUserTest)
      .set('Accept', 'application/json')
    expect(res.status).toEqual(201)
    expect(res.body).toBeDefined()
    expect(res.body.data).toHaveProperty('id')
  })
  it('User register with exist email: status 409', async () => {
    const res = await request(app)
      .post('/api/auth/registration')
      .send(newUserForUserTest)
      .set('Accept', 'application/json')
    expect(res.status).toEqual(409)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveProperty('message')
  })
  it('User login', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: newUserForUserTest.email,
        password: newUserForUserTest.password,
      })
      .set('Accept', 'application/json')

    expect(res.status).toEqual(200)
    expect(res.body).toBeDefined()
    expect(res.body.data).toHaveProperty('token')
    token = res.body.data.token
  })
  it('User update avatar', async () => {
    const buffer = await fs.readFile('./test/data/avatar-default.jpg')

    const res = await request(app)
      .patch('/api/users/avatar')
      .set('Authorization', `Bearer ${token}`)
      .attach('avatar', buffer, 'avatar-default.jpg')
    console.log(token)
    console.log(res.body)

    expect(res.status).toEqual(200)
    expect(res.body).toBeDefined()
  })
})
