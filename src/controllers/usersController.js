import { userService } from '../services/userService.js';
import { validateUserData, validateUserId } from '../utils/validateUser.js';

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
      try {
        const parsedBody = JSON.parse(body);
        validateUserData(parsedBody);
        const newUser = userService.addUser(parsedBody);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(newUser));
        res.end();
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
      }
    });
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Internal server error' }));
  }
};

export const getUserById = async (req, res, id) => {
  try {
    validateUserId(id);

    const user = userService.fetchUserById(id);

    if (user) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(user));
      res.end();
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'User not found' }));
    }
  } catch (error) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: error.message }));
  }
};

export const updateUserById = async (req, res, id) => {
  try {
    validateUserId(id);

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
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'User not found' }));
    }
  } catch (error) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: error.message }));
  }
};

export const deleteUserById = async (req, res, id) => {
  try {
    validateUserId(id);

    const success = userService.deleteUserById(id);
    if (success) {
      res.writeHead(204);
      res.end();
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'User not found' }));
    }
  } catch (error) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: error.message }));
  }
};
