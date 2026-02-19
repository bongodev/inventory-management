import { Request, Response } from 'express';
import { userService } from '.';

export const createUser = async (req: Request, res: Response) => {
  const newUser = await userService.createUser(req.body);
  res.status(201).json(newUser);
};

export const getUsers = async (_req: Request, res: Response) => {
  const users = await userService.getUsers();
  res.status(200).json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const user = await userService.getUserById(req.params.id);
  res.status(200).json(user);
};

export const updateUserById = async (req: Request, res: Response) => {
  const updatedUser = await userService.updateUserById(req.params.id, req.body);

  if (!updatedUser) return res.status(404).json({ message: 'User not found' });

  return res
    .status(200)
    .json({ users: updatedUser, message: 'User updated successful' });
};

export const deleteUserById = async (req: Request, res: Response) => {
  await userService.deleteUser(req.params.id, req.user);

  return res.status(200).json({ message: 'User delete successful' });
};

export const restoreUser = async (req: Request, res: Response) => {
  await userService.restoreUser(req.params.id);

  return res.status(200).json({
    message: 'User restored successful',
  });
};

export const searchUser = async (req: Request, res: Response) => {
  const users = await userService.searchUsers(req.body);
  return res.status(200).json(users);
};
