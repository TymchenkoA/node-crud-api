import { v4 as uuidv4 } from 'uuid';
import inMemoryDatabase from '../db.js';

const fetchUsers = () => {
  return inMemoryDatabase.getAllUsers();
};

const fetchUserById = (id) => {
  return inMemoryDatabase.getUserById(id);
};

const addUser = (userData) => {
  const newUser = { id: uuidv4(), ...userData };
  return inMemoryDatabase.addUser(newUser);
};

const updateUserById = (id, updatedData) => {
  return inMemoryDatabase.updateUser(id, updatedData);
};

const deleteUserById = (id) => {
  return inMemoryDatabase.deleteUser(id);
};

export const userService = {
  fetchUsers,
  fetchUserById,
  addUser,
  updateUserById,
  deleteUserById,
};
