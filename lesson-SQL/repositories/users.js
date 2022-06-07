const bcrypt = require('bcryptjs')
const { User, Gender } = require('../models')
const { Gender: EnumGender } = require('../helpers/constants')

const findById = async (id) => {
  return await User.findOne({ where: { id } })
}

const findByEmail = async (email) => {
  return await User.findOne({ where: { email } })
}

const create = async (body) => {
  const { name = 'Guest', email, password, gender = EnumGender.NONE } = body
  const { id } = await Gender.findOne({ where: { name: gender } })

  const newUser = await User.create({
    name,
    email,
    password: await bcrypt.hash(password, bcrypt.genSaltSync(6)),
    gender: id,
  })
  return await newUser
}

const updateToken = async (id, token) => {
  return await User.update({ token }, { where: { id } })
}

module.exports = {
  findById,
  findByEmail,
  create,
  updateToken,
}
