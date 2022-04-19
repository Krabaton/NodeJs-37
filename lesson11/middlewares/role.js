const { HTTP_STATUS_CODE } = require('../libs/constants')

const role = (role) => async (req, res, next) => {
  const currentUserRole = req.user.role

  if (currentUserRole !== role) {
    return res.status(HTTP_STATUS_CODE.FORBIDDEN).json({
      status: 'error',
      code: HTTP_STATUS_CODE.FORBIDDEN,
      message: 'Access denied',
    })
  }

  next()
}

module.exports = role
