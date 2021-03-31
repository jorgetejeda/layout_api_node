const ErrorGenerator = require("../utils/error-generator");
const ACCESSLEVEL = require("../constant/access-level");

module.exports = (req, res, next) => {
  const { accessLevel } = req;
  try {
    if (accessLevel != ACCESSLEVEL.ADMIN)
      throw ErrorGenerator.FORBIDDEN_RESOURCE;
    next();
  } catch (error) {
    next(error);
  }
};
