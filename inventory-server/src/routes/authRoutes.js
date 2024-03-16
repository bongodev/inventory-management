const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const express = require('express');

const { UserServices } = require('../services');

const authRouter = express.Router();

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await UserServices.getUserByEmail(email);
  if (!user) {
    return res.status(401).json({ message: 'User not found' });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return res.status(401).json({ message: 'Password is wrong' });
  }

  const accessToken = jwt.sign(
    { email: user.email, id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '2m' }
  );

  res.status(200).json({ accessToken });
});

module.exports = authRouter;
