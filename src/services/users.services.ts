import { Users } from '../db/users';

export const getAllUsers = () => {
  return Users.find().select('-__v -createdAt -updatedAt');
};

export const getUserByEmail = (email: string) => {
  return Users.findOne({ email });
};

export const getUserBySessionToken = (sessionToken: string) => {
  return Users.findOne({ 'authentication.sessionToken': sessionToken });
};

export const getUserById = (id: string) => {
  return Users.findById(id);
};

export const createUser = (values: Record<string, any>) =>
  Users.create(values).then((user) => user.toObject());

/** Mongoose by default triggers save() function internally when we use
 * the create() method on any model.
 */
// new Users(values).save().then((user) => user.toObject());

export const deleteUserById = (id: string) =>
  Users.findOneAndDelete({ _id: id });

export const updateUserById = (id: string, values: Record<string, any>) =>
  Users.findByIdAndUpdate(id, values);
