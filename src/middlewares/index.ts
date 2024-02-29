import { NextFunction, Request, Response } from 'express';
import { get, merge } from 'lodash';
import { getUserBySessionToken } from '../services/users.services';

export const authMiddleware = {
  /** Owner Middleware
   * Check if the current user, identified by the 'identity._id' field in
   * the request object, is the owner of the resource specified by the 'id'
   * parameter in the request URL.
   */
  isOwner: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const currentUserId = get(req, 'identity._id') as string;

      if (!currentUserId) {
        return res.status(400).json({ message: 'Current User Not Found!' });
      }

      if (currentUserId.toString() !== id) {
        return res.status(403).json({ message: 'Permission Denied!' });
      }
      next();
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Server Error!' });
    }
  },

  //@ Authentication Middleware
  isAuthenticated: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Track the cookies
      const sessionToken = req.cookies['DAMIAN-AUTH'];
      if (!sessionToken) {
        return res.status(403).json({ message: 'Permission denied!' });
      }

      const existingUser = await getUserBySessionToken(sessionToken);
      if (!existingUser) {
        return res.status(403).json({ message: 'Permission denied!' });
      }

      merge(req, { identity: existingUser });
      next();
    } catch (error) {
      console.log(error);
      return res.status(400).json();
    }
  }
};
