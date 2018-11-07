import http from "http";
import chalk from "chalk";

import getConfig from "./config/config";

import { mongoose, express } from "./lib";
import api from "./api";

const { env, mongo, port, ip } = getConfig();

const app = express(api);

const server = http.createServer(app);

if (env === "development" || env === "test") {
  setImmediate(() => {
    server.listen(port, ip, () => {
      /* eslint-disable-next-line */
      console.log(
        chalk.cyan(`Express server in ${env} mode listening at 
      http://${ip}:${port}`)
      );
    });
  });
}

process.on("SIGTERM", () => {
  console.info(chalk.yellow("Closing http server..."));
  server.close(() => {
    console.log(chalk.green("Server closed"));

    console.info(chalk.yellow("Closing MongoDB connection..."));
    mongoose.close(false, () => {
      console.log(chalk.green("Mongoose connection closed"));
      process.exit(0);
    });
  });
});

process.on("SIGTINT", () => {
  console.info(chalk.yellow("Closing http server..."));
  server.close(() => {
    console.log(chalk.green("Server closed"));

    console.info(chalk.yellow("Closing MongoDB connection..."));
    mongoose.close(false, () => {
      console.log(chalk.green("Mongoose connection closed"));
      process.exit(0);
    });
  });
});

export default app;
