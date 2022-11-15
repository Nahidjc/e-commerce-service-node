const appHost = process.env.APP_HOST || "localhost";
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const appPort = process.env.PORT;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const env = process.env.APP_ENV || "local";

const variables = {
    appHost,
    appPort,
    env,
    username,
    password,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET
  };
  
  module.exports = variables;