const getConnection = require('../libs/postgres');
const boom = require('@hapi/boom');

const { models } = require('./../libs/sequalize');;
class UserService {
  constructor() {}

  async create(data) {
    const newUSer = await models.User.create(data);
    return data;
  }

  async find() {
    const rta = await models.User.findAll(); 
    return rta;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if(!user){
     throw boom.notFound('user not found');
    }
    return { user };
  }

  async update(id, changes) {
    const user = await models.User.findByPk(id);
    if(!user){
      throw boom.notFound('user not found');
     }
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await models.User.findByPk(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
