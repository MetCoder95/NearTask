import path from "path";
/* eslint-disable-next-line */
import dotenv from "dotenv";
import dotenvSafe from "dotenv-safe";

dotenvSafe.config({
  example: "./.env.example"
});

const getEnvVariables = name =>
  process.env[name] ? process.env[name] : undefined;

const configuration = {
  all: {
    env: getEnvVariables("NODE_ENV") || "development",
    root: path.join(__dirname, ".."),
    mongo: {
      options: {
        db: {
          safe: true
        }
      }
    }
  },
  test: {
    port: 8000,
    ip: "0.0.0.0",
    mongo: {
      uri: getEnvVariables("MONGO_URI_TEST"),
      options: {
        debug: true
      }
    }
  },
  development: {
    port: 8000,
    ip: "0.0.0.0",
    mongo: {
      uri: getEnvVariables("MONGO_URI_DEV"),
      options: {
        debug: true
      }
    }
  },
  production: {
    ip: getEnvVariables("IP") || undefined,
    port: getEnvVariables("PORT") || 8080,
    mongo: {
      uri: getEnvVariables("MONGO_URI")
    }
  }
};

const config = Object.assign(
  {},
  configuration.all,
  configuration[configuration.all.env]
);

/**
 * Returns configuration options by name
 * @param {String} [name] Name of the option
 * @returns {Object} Option
 */
const getConfig = name => {
  if (!name) return config;

  return config[name] ? config[name] : undefined;
};

export default getConfig;
