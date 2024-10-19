export const requestHandler = (req, res) => {
  const { method, url } = req;

  if (url === '/') {
    res.writeHead(200, { 'Content-Type': 'application/json' });

    return res.end();
  }
};
