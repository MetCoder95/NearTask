import mongoose from "mongoose";
import chalk from "chalk";

import getConfig from "../../config/config";

const mongo = getConfig("mongo");

Object.keys(mongo.options).forEach(key => {
  mongoose.set(key, mongo.options[key]);
});

mongoose.Promise = global.Promise;

(async function() {
  await mongoose.connect(
    mongo.uri,
    { useNewUrlParser: true }
  );
})();

const db = mongoose.connection;

/* eslint-disable no-console */
db.on("error", err => {
  console.log(chalk.red(`MongoDB Connection Error: ${err}`));
  process.exit(-1);
});

db.on("connected", () => {
  console.log(chalk.green(`MongoDB Connection Success to ${mongo.uri}`));
});

db.on("disconnected", () => {
  console.log(chalk.green(`MongoDB Connection Closed to ${mongo.uri}`));
});

export default db;
