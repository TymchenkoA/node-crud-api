import { userService } from '../services/userService.js';

export const getUsers = async (req, res) => {
  try {
    const users = userService.fetchUsers();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(users));
    res.end();
  } catch (error) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: error.message }));
  }
};

export const createUser = async (req, res) => {
  try {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const parsedBody = JSON.parse(body);
      const newUser = userService.addUser(parsedBody);
      res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(newUser));
      res.end();
    });
  } catch (error) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: error.message }));
  }
};

export const getUserById = async (req, res, id) => {
  try {
    const user = userService.fetchUserById(id);
    if (user) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(user));
      res.end();
    } else {
      throw new Error(`User with id ${id} does not exist`);
    }
  } catch (error) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: error.message }));
  }
};

export const updateUserById = async (req, res, id) => {
  try {
    const user = userService.fetchUserById(id);
    if (user) {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      req.on('end', () => {
        const parsedBody = JSON.parse(body);
        const updatedUser = userService.updateUserById(id, parsedBody);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(updatedUser));
        res.end();
      });
    } else {
      throw new Error(`User with id ${id} does not exist`);
    }
  } catch (error) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: error.message }));
  }
};

export const deleteUserById = async (req, res, id) => {
  try {
    const success = userService.deleteUserById(id);
    if (success) {
        res.writeHead(204);
        res.end();
      } else {
        throw new Error(`User with id ${id} does not exist`);
      }
  } catch (error) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: error.message }));
  }
};
