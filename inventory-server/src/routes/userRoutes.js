const express = require('express');

const { UserServices } = require('../services');

const userRouter = express.Router();

userRouter.post('/register', async (req, res) => {
  try {
    const user = await UserServices.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = userRouter;
