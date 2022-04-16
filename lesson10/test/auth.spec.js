const { registration } = require('../controllers/auth')
const jestConfig = require('../jest.config')
const authService = require('../services/auth')

describe('Auth', () => {
  // beforeAll(fn)
  // afterAll(fn)
  // beforeEach(fn)
  // afterEach(fn)
  let req, res
  beforeEach(() => {
    req = { body: { email: 'user@test.com', password: '123456' } }
    res = { status: jest.fn().mockReturnThis(), json: jest.fn((data) => data) }
    authService.create = jest.fn((data) => data)
  })
  test('signup new user', async () => {
    result = await registration(req, res)
    expect(authService.create).toHaveBeenCalled()
    expect(authService.create).toHaveBeenCalledWith(req.body)
    expect(result.code).toBe(201)
  })
})
