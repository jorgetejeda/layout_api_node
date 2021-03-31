const token = require("../utils/validate-token");
const ErrorGenerator = require("../utils/error-generator");

function verifyToken(req, res, next) {
  const decode = token.validate(req, next, process.env.SECRET_KEY);
  try {
    // TODO: Validate token expired
    if (!decode) throw ErrorGenerator.JWT_ERROR();
    if (!decode.accessLevel) throw ErrorGenerator.JWT_ERROR();
  
    req.idUser = decode.id;
    req.accessLevel = decode.accessLevel;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = verifyToken;
