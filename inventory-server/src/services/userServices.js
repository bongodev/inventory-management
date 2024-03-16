const bcrypt = require('bcrypt');
const { User } = require('../models');

const createUser = async (payload) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(payload.password, salt);

  const user = new User({ ...payload, password: hash });
  return await user.save();
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

const UserServices = { createUser, getUserByEmail };

module.exports = UserServices;
