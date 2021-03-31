const HTTPCODE = require("../constant/http-code");
let generateError = (code, msg, status = HTTPCODE.UNPROCESSABLE_ENTITY) => {
  let err = new Error(msg);
  err.status = status;
  err.code = code;
  err.msg = msg;
  return err;
};

let ErrorGenerator = {
  generateError,
  //User Account
  SEND_EMAIL: generateError(
    "SEND_EMAIL",
    "Ha ocurrido un error al momento de enviar el correo, por favor contactar con soporte",
    HTTPCODE.EXPECTATION_FAILED
  ),
  INVALID_IDENTIFICATION: generateError(
    "INVALID_IDENTIFICATION",
    "Esta cedula no es válida",
    HTTPCODE.BAD_REQUEST
  ),
  USER_CAN_NOT_REFER_BY_THEIRSELF: generateError(
    "USER_CAN_NOT_REFER_BY_THEIRSELF",
    "Un usuario no se puede refirir asi mismo",
    HTTPCODE.BAD_REQUEST
  ),
  UNACTIVE_ACCOUNT: generateError(
    "UNACTIVE_ACCOUNT",
    "Este recurso no ha sido activado",
    HTTPCODE.FORBIDDEN
  ),
  SUSPENDED_ACCOUNT: generateError(
    "SUSPENDED_ACCOUNT",
    "Esta cuenta ha sido suspendida, si entiende que es un error favor contactar con soporte",
    HTTPCODE.FORBIDDEN
  ),
  WRONG_PASSWORD_ERROR: generateError(
    "WRONG_PASSWORD_ERROR",
    "Usuario o contraseña incorrectos.",
    HTTPCODE.UNAUTHORIZED
  ),
  JWT_ERROR: (msj = "Token inválido (JWT)") => {
    return generateError("JWT_ERROR", msj, HTTPCODE.FORBIDDEN);
  },
  VERIFICATION_CODE_NO_EXIST: generateError(
    "CODIGO_VERIFICACION_NO_EXISTE",
    "El código de verificación no existe",
    HTTPCODE.NOT_FOUND
  ),

  VERIFICATION_CODE_EXPIRED: generateError(
    "CODIGO_VERIFICACION_EXPIRADO",
    "El código de verificación ha expirado",
    HTTPCODE.UNAUTHORIZED
  ),
  FORBIDDEN_RESOURCE: generateError(
    "FORBIDDEN_RESOURCE",
    "No posee los privilegios para acceder a este recurso",
    HTTPCODE.FORBIDDEN
  ),
  //Generic errors
  RESOURCE_NOT_REGISTERED: generateError(
    "RESOURCE_NOT_REGISTERED",
    "Este recurso no está registrado",
    HTTPCODE.BAD_REQUEST
  ),
  INVALID_DATA: generateError(
    "INVALID_DATA",
    "La data no es válida",
    HTTPCODE.BAD_REQUEST
  ),
  EXCEEDED_ATTEMPTS: generateError(
    "EXCEEDED_ATTEMPTS",
    "Ha excedido el numero de intentos permitidos.",
    HTTPCODE.UNPROCESSABLE_ENTITY
  ),

  UNEXPECT_ERROR: (
    entity = "Ha ocurrido un error, por favor contactar con soporte"
  ) => {
    return generateError("UNEXPECT_ERROR", entity, HTTPCODE.EXPECTATION_FAILED);
  },
};

module.exports = ErrorGenerator;
