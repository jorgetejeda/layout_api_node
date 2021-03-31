const bcrypt = require("bcrypt");

let password = {};
password.encrypt = async (value) => await bcrypt.hash(value, 10);
password.compare = async (value, hash) => await bcrypt.compare(value, hash);

module.exports = password;
