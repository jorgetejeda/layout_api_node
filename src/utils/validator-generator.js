const ErrorGenerator = require("../utils/error-generator");
const HTTPCODE = require("../constant/http-code");
let notNullMessage = (value) =>
  `El campo de ${value.toLowerCase()} es requerido`;
let notEmtpyMessage = (value) =>
  `El campo ${value.toLowerCase()} no puede estar vacio`;

let MESSAGE = (value, args = true) => {
  return { msg: value, args: args };
};

let NOT_NULL = {
  NAME: notNullMessage("Nombre"),
  LAST_NAME: notNullMessage("Apellido"),
  EMAIL: notNullMessage("Email"),
  PASSWORD: notNullMessage("Contraseña"),
  IDENTIFICATION: notNullMessage("Identificación"),
};

let NOT_EMPTY = {
  NAME: notEmtpyMessage("Nombre"),
  LAST_NAME: notEmtpyMessage("Apellido"),
  EMAIL: notEmtpyMessage("Email"),
  PASSWORD: notEmtpyMessage("Contraseña"),
  IDENTIFICATION: notEmtpyMessage("Identificación"),
};

let IS_EMAIL = "El correo no esta bien definido";
let IS_STRING = (name) => `${name} solo acepta texto`;
let IS_NUMBER = (name) => `${name} solo acepta números`;

let customDatabaseFieldErrorToShow = (err) => {
  let error = err.hasOwnProperty("code")
    ? err
    : err.errors.map((error) => {
        if (error.validatorKey == "not_unique") {
          let field = error.path.split(".")[1];
          let name = { email: "El correo", identification: "La Cedula" };
          return `${name[field]} ${error.value} ya ha sido registrado`;
        }
        return error.message;
      });

  return error.hasOwnProperty("code")
    ? error
    : ErrorGenerator.generateError("BAD_REQUEST", error, HTTPCODE.BAD_REQUEST);
};

module.exports = {
  customDatabaseFieldErrorToShow,
  MESSAGE,
  NOT_NULL,
  NOT_EMPTY,
  IS_EMAIL,
  IS_STRING,
  IS_NUMBER,
};
