const Cats = require('../../repository/cats')
const { HTTP_STATUS_CODE } = require('../../libs/constants')
const { CustomError } = require('../../middlewares/error-handler')

class CatsService {
  async getAll(query, user) {
    const { limit = 5, skip = 0, sortBy, sortByDesc, filter } = query
    let sortCriteria = null
    let select = null
    if (sortBy) {
      sortCriteria = { [sortBy]: 1 }
    }
    if (sortByDesc) {
      sortCriteria = { [sortByDesc]: -1 }
    }
    //  filter=name|age|date => 'name age date'
    if (filter) {
      select = filter.split('|').join(' ')
    }

    const result = await Cats.listCats(
      { limit, skip, sortCriteria, select },
      user,
    )
    return result
  }

  async getById(id, user) {
    const cat = await Cats.getCatById(id, user)
    if (!cat) {
      throw new CustomError(HTTP_STATUS_CODE.NOT_FOUND, 'Not Found')
    }
    return cat
  }

  async create(body, user) {
    const cat = await Cats.addCat(body, user)
    return cat
  }

  async update(id, body, user) {
    const cat = await Cats.updateCat(id, body, user)
    if (!cat) {
      throw new CustomError(HTTP_STATUS_CODE.NOT_FOUND, 'Not Found')
    }
    return cat
  }

  async remove(id, user) {
    const cat = await Cats.removeCat(id, user)
    if (!cat) {
      throw new CustomError(HTTP_STATUS_CODE.NOT_FOUND, 'Not Found')
    }
    return cat
  }

  async getStatistics(user) {
    const result = await Cats.getStatistics(user)
    return result
  }
}

module.exports = new CatsService()
