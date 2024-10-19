import { createServer } from "node:http";
import { requestHandler } from "./routes.js";

const server = createServer(requestHandler);
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
