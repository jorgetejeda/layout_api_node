const jwt = require("jsonwebtoken");
const ErrorGenerator = require("./error-generator");

const create = ({ obj, secretKey, expirationDay = 7 } = {}) => {
  return (token = jwt.sign(obj, secretKey, {
    expiresIn: 60 * 60 * 24 * expirationDay,
  }));
};

const validate = (req, next, secretKey) => {
  const token = req.headers["x-access-token"];
  try {
    if (!token) throw ErrorGenerator.JWT_ERROR();
    return jwt.decode(token, secretKey);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  validate,
};
