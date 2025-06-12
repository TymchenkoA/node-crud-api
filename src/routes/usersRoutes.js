import {
  getUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
} from '../controllers/usersController.js';

const routes = {
  '/': {
    GET: (req, res) => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          message: 'Welcome to the home page of CRUD API app!',
        }),
      );
    },
  },
  '/api/users': {
    GET: getUsers,
    POST: createUser,
  },
  '/api/users/:id': {
    GET: getUserById,
    PUT: updateUserById,
    DELETE: deleteUserById,
  },
};

export const requestHandler = (req, res) => {
  const { method, url } = req;

  const userRoutePattern = /^\/api\/users\/([^/]+)$/;
  const match = url.match(userRoutePattern);

  if (routes[url] && routes[url][method]) {
    routes[url][method](req, res);
  } else if (
    match &&
    routes['/api/users/:id'] &&
    routes['/api/users/:id'][method]
  ) {
    const id = match[1];
    routes['/api/users/:id'][method](req, res, id);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
};
