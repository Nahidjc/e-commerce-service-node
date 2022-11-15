const appHost = process.env.APP_HOST || "localhost";
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const appPort = process.env.PORT;
const env = process.env.APP_ENV || "local";

const variables = {
    appHost,
    appPort,
    env,
    username,
    password,
  };
  
  module.exports = variables;