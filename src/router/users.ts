import { authMiddleware } from '../middlewares/index';
import { Router } from 'express';
import {
  deleteUser,
  getUsers,
  getUser,
  updateUser
} from '../controllers/users';

export default (router: Router) => {
  router.get('/users', authMiddleware.isAuthenticated, getUsers);
  router.get('/users/:id', getUser);

  router.delete(
    '/users/:id',
    authMiddleware.isAuthenticated,
    authMiddleware.isOwner,
    deleteUser
  );

  router.patch(
    '/users/:id',
    authMiddleware.isAuthenticated,
    authMiddleware.isOwner,
    updateUser
  );
};
