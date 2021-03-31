require("dotenv").config({ path: `./.env.${process.env.NODE_ENV}` });

module.exports = {
  [process.env.NODE_ENV]: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
    host: "127.0.0.1",
    dialect: "mysql",
    logging: process.env.NODE_ENV == "development" ? true : false,
  },
};
