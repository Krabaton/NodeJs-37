const role = require('../middlewares/role')
const { HTTP_STATUS_CODE, Role } = require('../libs/constants')

describe('Role Access', () => {
  let req, res, next
  beforeEach(() => {
    res = { status: jest.fn().mockReturnThis(), json: jest.fn((data) => data) }
    next = jest.fn()
  })

  it("Correct user's role", async () => {
    req = { user: { role: Role.ADMIN } }
    const middlewareWrapper = role(Role.ADMIN)
    await middlewareWrapper(req, res, next)
    expect(next).toHaveBeenCalled()
  })

  it("Incorrect user's role", async () => {
    req = { user: { role: Role.USER } }
    const middlewareWrapper = role(Role.ADMIN)
    const result = await middlewareWrapper(req, res, next)
    expect(res.status).toHaveBeenCalled()
    expect(res.json).toHaveBeenCalled()
    expect(result.code).toBe(HTTP_STATUS_CODE.FORBIDDEN)
  })
})
