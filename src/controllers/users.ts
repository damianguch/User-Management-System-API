import { Request, Response } from 'express';
import {
  deleteUserById,
  getUserById,
  getAllUsers,
  updateUserById
} from '../services/users.services';

//@ Get Users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Server error.' });
  }
};

//@ Get One User
export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

//@ Delete User
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUserById(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User Not Found!' });
    }

    return res.status(200).json({ deletedUser, message: 'User deleted!' });
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error!' });
  }
};

//@ Update User
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ message: 'Enter Credential to update' });
    }

    //const user = await getUserById(id);
    //if (!user) return res.status(404).json({ message: 'User Not Found!' });
    // user.username = username;
    // await user.save();

    const user = await updateUserById(id, { username });
    if (!user) {
      return res.status(404).json({ message: 'User Not Found!' });
    }

    const updatedUser = await getUserById(id);
    return res.status(200).json({ updatedUser, message: 'User Updated!' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
