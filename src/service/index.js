const fs = require("fs");
const ErrorGenerator = require("../utils/error-generator");
const ValidateError = require("../utils/validator-generator");

const service = {};

service.create = async (model, sequelize, obj) => {
  try {
    return await sequelize.transaction(async () => {
      return await model.create(obj);
    });
  } catch (err) {
    throw ValidateError.customDatabaseFieldErrorToShow(err);
  }
};

service.bulkCreate = async (model, sequelize, obj) => {
  try {
    return await sequelize.transaction(async () => {
      return await model.bulkCreate(obj);
    });
  } catch (err) {
    throw ValidateError.customDatabaseFieldErrorToShow(err);
  }
};

service.getAll = async (model, options = {}) => {
  try {
    return await model.findAll({ ...options });
  } catch (e) {
    throw e;
  }
};

service.getById = async (model, id, options = {}) => {
  const res = await model.findByPk(id, { ...options });
  return !res ? {} : res;
};

service.findOne = async (model, options = {}) => {
  const res = await model.findOne({ ...options });
  return !res ? {} : res;
};

service.update = async (model, sequelize, obj, options = {}) => {
  try {
    return await sequelize.transaction(async () => {
      return await model.update(obj, { ...options });
    });
  } catch (err) {
    throw ValidateError.customDatabaseFieldErrorToShow(err);
  }
};

service.upsert = async (model, sequelize, obj, options = {}) => {
  try {
    const entity = await service.findOne(model, options);
    if (Object.entries(entity).length == 0) {
      return service.create(model, sequelize, obj);
    }
    return await sequelize.transaction(async () => {
      return service.update(model, sequelize, obj, options);
    });
  } catch (err) {
    throw ValidateError.customDatabaseFieldErrorToShow(err);
  }
};

service.delete = async (model, sequelize, id) => {
  try {
    return await sequelize.transaction(async () => {
      const _model = await model.findOne({ where: { id } });
      if (!_model) throw ErrorGenerator.RESOURCE_NOT_REGISTERED;
      _model.destroy();
      return _model.id;
    });
  } catch (err) {
    throw err;
  }
};

service.validateFindOne = async (model, options = {}) =>
  hasInformation(await service.findOne(model, options));
service.validateGetById = async (model, id, options = {}) =>
  hasInformation(await service.getById(model, id, options));

const hasInformation = (response) => {
  if (Object.entries(response).length == 0)
    throw ErrorGenerator.RESOURCE_NOT_REGISTERED;
  return response;
};

service.userOrReferClientHasSameInformation = async (model, obj, options = {}) => {
  if (obj.email || obj.identification) {
    let hasSameEmail = (hasSameIdentification = false);
    const _objs = await service.getAll(model, { ...options });

    if (obj.email)
      hasSameEmail = _objs.some(
        (_obj) => _obj.email.toLowerCase() == obj.email.toLowerCase()
      );

    if (obj.identification)
      hasSameIdentification = _objs.some(
        (_obj) => _obj.identification == obj.identification
      );
      
    if (hasSameEmail || hasSameIdentification)
      throw ErrorGenerator.USER_CAN_NOT_REFER_BY_THEIRSELF;
  }
};

//Se importan todos los servicios de la carpeta service
fs.readdirSync(__dirname).forEach((file) => {
  if (file == "index.js") return;
  var name = file.substr(0, file.indexOf("."));
  service[name] = require(`./${name}`);
});

module.exports = service;
