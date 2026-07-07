import { createServer } from "node:http";
import { createApp } from "./src/app.js";
import { config } from "./src/config.js";

const app = createApp();
const server = createServer(app);

server.listen(config.port, config.host, () => {
  console.log(`Eventra API running at http://${config.host}:${config.port}`);
});
