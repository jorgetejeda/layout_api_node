const Sequelize = require("sequelize");

let opts = {
  host: "127.0.0.1",
  dialect: "mysql",
  define: {
    timestamps: true,
  },
  logging: process.env.NODE_ENV == "development" ? true : false,
};

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASS,
  opts
);

sequelize
  .authenticate()
  .then((res) => {
    console.log("Connection established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
    sequelize.close();
  });

module.exports = sequelize;
