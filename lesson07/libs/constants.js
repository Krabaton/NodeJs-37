const LIMIT_AGE_CAT = {
  min: 0,
  max: 20,
}

const HTTP_STATUS_CODE = {
  // HttpCode
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
}

const Role = {
  ADMIN: 'admin',
  USER: 'user',
}

module.exports = { LIMIT_AGE_CAT, HTTP_STATUS_CODE, Role }
