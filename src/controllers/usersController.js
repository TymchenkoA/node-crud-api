import { v4 as uuidv4 } from 'uuid';


//TODO Add validation for uuid
//TODO Add User service and DB
let users = [
  { name: 'Ivan', id: '1' },
  { name: 'Anna', id: '2' },
  { name: 'Dmytro', id: '3' },
];

export const getUsers = async (req, res) => {
  try {
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
      const id = uuidv4();
      const newUser = {
        id,
        ...parsedBody,
      };
      users.push(newUser);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(users));
      res.end();
    });
  } catch (error) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: error.message }));
  }
};

export const getUserById = async (req, res, id) => {
  try {
    const userById = users.find((user) => user.id === id);
    if (userById) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(userById));
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
    const userById = users.find((user) => user.id === id);
    if (userById) {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      req.on('end', () => {
        const parsedBody = JSON.parse(body);
        const updatedUser = {
          id,
          ...parsedBody,
        };
        const filteredUsers = users.filter((user) => user.id !== id);
        users = filteredUsers;
        users.push(updatedUser);
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
    const userById = users.find((user) => user.id === id);
    if (userById) {
      const filteredUsers = users.filter((user) => user.id !== id);
      users = filteredUsers;
      res.writeHead(204, { 'Content-Type': 'application/json' });
    //   res.write(
    //     JSON.stringify({
    //       message: `User with id ${id} is found and successfully deleted`,
    //     }),
    //   );
      res.end(JSON.stringify({ message: `User with id ${id} is found and successfully deleted` }));
    //   res.end();
    } else {
      throw new Error(`User with id ${id} does not exist`);
    }
  } catch (error) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: error.message }));
  }
};
